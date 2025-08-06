import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const ParentNavBar = ({ onTabChange, activeTab }) => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: '🏠' },
    { id: 'progress', name: 'Child Progress', icon: '📊' },
    { id: 'analytics', name: 'Analytics', icon: '📈' },
    { id: 'communication', name: 'Teachers', icon: '💬' },
    { id: 'goals', name: 'Goals', icon: '🎯' },
    { id: 'reports', name: 'Reports', icon: '📋' }
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-orange-600">GyanPod Parent</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Child Monitoring Portal</p>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <img
                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=random`}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-orange-200"
              />
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-800 dark:text-white">
                  {user.displayName}
                </div>
                <div className="text-xs text-orange-600">Parent</div>
              </div>
            </div>

            <button
              onClick={logout}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="text-xl">🚪</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ParentNavBar;
