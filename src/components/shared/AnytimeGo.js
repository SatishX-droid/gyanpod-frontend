import React, { useState, useEffect } from 'react';

const AnytimeGo = ({ expanded = false }) => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      }
      
      setDeferredPrompt(null);
      setIsInstallable(false);
    } else {
      // Fallback for browsers that don't support PWA installation
      alert('To install this app:\n\n1. On Chrome: Click the install button in the address bar\n2. On Safari: Add to Home Screen from Share menu\n3. On Edge: Click Apps menu → Install this site as an app');
    }
  };

  const features = [
    { icon: '📱', text: 'Works Offline', desc: 'Study even without internet' },
    { icon: '⚡', text: 'Fast Loading', desc: 'Instant access to your content' },
    { icon: '🚫', text: 'No Ads', desc: 'Clean, distraction-free learning' },
    { icon: '🔄', text: 'Auto Sync', desc: 'Progress saved across devices' },
    { icon: '📊', text: 'Smart Analytics', desc: 'Track your learning progress' },
    { icon: '🔔', text: 'Study Reminders', desc: 'Never miss your study time' }
  ];

  return (
    <div className={`glass-card rounded-3xl p-8 text-center relative overflow-hidden ${expanded ? 'col-span-full' : ''}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-accent-500/5 to-success-500/5"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-100/20 to-accent-100/20 rounded-full transform translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-success-100/20 to-accent-100/20 rounded-full transform -translate-x-24 translate-y-24"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-xl relative">
            <span className="text-white text-4xl animate-bounce">📱</span>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-success-400 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white text-xs font-bold">✨</span>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold gradient-text mb-4">AnytimeGo</h2>
          <p className="text-gray-600 dark:text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
            Install GyanPod as an app on your device for the ultimate learning experience!
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">{feature.text}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
        
        {/* Installation Stats */}
        <div className="flex justify-center space-x-8 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">50K+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-600">4.9★</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">User Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success-600">100%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Free Forever</div>
          </div>
        </div>
        
        {/* Install Button */}
        <div className="mb-8">
          <button
            onClick={handleInstallClick}
            className="group bg-gradient-to-r from-primary-500 via-accent-500 to-success-500 text-white px-12 py-6 rounded-full hover:shadow-2xl transition-all duration-300 font-bold text-xl btn-hover relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative z-10 flex items-center space-x-3">
              <span>📲</span>
              <span>{isInstallable ? 'Install App Now' : 'Get the App'}</span>
              <span className="group-hover:animate-bounce">→</span>
            </span>
          </button>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            {isInstallable 
              ? 'One-click installation available!' 
              : 'Available on Android, iOS, and Desktop browsers'
            }
          </p>
        </div>
        
        {/* Installation Steps */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="font-bold text-gray-800 dark:text-white mb-4">📱 How to Install:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
              <div>
                <div className="font-medium text-gray-800 dark:text-white">Chrome/Edge</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Click install button in address bar</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
              <div>
                <div className="font-medium text-gray-800 dark:text-white">Safari (iOS)</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Share → Add to Home Screen</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
              <div>
                <div className="font-medium text-gray-800 dark:text-white">Android</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Menu → Add to Home screen</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Security Badge */}
        <div className="mt-6 flex justify-center">
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center space-x-1">
              <span>🔒</span>
              <span>Secure & Privacy-First</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <span>⚡</span>
              <span>Instant Updates</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <span>💾</span>
              <span>Works Offline</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnytimeGo;
