import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uumijghlknatfykgpcbs.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1bWlqZ2hsa25hdGZ5a2dwY2JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3Mzg1MTYsImV4cCI6MjA2MzMxNDUxNn0.CPxee4HKYd8Z1FrT6WbdYzRq6hPacytMhL6r9Jxtbi4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const handleAuthError = (error: any) => {
  if (!error) return null;

  switch (error.message) {
    case 'Invalid login credentials':
      return 'Email ou mot de passe incorrect';
    case 'Email not confirmed':
      return 'Veuillez confirmer votre email avant de continuer';
    case 'User already registered':
      return 'Un compte existe déjà avec cet email';
    default:
      return error.message || 'Une erreur est survenue';
  }
};