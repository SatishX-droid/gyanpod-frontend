import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const TeacherNavBar = ({ onTabChange, activeTab, onSettingsClick }) => {
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
    { id: 'submit', name: 'Submit Content', icon: '📤' },
    { id: 'contributions', name: 'My Content', icon: '📝' },
    { id: 'analytics', name: 'Analytics', icon: '📊' },
    { id: 'tools', name: 'Bulk Tools', icon: '🛠️' },
    { id: 'browse', name: 'Browse Content', icon: '🔍' }
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
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-green-600">GyanPod Teacher</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Content Creator Portal</p>
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
                    ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md'
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
                className="w-10 h-10 rounded-full border-2 border-green-200"
              />
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-800 dark:text-white">
                  {user.displayName}
                </div>
                <div className="text-xs text-green-600">Teacher</div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={onSettingsClick}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="text-xl">⚙️</span>
              </button>
              
              <button
                onClick={logout}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="text-xl">🚪</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TeacherNavBar;
