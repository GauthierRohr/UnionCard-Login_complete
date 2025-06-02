import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section, SectionTitle } from '../components/ui/Section';
import { useAuthStore } from '../lib/store';
import { supabase } from '../lib/supabaseClient';
import Button from '../components/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Account: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, loadProfile, updateProfile, signOut } = useAuthStore();

  // États des formulaires
  const [editProfile, setEditProfile] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  // États des inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [university, setUniversity] = useState('');
  const [customUniversity, setCustomUniversity] = useState('');
  const [email, setEmail] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Visibilité mot de passe
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Message et chargement
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Universités
  const universities = [
    { id: 'epfl', name: 'EPFL' },
    { id: 'unil', name: 'UNIL' },
    { id: 'hec', name: 'HEC Lausanne' },
    { id: 'ehl', name: 'EHL' },
    { id: 'ecal', name: 'ECAL' },
    { id: 'other', name: 'Autre' },
  ];

  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
      if (!profile) loadProfile();
    }
    if (profile) {
      setFirstName(profile.first_name);
      setLastName(profile.last_name);
      const knownUnis = universities.map((u) => u.id);
      if (!knownUnis.includes(profile.university)) {
        setUniversity('other');
        setCustomUniversity(profile.university);
      } else {
        setUniversity(profile.university);
        setCustomUniversity('');
      }
    }
  }, [user, profile]);

  // Mise à jour profil
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      const uniValue = university === 'other' ? customUniversity : university;
      await updateProfile({ first_name: firstName, last_name: lastName, university: uniValue });
      setMessage('Profil mis à jour avec succès');
      setEditProfile(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setMessage('Erreur lors de la mise à jour du profil');
    }
    setIsLoading(false);
  };

  // Mise à jour email
  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      const { error } = await supabase.auth.updateUser({ email });
      if (error) throw error;
      setMessage('Email mis à jour avec succès');
      setEditEmail(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setMessage("Erreur lors de la mise à jour de l'email");
    }
    setIsLoading(false);
  };

  // Mise à jour mot de passe
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      setMessage('Veuillez entrer votre mot de passe actuel');
      return;
    }
    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas');
      return;
    }
    setIsLoading(true);
    setMessage('');
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setMessage('Mot de passe mis à jour avec succès');
      setPassword('');
      setConfirmPassword('');
      setCurrentPassword('');
      setEditPassword(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setMessage("Erreur lors de la mise à jour du mot de passe");
    }
    setIsLoading(false);
  };

  if (!user) {
    return (
      <Section className="pt-24 text-center text-lg font-semibold text-gray-700">
        Veuillez vous connecter pour accéder à cette page.
      </Section>
    );
  }

  if (!profile) {
    return (
      <Section className="pt-24 flex justify-center items-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-4 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500">Chargement du profil...</p>
        </div>
      </Section>
    );
  }

  return (
    <Section className="pt-12 max-w-3xl mx-auto">
      <SectionTitle className="text-gray-800 text-3xl font-extrabold mb-10">Paramètres du compte</SectionTitle>

      {message && (
        <div className="bg-blue-50 text-blue-800 p-4 rounded-lg mb-10 text-center font-semibold shadow-sm">
          {message}
        </div>
      )}

      {/* Section Profil */}
      <section className="mb-12 bg-white rounded-2xl shadow-md p-6 transition-all duration-300 ease-in-out">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Informations personnelles</h2>
          <button
            className="text-blue-600 font-medium rounded-md px-3 py-1.5 hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-400 transition-colors duration-300"
            onClick={() => setEditProfile(!editProfile)}
            aria-expanded={editProfile}
            aria-controls="profile-form"
            type="button"
          >
            {editProfile ? 'Annuler' : 'Modifier'}
          </button>
        </header>
        <div
          id="profile-form"
          className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
            editProfile ? 'max-h-[1000px]' : 'max-h-0'
          }`}
          aria-hidden={!editProfile}
        >
          {editProfile && (
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <input
                  type="text"
                  aria-label="Prénom"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Prénom"
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800 placeholder-gray-400 transition"
                  required
                />
                <input
                  type="text"
                  aria-label="Nom"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Nom"
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800 placeholder-gray-400 transition"
                  required
                />
              </div>
              <div>
                <label htmlFor="university-select" className="block mb-2 font-semibold text-gray-700">
                  Université
                </label>
                <select
                  id="university-select"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800 transition"
                  required
                >
                  <option value="">Sélectionner une université</option>
                  {universities.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
                {university === 'other' && (
                  <input
                    type="text"
                    aria-label="Université personnalisée"
                    placeholder="Nom de votre université"
                    value={customUniversity}
                    onChange={(e) => setCustomUniversity(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-3 mt-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800 placeholder-gray-400 transition"
                    required
                  />
                )}
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg px-6 py-3 font-semibold hover:from-blue-500 hover:to-blue-700 transition-colors duration-300"
              >
                Sauvegarder
              </Button>
            </form>
          )}
        </div>
        {!editProfile && (
          <div className="space-y-3 text-gray-800 text-lg font-medium leading-relaxed">
            <p>
              <span className="font-semibold">Prénom :</span> {firstName}
            </p>
            <p>
              <span className="font-semibold">Nom :</span> {lastName}
            </p>
            <p>
              <span className="font-semibold">Université :</span> {university === 'other' ? customUniversity : university}
            </p>
          </div>
        )}
      </section>

      {/* Section Email */}
      <section className="mb-12 bg-white rounded-2xl shadow-md p-6 transition-all duration-300 ease-in-out">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Email</h2>
          <button
            className="text-blue-600 font-medium rounded-md px-3 py-1.5 hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-400 transition-colors duration-300"
            onClick={() => setEditEmail(!editEmail)}
            aria-expanded={editEmail}
            aria-controls="email-form"
            type="button"
          >
            {editEmail ? 'Annuler' : 'Modifier'}
          </button>
        </header>
        <div
          id="email-form"
          className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
            editEmail ? 'max-h-96' : 'max-h-0'
          }`}
          aria-hidden={!editEmail}
        >
          {editEmail && (
            <form onSubmit={handleUpdateEmail} className="space-y-6">
              <input
                type="email"
                aria-label="Nouvelle adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nouvelle adresse email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800 placeholder-gray-400 transition"
                required
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg px-6 py-3 font-semibold hover:from-blue-500 hover:to-blue-700 transition-colors duration-300"
              >
                Sauvegarder
              </Button>
            </form>
          )}
        </div>
        {!editEmail && <p className="text-gray-800 text-lg font-medium">{email}</p>}
      </section>

      {/* Section Mot de passe */}
      <section className="mb-12 bg-white rounded-2xl shadow-md p-6 transition-all duration-300 ease-in-out">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Mot de passe</h2>
          <button
            className="text-blue-600 font-medium rounded-md px-3 py-1.5 hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-400 transition-colors duration-300"
            onClick={() => setEditPassword(!editPassword)}
            aria-expanded={editPassword}
            aria-controls="password-form"
            type="button"
          >
            {editPassword ? 'Annuler' : 'Changer le mot de passe'}
          </button>
        </header>
        {/* Afficher uniquement le bouton tant que le formulaire est caché */}
        {editPassword && (
          <div
            id="password-form"
            className={`overflow-hidden transition-max-height duration-500 ease-in-out ${editPassword ? 'max-h-[900px]' : 'max-h-0'}`}
            aria-hidden={!editPassword}
          >
            <form onSubmit={handleUpdatePassword} className="space-y-6">
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Mot de passe actuel</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800 placeholder-gray-400 transition"
                    required
                  />
                  {currentPassword && (
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      aria-label={showCurrentPassword ? 'Masquer mot de passe' : 'Afficher mot de passe'}
                    >
                      <FontAwesomeIcon icon={showCurrentPassword ? faEyeSlash : faEye} />
                    </button>
                  )}
                </div>
              </div>
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Nouveau mot de passe</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800 placeholder-gray-400 transition"
                    required
                  />
                  {password && (
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      aria-label={showNewPassword ? 'Masquer mot de passe' : 'Afficher mot de passe'}
                    >
                      <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                    </button>
                  )}
                </div>
              </div>
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Confirmer le mot de passe</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800 placeholder-gray-400 transition"
                    required
                  />
                  {confirmPassword && (
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? 'Masquer mot de passe' : 'Afficher mot de passe'}
                    >
                      <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                    </button>
                  )}
                </div>
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg px-6 py-3 font-semibold hover:from-blue-500 hover:to-blue-700 transition-colors duration-300"
              >
                Sauvegarder
              </Button>
            </form>
          </div>
        )}
      </section>

      {/* Section Parrainage */}
      <section className="mb-12 bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Programme de parrainage</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Code de parrainage</label>
            <div className="flex space-x-3">
              <input
                type="text"
                readOnly
                value={profile.referral_code}
                className="flex-grow border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-800 select-all"
              />
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(profile.referral_code);
                  setMessage('Code copié !');
                }}
                variant="outline"
                className="border-blue-400 text-blue-600 hover:bg-blue-100 transition-colors duration-300 rounded-lg px-5 py-3 font-semibold"
              >
                Copier
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 text-gray-800">
            <div>
              <label className="block text-sm font-semibold mb-1">Filleuls qualifiés</label>
              <p className="text-3xl font-extrabold text-blue-600">{profile.qualified_referrals} / 5</p>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Total des filleuls</label>
              <p className="text-3xl font-extrabold text-blue-600">{profile.total_referrals}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center mt-16">
        <Button
          variant="outline"
          className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white font-semibold rounded-lg px-8 py-3 transition-colors duration-300 shadow-md"
          onClick={() => {
            signOut();
            navigate('/win-your-card');
          }}
        >
          Déconnexion
        </Button>
      </div>
    </Section>
  );
};

export default Account;