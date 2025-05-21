import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Instagram, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <CreditCard className="h-8 w-8 text-blue-400" />
              <span className="ml-2 font-bold text-xl">Union</span>
            </div>
            <p className="text-gray-400 mb-4">
              La carte étudiante qui vous donne accès à des réductions exclusives auprès de partenaires sélectionnés en Suisse Romande.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="mailto:contact@unioncard.ch" className="text-gray-400 hover:text-white transition-colors" aria-label="Email">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Accueil</Link>
              </li>
              <li>
                <Link to="/offers" className="text-gray-400 hover:text-white transition-colors">Offres</Link>
              </li>
              <li>
                <Link to="/partners" className="text-gray-400 hover:text-white transition-colors">Partenaires</Link>
              </li>
              <li>
                <Link to="/win-your-card" className="text-gray-400 hover:text-white transition-colors">Obtenir ma carte</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-400">Lausanne, Suisse</span>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <a href="mailto:contact@unioncard.ch" className="text-gray-400 hover:text-white transition-colors">
                  contact@unioncard.ch
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8">
          <p className="text-gray-500 text-center text-sm">
            © {new Date().getFullYear()} Union. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;