import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, CreditCard, Instagram, Facebook } from 'lucide-react';
import AuthModal from '../auth/AuthModal';
import UserMenu from '../auth/UserMenu';
import { useAuthStore } from '../../lib/store';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, profile } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="flex items-center">
            <CreditCard className="h-8 w-8 text-blue-600" strokeWidth={2} />
            <span className="ml-2 font-bold text-xl text-gray-900">Union</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `text-base transition-colors hover:text-blue-700 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform ${
                    isActive ? 'text-blue-600 font-semibold after:scale-x-100' : 'text-gray-700'
                  }`
                }
              >
                Accueil
              </NavLink>
              <NavLink 
                to="/offers" 
                className={({ isActive }) => 
                  `text-base transition-colors hover:text-blue-700 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform ${
                    isActive ? 'text-blue-600 font-semibold after:scale-x-100' : 'text-gray-700'
                  }`
                }
              >
                Offres
              </NavLink>
              <NavLink 
                to="/partners" 
                className={({ isActive }) => 
                  `text-base transition-colors hover:text-blue-700 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform ${
                    isActive ? 'text-blue-600 font-semibold after:scale-x-100' : 'text-gray-700'
                  }`
                }
              >
                Partenaires
              </NavLink>
              <NavLink 
                to="/win-your-card" 
                className={({ isActive }) => 
                  `text-base transition-colors hover:text-blue-700 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform ${
                    isActive ? 'text-blue-600 font-semibold after:scale-x-100' : 'text-gray-700'
                  }`
                }
              >
                Obtenir ma carte
              </NavLink>
            </div>
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <a
                href="https://instagram.com/unioncard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
            {/* {user ? (
              <UserMenu />
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium transition-all hover:bg-blue-700 hover:shadow-md"
              >
                Connexion
              </button>
            )} */}
            {user ? (
            <Link
              to="/account"
              className="px-5 py-2 bg-white text-blue-600 rounded-lg font-medium transition-all hover:bg-gray-100 hover:shadow-md"
            >
              Mon compte
            </Link>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium transition-all hover:bg-blue-700 hover:shadow-md"
            >
              Connexion
            </button>
          )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-4">
          <nav className="flex flex-col space-y-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-base py-2 transition-colors ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </NavLink>
            <NavLink 
              to="/offers" 
              className={({ isActive }) => 
                `text-base py-2 transition-colors ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Offres
            </NavLink>
            <NavLink 
              to="/partners" 
              className={({ isActive }) => 
                `text-base py-2 transition-colors ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Partenaires
            </NavLink>
            <NavLink 
              to="/win-your-card" 
              className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Obtenir ma carte
            </NavLink>

            <div className="flex justify-center space-x-4 pt-4">
              <a
                href="https://instagram.com/unioncard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          {/* {user ? (
            <div className="pt-2 text-center">
              <UserMenu />
            </div>
          ) : (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                setShowAuthModal(true);
              }}
              className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium text-center"
            >
              Connexion
            </button>
          )} */}
          {user ? (
          <div className="pt-2 text-center">
            <Link
              to="/account"
              onClick={() => setIsMenuOpen(false)}
              className="block px-5 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium text-center"
            >
              Mon compte
            </Link>
          </div>
        ) : (
          <button
            onClick={() => {
              setIsMenuOpen(false);
              setShowAuthModal(true);
            }}
            className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium text-center"
          >
            Connexion
          </button>
        )}
          </nav>
        </div>
      )}

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </header>
  );
};

export default Header;