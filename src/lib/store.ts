import { create } from 'zustand';
import { supabase } from './supabaseClient';
import { User } from '@supabase/supabase-js';

interface Profile {
  first_name: string;
  last_name: string;
  university: string;
  referral_code: string;
  qualified_referrals: number;
  total_referrals: number;
  has_card: boolean;
  avatar_url?: string;
}

interface AuthState {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  signOut: () => Promise<void>;
  loadProfile: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  uploadAvatar: (file: File) => Promise<string>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  signOut: async () => {
    try {
      set({ isLoading: true });
      await supabase.auth.signOut();
      set({ user: null, profile: null, isLoading: false, error: null });
    } catch (error) {
      set({ error: 'Erreur lors de la déconnexion', isLoading: false });
    }
  },

  loadProfile: async () => {
    const { user } = get();
    if (!user) return;

    try {
      set({ isLoading: true, error: null });

      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('first_name, last_name, university, referral_code, qualified_referrals, has_card, avatar_url')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      const { count: referralsCount } = await supabase
        .from('users')
        .select('*', { count: 'exact' })
        .eq('referred_by', profile.referral_code);

      set({
        profile: {
          ...profile,
          total_referrals: referralsCount || 0
        },
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error('Error loading profile:', error);
      set({
        error: 'Erreur lors du chargement du profil',
        isLoading: false,
        profile: null
      });
    }
  },

  updateProfile: async (updates) => {
    const { user } = get();
    if (!user) return;

    try {
      set({ isLoading: true });

      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      set((state) => ({
        profile: state.profile ? { ...state.profile, ...updates } : null,
        isLoading: false,
        error: null
      }));
    } catch (error) {
      console.error('Error updating profile:', error);
      set({
        error: 'Erreur lors de la mise à jour du profil',
        isLoading: false
      });
    }
  },

  uploadAvatar: async (file: File) => {
    const { user } = get();
    if (!user) throw new Error('User not authenticated');

    try {
      set({ isLoading: true });

      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      await get().updateProfile({ avatar_url: publicUrl });

      set({ isLoading: false, error: null });
      return publicUrl;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      set({
        error: "Erreur lors de l'upload de l'avatar",
        isLoading: false
      });
      throw error;
    }
  }
}));

export const initializeAuth = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  const { setUser, loadProfile } = useAuthStore.getState();

  if (error) {
    console.error('Error getting session:', error);
    return;
  }

  if (session?.user) {
    setUser(session.user);
    await loadProfile();
  }

  supabase.auth.onAuthStateChange(async (event, session) => {
    const { setUser, loadProfile } = useAuthStore.getState();
    
    if (session?.user) {
      setUser(session.user);
      await loadProfile();
    } else {
      setUser(null);
      useAuthStore.setState({ profile: null });
    }
  });
};