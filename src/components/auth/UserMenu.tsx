import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../lib/store';
import { ChevronDown, LogOut, Settings } from 'lucide-react';

const UserMenu: React.FC = () => {
  const { user, profile, signOut } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Don't show loading state if we know there's no user
    if (!user) setIsLoading(false);
  }, [user]);

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all"
        disabled={isLoading}
      >
        {isLoading ? (
          'Chargement...'
        ) : (
          <>
            <span className="font-medium">
              {profile?.first_name || 'Mon compte'}
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100">
          <Link
            to="/account"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50"
            onClick={() => setIsOpen(false)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Paramètres
          </Link>
          <button
            onClick={async () => {
              await signOut();
              setIsOpen(false);
            }}
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-blue-50 border-t border-gray-100"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;