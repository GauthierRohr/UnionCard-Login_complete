import React, { useEffect, useState } from 'react';
import { Section, SectionTitle } from '../components/ui/Section';
import { useAuthStore } from '../lib/store';
import { supabase } from '../lib/supabaseClient';

interface Referral {
  id: string;
  first_name: string;
  last_name: string;
  created_at: string;
  qualified_referrals: number;
}

const Dashboard: React.FC = () => {
  const { user, profile } = useAuthStore();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReferrals = async () => {
      if (!profile?.referral_code) return;

      const { data, error } = await supabase
        .from('users')
        .select('id, first_name, last_name, created_at, qualified_referrals')
        .eq('referred_by', profile.referral_code)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setReferrals(data);
      }
      setIsLoading(false);
    };

    loadReferrals();
  }, [profile]);

  if (!user || !profile) {
    return (
      <Section className="pt-24">
        <div className="text-center">Veuillez vous connecter pour accéder à cette page.</div>
      </Section>
    );
  }

  return (
    <Section className="pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Bienvenue, {profile.first_name} 👋
          </h1>
          <p className="text-gray-600">
            Voici un aperçu de votre activité sur Union
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Code de parrainage</h3>
            <p className="text-2xl font-bold text-blue-600">{profile.referral_code}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Filleuls qualifiés</h3>
            <p className="text-2xl font-bold text-blue-600">
              {profile.qualified_referrals} / 5
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Total des filleuls</h3>
            <p className="text-2xl font-bold text-blue-600">{referrals.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Mes filleuls</h2>
          </div>
          
          {isLoading ? (
            <div className="p-6 text-center text-gray-500">Chargement...</div>
          ) : referrals.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nom
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date d'inscription
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Filleuls
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {referrals.map((referral) => (
                    <tr key={referral.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {referral.first_name} {referral.last_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(referral.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {referral.qualified_referrals}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          referral.qualified_referrals >= 5
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {referral.qualified_referrals >= 5 ? 'Qualifié' : 'En cours'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              Vous n'avez pas encore de filleuls.
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export default Dashboard;