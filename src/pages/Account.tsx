import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from '../components/ui/Section';
import { useAuthStore } from '../lib/store';
import Button from '../components/ui/Button';
import { Camera, Edit2, LogOut, Mail, School, User } from 'lucide-react';

const Account: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, loadProfile, updateProfile, signOut, uploadAvatar } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    university: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        ...formData,
        firstName: profile.first_name,
        lastName: profile.last_name,
        university: profile.university,
        email: user?.email || '',
      });
    }
  }, [profile, user]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await uploadAvatar(file);
      setMessage('Photo de profil mise à jour avec succès');
      loadProfile();
    } catch (error) {
      setMessage("Erreur lors de la mise à jour de la photo de profil");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      await updateProfile({
        first_name: formData.firstName,
        last_name: formData.lastName,
        university: formData.university,
      });
      setMessage('Profil mis à jour avec succès');
      setIsEditing(false);
    } catch (error) {
      setMessage('Erreur lors de la mise à jour du profil');
    }

    setIsLoading(false);
  };

  if (!user || !profile) {
    return (
      <Section className="pt-24 text-center">
        <p className="text-lg text-gray-600">Veuillez vous connecter pour accéder à cette page.</p>
      </Section>
    );
  }

  return (
    <Section className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header avec photo de profil */}
          <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <div 
                  className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden cursor-pointer"
                  onClick={handleAvatarClick}
                >
                  {profile.avatar_url ? (
                    <img 
                      src={profile.avatar_url} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="pt-20 px-8 pb-8">
            {message && (
              <div className="mb-6 p-4 rounded-lg bg-blue-50 text-blue-700 text-center">
                {message}
              </div>
            )}

            {/* Navigation */}
            <div className="flex border-b border-gray-200 mb-8">
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === 'profile'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                Profil
              </button>
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === 'security'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('security')}
              >
                Sécurité
              </button>
            </div>

            {/* Contenu du profil */}
            {activeTab === 'profile' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Informations personnelles</h2>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    {isEditing ? 'Annuler' : 'Modifier'}
                  </Button>
                </div>

                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Prénom
                        </label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nom
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Université
                      </label>
                      <input
                        type="text"
                        value={formData.university}
                        onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                      Enregistrer les modifications
                    </Button>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <User className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Nom complet</p>
                        <p className="font-medium text-gray-900">
                          {profile.first_name} {profile.last_name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium text-gray-900">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <School className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Université</p>
                        <p className="font-medium text-gray-900">{profile.university}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Section Parrainage */}
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Programme de parrainage</h2>
                  <div className="bg-gray-50 rounded-lg p-6 space-y-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Code de parrainage</p>
                      <div className="flex gap-4">
                        <input
                          type="text"
                          readOnly
                          value={profile.referral_code}
                          className="flex-grow px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium text-gray-900"
                        />
                        <Button
                          variant="outline"
                          onClick={() => {
                            navigator.clipboard.writeText(profile.referral_code);
                            setMessage('Code copié !');
                          }}
                        >
                          Copier
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Filleuls qualifiés</p>
                        <p className="text-3xl font-bold text-blue-600">
                          {profile.qualified_referrals} <span className="text-gray-400">/</span> 5
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Total des filleuls</p>
                        <p className="text-3xl font-bold text-blue-600">{profile.total_referrals}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contenu sécurité */}
            {activeTab === 'security' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900">Paramètres de sécurité</h2>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nouveau mot de passe
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirmer le mot de passe
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <Button type="submit">Mettre à jour le mot de passe</Button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Bouton de déconnexion */}
        <div className="mt-8 text-center">
          <Button
            variant="outline"
            onClick={() => {
              signOut();
              navigate('/');
            }}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default Account;