import React from 'react';
import { Bell, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Online Banking</h1>
          <p className="text-sm text-gray-600">Welcome back, {user?.customerName || 'User'}</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.customerName?.charAt(0) || 'U'}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-800">{user?.customerName || 'User'}</p>
              <p className="text-xs text-gray-600">{user?.pan || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;