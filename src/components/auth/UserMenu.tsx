import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../lib/store';
import { ChevronDown, LogOut, Settings, User } from 'lucide-react';

const UserMenu: React.FC = () => {
  const { profile, signOut } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  if (!profile) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
      >
        <span className="font-medium">{profile.first_name}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
          <Link
            to="/account"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Paramètres
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <User className="h-4 w-4 mr-2" />
            Mon compte
          </Link>
          <button
            onClick={() => {
              signOut();
              setIsOpen(false);
            }}
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
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