import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeSwitcher from './shared/ThemeSwitcher';

const HomePage = () => {
  const { signInWithGoogle } = useAuth();
  const { darkMode } = useTheme();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    // PWA install prompt handling
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setShowInstallButton(false);
      }
      
      setDeferredPrompt(null);
    } else {
      // Fallback instructions
      alert('To install this app:\n\n1. On Chrome: Click the install button in the address bar\n2. On Safari: Add to Home Screen from Share menu\n3. On Android: Menu → Install app');
    }
  };

  const features = [
    { icon: '📚', title: 'Smart Notes', desc: 'AI-curated study materials' },
    { icon: '🧠', title: 'Interactive Quizzes', desc: 'Test your knowledge instantly' },
    { icon: '📊', title: 'Progress Tracking', desc: 'Monitor your learning journey' },
    { icon: '🎯', title: 'Personalized Learning', desc: 'Content tailored for you' },
    { icon: '👥', title: 'Multi-User Support', desc: 'Students, Teachers, Parents' },
    { icon: '🌓', title: 'Dark Mode', desc: 'Easy on your eyes' }
  ];

  const stats = [
    { number: '50K+', label: 'Active Learners' },
    { number: '1000+', label: 'Study Materials' },
    { number: '500+', label: 'Teachers' },
    { number: '4.9★', label: 'User Rating' }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        
        {/* Header */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-accent-500 to-success-500"></div>
          <div className="absolute inset-0 bg-black/20"></div>
          
          {/* Floating Shapes */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/15 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
            <div className="flex justify-between items-start mb-16">
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 bg-white/95 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-black bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">G</span>
                </div>
                <div>
                  <h1 className="text-3xl font-black text-white">GyanPod</h1>
                  <p className="text-white/80 text-sm">Version 2.0</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <ThemeSwitcher />
                <button
                  onClick={signInWithGoogle}
                  className="bg-white/90 backdrop-blur-sm text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-white transition-all shadow-lg"
                >
                  🚀 Get Started
                </button>
              </div>
            </div>
            
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
                Smart Padhai.
                <br />
                <span className="bg-gradient-to-r from-accent-200 to-success-200 bg-clip-text text-transparent">
                  Pocket Mein Gyan.
                </span>
              </h2>
              
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                India's most advanced learning platform. Personalized education for students, powerful tools for teachers, and complete insights for parents.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={signInWithGoogle}
                  className="bg-white text-gray-800 px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-xl"
                >
                  📚 Start Learning Free
                </button>
                <button
                  onClick={() => document.getElementById('install-section').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all border border-white/30"
                >
                  📱 Install App
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Section */}
        <section className="py-16 bg-white dark:bg-gray-800 transition-colors">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="text-4xl font-black text-primary-600 dark:text-primary-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-black text-gray-800 dark:text-white mb-4">
                Why Choose GyanPod?
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Experience the future of education with our cutting-edge features
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="glass-card rounded-3xl p-8 text-center hover:scale-105 transition-all duration-300 animate-fade-in-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PWA Install Section - Same as GyanPod 1.0 */}
        <section id="install-section" className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-700 transition-colors">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-2xl border border-primary-100 dark:border-gray-600">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-3xl">📱</span>
              </div>
              
              <h3 className="text-3xl font-black text-gray-800 dark:text-white mb-4">
                Install GyanPod as an app on your device for the best learning experience!
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <div className="flex items-center justify-center space-x-3 bg-green-50 dark:bg-green-900/20 rounded-2xl p-4">
                  <span className="text-green-600 text-xl">✅</span>
                  <span className="font-semibold text-green-700 dark:text-green-300">Works Offline</span>
                </div>
                <div className="flex items-center justify-center space-x-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4">
                  <span className="text-blue-600 text-xl">✅</span>
                  <span className="font-semibold text-blue-700 dark:text-blue-300">Fast Loading</span>
                </div>
                <div className="flex items-center justify-center space-x-3 bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-4">
                  <span className="text-purple-600 text-xl">✅</span>
                  <span className="font-semibold text-purple-700 dark:text-purple-300">No Ads</span>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                Available on <strong>Android</strong>, <strong>iOS</strong>, and <strong>Desktop browsers</strong>
              </p>
              
              {showInstallButton ? (
                <button
                  onClick={handleInstall}
                  className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-lg"
                >
                  📲 Install Now - Free Forever
                </button>
              ) : (
                <button
                  onClick={handleInstall}
                  className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-lg"
                >
                  📲 Get Install Instructions
                </button>
              )}
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center justify-center space-x-2">
                  <span>📱</span>
                  <span>Chrome: Address bar install button</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span>🍎</span>
                  <span>Safari: Share → Add to Home Screen</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span>🤖</span>
                  <span>Android: Menu → Install app</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-600 via-accent-500 to-success-500">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h3 className="text-4xl font-black mb-6">
              Ready to Transform Your Learning Journey?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of students, teachers, and parents who are already experiencing the future of education.
            </p>
            <button
              onClick={signInWithGoogle}
              className="bg-white text-gray-800 px-12 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-2xl"
            >
              🚀 Start Your Journey - 100% Free
            </button>
          </div>
        </section>

        {/* Emotional Footer */}
        <footer className="bg-gray-900 dark:bg-black text-white py-16 transition-colors">
          <div className="max-w-7xl mx-auto px-4">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center">
                    <span className="text-white font-black text-xl">G</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-black">GyanPod</h4>
                    <p className="text-gray-400 text-sm">Smart Padhai. Pocket Mein Gyan.</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Empowering the next generation with personalized, AI-driven education. 
                  Making quality learning accessible to every student in India and beyond.
                </p>
                <div className="flex space-x-4">
                  <span className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors cursor-pointer">📧</span>
                  <span className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors cursor-pointer">📱</span>
                  <span className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors cursor-pointer">🐦</span>
                </div>
              </div>
              
              <div>
                <h5 className="font-bold mb-4">Quick Links</h5>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#features" className="hover:text-accent-400 transition-colors">Features</a></li>
                  <li><a href="#install" className="hover:text-accent-400 transition-colors">Install App</a></li>
                  <li><a href="#about" className="hover:text-accent-400 transition-colors">About Us</a></li>
                  <li><a href="#support" className="hover:text-accent-400 transition-colors">Support</a></li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-bold mb-4">Resources</h5>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#help" className="hover:text-accent-400 transition-colors">Help Center</a></li>
                  <li><a href="#privacy" className="hover:text-accent-400 transition-colors">Privacy Policy</a></li>
                  <li><a href="#terms" className="hover:text-accent-400 transition-colors">Terms of Use</a></li>
                  <li><a href="#contact" className="hover:text-accent-400 transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
            
            {/* Emotional Credit Section */}
            <div className="border-t border-gray-800 pt-8">
              <div className="text-center">
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-6 max-w-2xl mx-auto border border-gray-700">
                  <div className="flex items-center justify-center space-x-3 mb-3">
                    <span className="text-2xl">💝</span>
                    <p className="text-lg font-semibold text-gray-200">
                      App lovingly developed by <span className="text-accent-400 font-bold">Yashika's Dad</span>.
                    </p>
                  </div>
                  <p className="text-gray-400 italic text-sm leading-relaxed">
                    "So one day, when she looks back, she'll know how much she mattered."
                  </p>
                  <div className="mt-4 flex justify-center space-x-2">
                    <span className="text-pink-400">💖</span>
                    <span className="text-yellow-400">✨</span>
                    <span className="text-blue-400">🌟</span>
                  </div>
                </div>
              </div>
              
              {/* Copyright */}
              <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-6 border-t border-gray-800 text-gray-400 text-sm">
                <div>
                  <p>&copy; 2025 GyanPod. All rights reserved.</p>
                </div>
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                  <span>Made in 🇮🇳 India</span>
                  <span>•</span>
                  <span>Version 2.0</span>
                  <span>•</span>
                  <span className="text-green-400">🔒 Secure</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
