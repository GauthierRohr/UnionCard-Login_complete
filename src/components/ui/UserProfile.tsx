import React from 'react';
import { useAuthStore } from '../../lib/store';
import { Section, SectionTitle } from './Section';

const UserProfile: React.FC = () => {
  const { profile, isLoading, error } = useAuthStore();

  if (isLoading) return <p className="text-center">Chargement du profil...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!profile) return <p className="text-center text-gray-500">Aucun profil trouvé.</p>;

  return (
    <Section id="profile" bgColor="bg-gray-50">
      <SectionTitle centered>Mon Profil</SectionTitle>
      <div className="max-w-xl mx-auto space-y-4 text-gray-800">
        <div><strong>Nom :</strong> {profile.first_name} {profile.last_name}</div>
        <div><strong>Université :</strong> {profile.university}</div>
        <div><strong>Code de parrainage :</strong> {profile.referral_code}</div>
        <div><strong>Filleuls qualifiés :</strong> {profile.qualified_referrals}</div>
        <div><strong>Carte reçue :</strong> {profile.has_card ? 'Oui' : 'Non'}</div>
      </div>
    </Section>
  );
};

export default UserProfile;