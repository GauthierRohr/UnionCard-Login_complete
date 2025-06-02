import React, { useState, useEffect } from 'react';
import { Section, SectionTitle } from '../components/ui/Section';
import Button from '../components/ui/Button';
import { Users, Gift, Share2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useAuthStore } from '../lib/store';
import AuthModal from '../components/auth/AuthModal';

const WinYourCard: React.FC = () => {
  const { user, profile } = useAuthStore();
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    document.title = 'Gagne ta carte | Union';
  }, []);

  return (
    <div>
      <Section className="pt-12">
        <div className="max-w-4xl mx-auto">
          <SectionTitle centered className="mb-8">
            {user && profile ? (
              <>Salut {profile.first_name} !<br></br>
              Ta carte Union t'attend. Prêt à la débloquer ?</>
            ) : (
              <>Obtiens gratuitement ta carte Union !</>
            )}
          </SectionTitle>

          <div className="mb-8 bg-blue-50 p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-6 text-center text-blue-800">
              Comment ça marche ?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white p-4 rounded-full inline-flex items-center justify-center mb-3 text-blue-600">
                  <Users className="h-8 w-8" />
                </div>
                <h4 className="text-lg font-semibold mb-2">1. Crée ton compte.</h4>
                <p className="text-gray-700">
                  Rejoins la communauté Union en créant ton compte gratuitement.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-white p-4 rounded-full inline-flex items-center justify-center mb-3 text-blue-600">
                  <Share2 className="h-8 w-8" />
                </div>
                <h4 className="text-lg font-semibold mb-2">2. Invite 5 amis</h4>
                <p className="text-gray-700">
                  Partage ton code à tes amis et commence à parrainer.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-white p-4 rounded-full inline-flex items-center justify-center mb-3 text-blue-600">
                  <Gift className="h-8 w-8" />
                </div>
                <h4 className="text-lg font-semibold mb-2">3. Reçois ta carte</h4>
                <p className="text-gray-700">
                  5 filleuls valides = ta carte Union offerte.
                </p>
              </div>
            </div>
          </div>

          {user && profile ? (
            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
              <h3 className="text-2xl font-bold mb-4 text-center">Ton code de parrainage</h3>
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-6">
                  <span className="text-xl font-extrabold text-blue-600">
                    {profile.referral_code}
                  </span>
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(profile.referral_code);
                      alert('Code copié !');
                    }}
                  >
                    Copier
                  </Button>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(profile.qualified_referrals / 5) * 100}%` }}
                  ></div>
                </div>
                {profile.qualified_referrals === 0 && (
                  <p className="text-center text-gray-600 mb-4">
                    Tu n’as aucun filleul valide* pour l’instant.<br></br>
                    Commence à partager !
                  </p>
                )}
                {profile.qualified_referrals > 0 && profile.qualified_referrals < 5 && (() => {
                  const count = profile.qualified_referrals;
                  const remaining = 5 - count;
                  const plural = count > 1 ? 'filleuls valides' : 'filleul valide';
                  return (
                    <p className="text-center text-blue-700 font-semibold mb-4">
                      Bravo ! {count} {plural} - plus que {remaining} pour ta carte gratuite !
                    </p>
                  );
                })()}
              </div>
              <p className="text-xs text-gray-500 mt-6 text-center">
              * Un filleul est "valide" s’il a commandé sa carte ou invité 5 personnes.
            </p>
            </div>
          ) : (
            <div className="text-center mb-8">
              <Button onClick={() => setShowAuthModal(true)} variant="primary" size="lg">
                Obtenir ma carte
              </Button>
            </div>
          )}

          {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
        </div>
      </Section>
    </div>
  );
};

export default WinYourCard;