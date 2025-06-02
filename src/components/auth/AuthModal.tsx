import React, { useState } from 'react';
import { supabase, handleAuthError } from '../../lib/supabaseClient';
import Button from '../ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [university, setUniversity] = useState('');
  const [customUniversity, setCustomUniversity] = useState('');
  const [referralCodeInput, setReferralCodeInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const universities = [
    { id: 'epfl', name: 'EPFL' },
    { id: 'unil', name: 'UNIL' },
    { id: 'hec', name: 'HEC Lausanne' },
    { id: 'ehl', name: 'EHL' },
    { id: 'ecal', name: 'ECAL' },
    { id: 'other', name: 'Autre' }
  ];

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        onClose();
      } else {
        const universityValue = university === 'other' ? customUniversity : university;

        if (!universityValue) {
          throw new Error('Veuillez sélectionner votre université');
        }

        if (referralCodeInput) {
          const { data: refData, error: refError } = await supabase
            .from('users')
            .select('referral_code')
            .eq('referral_code', referralCodeInput)
            .single();

          if (refError || !refData) {
            throw new Error('Code de parrainage incorrect');
          }
        }

        const { error: signUpError, data } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        if (data.user) {
          const { error: profileError } = await supabase
            .from('users')
            .insert([
              {
                id: data.user.id,
                email,
                first_name: firstName,
                last_name: lastName,
                university: universityValue,
                referral_code: `UNION-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
                referred_by: referralCodeInput || null,
              },
            ]);

          if (profileError) throw profileError;
        }

        setSuccess('Compte créé avec succès! Veuillez vérifier votre email pour confirmer votre compte.');
      }
    } catch (err: any) {
      setError(handleAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {mode === 'login' ? 'Connexion' : 'Inscription'}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {mode === 'register' && (
            <>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prénom
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Université
                </label>
                <select
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Sélectionner une université</option>
                  {universities.map((uni) => (
                    <option key={uni.id} value={uni.id}>
                      {uni.name}
                    </option>
                  ))}
                </select>
                {university === 'other' && (
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom de votre université
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={customUniversity}
                      onChange={(e) => setCustomUniversity(e.target.value)}
                      required
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Code de parrainage (optionnel)
                </label>
                <input
                  type="text"
                  value={referralCodeInput}
                  onChange={(e) => setReferralCodeInput(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg pr-10"
                required
              />
              {password && (
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              )}
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={loading}
          >
            {loading
              ? 'Chargement...'
              : mode === 'login'
              ? 'Se connecter'
              : "S'inscrire"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          {mode === 'login' ? (
            <button
              onClick={() => setMode('register')}
              className="text-blue-600 hover:text-blue-700"
            >
              Pas encore de compte ? S'inscrire
            </button>
          ) : (
            <button
              onClick={() => setMode('login')}
              className="text-blue-600 hover:text-blue-700"
            >
              Déjà un compte ? Se connecter
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;