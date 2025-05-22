import { create } from 'zustand';
import { supabase } from './supabaseClient';
import { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  profile: {
    first_name: string;
    last_name: string;
    university: string;
    referral_code: string;
    qualified_referrals: number;
    total_referrals: number;
  } | null;
  setUser: (user: User | null) => void;
  setProfile: (profile: AuthState['profile']) => void;
  signOut: () => Promise<void>;
  loadProfile: () => Promise<void>;
  updateProfile: (updates: Partial<AuthState['profile']>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, profile: null });
  },
  loadProfile: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase
      .from('users')
      .select('first_name, last_name, university, referral_code, qualified_referrals')
      .eq('id', user.id)
      .single();

    if (profile) {
      const { data: referrals } = await supabase
        .from('users')
        .select('id')
        .eq('referred_by', profile.referral_code);

      set({ 
        profile: { 
          ...profile,
          total_referrals: referrals?.length || 0
        }
      });
    }
  },
  updateProfile: async (updates) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id);

    if (!error) {
      set((state) => ({
        profile: state.profile ? { ...state.profile, ...updates } : null
      }));
    }
  },
}));