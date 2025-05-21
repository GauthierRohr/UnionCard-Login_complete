import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            La carte qui booste<br></br>ta vie étudiante
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Économise sur tes sorties et profite d'offres exclusives auprès de nos partenaires sur Lausanne.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/win-your-card">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Pré-inscription
              </Button>
            </Link>
            <Link to="/offers">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20">
                Découvrir les offres
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default Hero;