import React from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../ui/Section';
import Button from '../ui/Button';

const CallToAction: React.FC = () => {
  return (
    <Section className="py-20" bgColor="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Gagne ta carte Union gratuitement 🎁
        </h2>
        <p className="text-lg md:text-xl text-blue-100 mb-8">
          Invite 5 amis à s'inscrire via ton lien et reçois ta carte gratuitement au lancement. Ou inscris-toi maintenant et découvre ton code de parrainage !
        </p>
        <Link to="/win-your-card">
          <Button 
            variant="secondary" 
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            Je m'inscris
          </Button>
        </Link>
      </div>
    </Section>
  );
};

export default CallToAction;