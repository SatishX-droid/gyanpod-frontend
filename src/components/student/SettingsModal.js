import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const SettingsModal = ({ onClose }) => {
  const { user, userSelections, updateSelections, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
    studyReminders: true
  });

  const classes = ['1','2','3','4','5','6','7','8','9','10','11','12'];
  const subjects = ['mathematics', 'science', 'physics', 'chemistry', 'biology', 'english', 'hindi', 'social-science'];

  const handleUpdateSelections = async (newSelections) => {
    try {
      await updateSelections(newSelections);
      alert('Preferences updated successfully!');
    } catch (error) {
      alert('Error updating preferences');
    }
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <img
                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=random`}
                alt="Profile"
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{user.displayName}</h3>
                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                <p className="text-sm text-gray-500">Student Account</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Current Selections</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Class</label>
                  <select
                    value={userSelections.class || '10'}
                    onChange={(e) => handleUpdateSelections({...userSelections, class: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    {classes.map(cls => (
                      <option key={cls} value={cls}>Class {cls}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Primary Subject</label>
                  <select
                    value={userSelections.subject || 'mathematics'}
                    onChange={(e) => handleUpdateSelections({...userSelections, subject: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>
                        {subject.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-4">App Preferences</h4>
              <div className="space-y-4">
                {Object.entries(settings).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-800 dark:text-white">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {key === 'notifications' && 'Receive study reminders and updates'}
                        {key === 'darkMode' && 'Use dark theme for better night reading'}
                        {key === 'autoSave' && 'Automatically save your progress'}
                        {key === 'studyReminders' && 'Get reminders for your study schedule'}
                      </div>
                    </div>
                    <button
                      onClick={() => setSettings({...settings, [key]: !value})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'account':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-4 text-red-600">Account Actions</h4>
              <div className="space-y-4">
                <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="font-medium">Export Data</div>
                  <div className="text-sm text-gray-600">Download all your study data</div>
                </button>
                
                <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="font-medium">Reset Progress</div>
                  <div className="text-sm text-gray-600">Clear all progress and start fresh</div>
                </button>
                
                <button 
                  onClick={logout}
                  className="w-full text-left p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-red-600"
                >
                  <div className="font-medium">Sign Out</div>
                  <div className="text-sm">Sign out from your account</div>
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <span className="text-xl">✕</span>
          </button>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-48 border-r border-gray-200 dark:border-gray-700 p-4">
            {[
              { id: 'profile', name: 'Profile', icon: '👤' },
              { id: 'preferences', name: 'Preferences', icon: '⚙️' },
              { id: 'account', name: 'Account', icon: '🔐' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
