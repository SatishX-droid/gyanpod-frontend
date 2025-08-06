import React, { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  const loadingMessages = [
    "🚀 Preparing your smart learning experience...",
    "📚 Loading personalized content for you...",
    "🧠 Activating AI-powered features...",
    "⚡ Setting up your study dashboard...",
    "🎯 Almost ready for genius mode..."
  ];

  const studyTips = [
    "💡 Tip: Take 5-minute breaks every 25 minutes for better focus!",
    "🎯 Tip: Review yesterday's topics before starting new ones!",
    "📈 Tip: Practice daily to maintain your learning streak!",
    "🌟 Tip: Ask doubts immediately - don't let them pile up!"
  ];

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);

    // Message rotation
    const messageInterval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % studyTips.length);
    }, 2500);

    // Show message after 1 second
    setTimeout(() => setShowMessage(true), 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-accent-500 to-success-500 animate-gradient-xy">
        {/* Floating Shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-white/15 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-white/20 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
        
        {/* Floating Icons */}
        <div className="absolute top-1/3 left-1/4 text-4xl animate-bounce" style={{animationDelay: '0.2s'}}>📚</div>
        <div className="absolute top-2/3 right-1/3 text-3xl animate-bounce" style={{animationDelay: '0.8s'}}>🧠</div>
        <div className="absolute bottom-1/4 left-1/2 text-3xl animate-bounce" style={{animationDelay: '1.2s'}}>⚡</div>
        <div className="absolute top-1/2 right-1/4 text-2xl animate-bounce" style={{animationDelay: '0.5s'}}>🎯</div>
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center px-6 max-w-md mx-auto">
        {/* Logo Animation */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl flex items-center justify-center animate-pulse-scale relative overflow-hidden">
            {/* Logo Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer"></div>
            
            {/* Main Logo */}
            <div className="relative z-10">
              <div className="text-6xl font-black bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent animate-glow">
                G
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-success-400 rounded-full animate-ping"></div>
            </div>
          </div>
          
          {/* Orbital Rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-36 h-36 border-2 border-white/20 rounded-full animate-spin-slow"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-44 h-44 border border-white/10 rounded-full animate-spin-reverse"></div>
          </div>
        </div>
        
        {/* Brand Name */}
        <div className="mb-6">
          <h1 className="text-6xl font-black text-white mb-2 animate-fade-in-up tracking-wider">
            Gyan<span className="text-accent-300">Pod</span>
          </h1>
          <p className="text-2xl text-white/90 font-medium animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            Smart Padhai. <span className="text-accent-200 font-bold">Pocket Mein Gyan</span>.
          </p>
        </div>
        
        {/* Loading Progress */}
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <div className="relative w-full h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            {/* Progress Bar */}
            <div 
              className="h-full bg-gradient-to-r from-white via-accent-200 to-success-300 rounded-full transition-all duration-500 relative"
              style={{ width: `${Math.min(loadingProgress, 100)}%` }}
            >
              {/* Moving Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-slide-right"></div>
            </div>
          </div>
          
          {/* Progress Text */}
          <div className="flex justify-between mt-2 text-white/80 text-sm font-medium">
            <span>Loading...</span>
            <span>{Math.min(Math.round(loadingProgress), 100)}%</span>
          </div>
        </div>
        
        {/* Loading Messages */}
        <div className="mb-6 h-8">
          {loadingMessages.map((message, index) => (
            <div
              key={index}
              className={`text-white/90 text-lg font-medium transition-all duration-500 ${
                index === Math.floor(loadingProgress / 20) ? 'opacity-100 animate-pulse' : 'opacity-0 absolute'
              }`}
            >
              {message}
            </div>
          ))}
        </div>
        
        {/* Study Tips */}
        {showMessage && (
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 animate-fade-in-up">
            <div className="text-white/90 text-sm transition-all duration-500">
              {studyTips[currentTip]}
            </div>
          </div>
        )}
        
        {/* Loading Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
      
      {/* Bottom Branding */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-white/70 text-sm mb-2">
          Powered by Advanced Learning AI
        </div>
        <div className="flex justify-center space-x-6 text-xs text-white/50">
          <span className="flex items-center space-x-1">
            <span>🔐</span>
            <span>Secure</span>
          </span>
          <span className="flex items-center space-x-1">
            <span>⚡</span>
            <span>Fast</span>
          </span>
          <span className="flex items-center space-x-1">
            <span>🎯</span>
            <span>Smart</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
