import React, { useState, useEffect } from 'react';
import { Section, SectionTitle } from '../components/ui/Section';
import { useAuthStore } from '../lib/store';
import { supabase } from '../lib/supabaseClient';
import Button from '../components/ui/Button';

const Account: React.FC = () => {
  const { user, profile, loadProfile } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
    }
  }, [user]);

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ email });
      if (error) throw error;
      setMessage('Email mis à jour avec succès');
    } catch (error) {
      setMessage('Erreur lors de la mise à jour de l\'email');
    }
    setIsLoading(false);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas');
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setMessage('Mot de passe mis à jour avec succès');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      setMessage('Erreur lors de la mise à jour du mot de passe');
    }
    setIsLoading(false);
  };

  if (!user || !profile) {
    return (
      <Section className="pt-24">
        <div className="text-center">Veuillez vous connecter pour accéder à cette page.</div>
      </Section>
    );
  }

  return (
    <Section className="pt-24">
      <SectionTitle>Paramètres du compte</SectionTitle>

      <div className="max-w-2xl mx-auto space-y-8">
        {message && (
          <div className="bg-blue-50 text-blue-700 p-4 rounded-lg">
            {message}
          </div>
        )}

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Informations personnelles</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Prénom</label>
              <p className="mt-1 text-gray-900">{profile.first_name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom</label>
              <p className="mt-1 text-gray-900">{profile.last_name}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Email</h3>
          <form onSubmit={handleUpdateEmail} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Nouvelle adresse email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              Mettre à jour l'email
            </Button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Mot de passe</h3>
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              Mettre à jour le mot de passe
            </Button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Programme de parrainage</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Code de parrainage
              </label>
              <div className="mt-1 flex">
                <input
                  type="text"
                  value={profile.referral_code}
                  readOnly
                  className="block w-full rounded-lg border-gray-300 bg-gray-50"
                />
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(profile.referral_code);
                    setMessage('Code copié !');
                  }}
                  className="ml-2"
                >
                  Copier
                </Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Filleuls qualifiés
              </label>
              <p className="mt-1 text-2xl font-semibold text-blue-600">
                {profile.qualified_referrals} / 5
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Account;