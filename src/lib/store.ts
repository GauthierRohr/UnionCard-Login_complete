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
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  isLoading: false,
  error: null,

  // Setters de base
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  // Déconnexion
  signOut: async () => {
    try {
      set({ isLoading: true });
      await supabase.auth.signOut();
      set({ user: null, profile: null, isLoading: false, error: null });
    } catch (error) {
      set({ error: 'Erreur lors de la déconnexion', isLoading: false });
    }
  },

  // Chargement du profil
  loadProfile: async () => {
    const { user } = get();
    if (!user) return;

    try {
      set({ isLoading: true, error: null });

      console.log("Chargement du profil pour l'utilisateur :", user.id);

      // Récupère le profil de base
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('first_name, last_name, university, referral_code, qualified_referrals, has_card', { head: false })
        .eq('id', user.id)
        .single();

      if (profileError) {
      console.error("Erreur Supabase lors du .select():", profileError);
      throw profileError;
      }

      // Récupère le nombre total de filleuls
      const { count: referralsCount } = await supabase
        .from('users')
        .select('*', { count: 'exact' })
        .eq('referred_by', profile.referral_code);

      set({
        profile: {
          ...profile,
          total_referrals: referralsCount || 0
        },
        isLoading: false
      });
    } catch (error) {
      set({
        error: 'Erreur lors du chargement du profil',
        isLoading: false
      });
      console.error('Error loading profile:', error);
    }
  },

  // Mise à jour du profil
  updateProfile: async (updates) => {
    const { user } = get();
    if (!user) return;

    try {
      set({ isLoading: true });

      // Met à jour la table 'users' dans Supabase
      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      // Met à jour le store local
      set((state) => ({
        profile: state.profile ? { ...state.profile, ...updates } : null,
        isLoading: false
      }));
    } catch (error) {
      set({
        error: 'Erreur lors de la mise à jour du profil',
        isLoading: false
      });
      console.error('Error updating profile:', error);
    }
  }
}));

// Fonction pour initialiser l'état d'authentification au chargement de l'app
export const initializeAuth = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  console.log('Session actuelle:', session);
  const { setUser, loadProfile } = useAuthStore.getState();

  if (error) {
    console.error('Error getting session:', error);
    return;
  }

  setUser(session?.user ?? null);
  if (session?.user) {
    await loadProfile();
  }

  // Écoute les changements d'authentification
  supabase.auth.onAuthStateChange(async (_, session) => {
    setUser(session?.user ?? null);
    if (session?.user) {
      await loadProfile();
    } else {
      useAuthStore.setState({ profile: null });
    }
  });
};