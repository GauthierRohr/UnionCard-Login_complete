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

  if (!user) {
    return (
      <Section className="pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle centered>
            Connectez-vous pour participer au programme de parrainage
          </SectionTitle>
          <Button onClick={() => setShowAuthModal(true)} variant="primary" size="lg">
            Se connecter
          </Button>
          {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
        </div>
      </Section>
    );
  }

  return (
    <div>
      <Section className="pt-24">
        <div className="max-w-4xl mx-auto">
          <SectionTitle centered>
            Obtiens ta carte Union gratuitement
          </SectionTitle>

          <div className="mb-16 bg-blue-50 p-8 rounded-xl">
            <h3 className="text-2xl font-semibold mb-6 text-center text-blue-800">
              Comment ça fonctionne ?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white p-4 rounded-full inline-flex items-center justify-center mb-4 text-blue-600">
                  <Users className="h-8 w-8" />
                </div>
                <h4 className="text-lg font-medium mb-2">1. Partage ton code</h4>
                <p className="text-gray-600">
                  Partage ton code de parrainage avec tes amis.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-white p-4 rounded-full inline-flex items-center justify-center mb-4 text-blue-600">
                  <Share2 className="h-8 w-8" />
                </div>
                <h4 className="text-lg font-medium mb-2">2. Invite 5 amis</h4>
                <p className="text-gray-600">
                  Fais-les s'inscrire avec ton code.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-white p-4 rounded-full inline-flex items-center justify-center mb-4 text-blue-600">
                  <Gift className="h-8 w-8" />
                </div>
                <h4 className="text-lg font-medium mb-2">3. Reçois ta carte</h4>
                <p className="text-gray-600">
                  Une fois que tu as 5 filleuls qualifiés, ta carte est gratuite !
                </p>
              </div>
            </div>
          </div>

          {profile && (
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold mb-6 text-center">
                Ton code de parrainage
              </h3>
              
              <div className="max-w-md mx-auto">
                <div className="mb-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-xl font-bold text-blue-600">
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
                </div>

                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Tu as actuellement {profile.qualified_referrals} filleuls qualifiés sur 5
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{
                        width: `${(profile.qualified_referrals / 5) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
};

export default WinYourCard;