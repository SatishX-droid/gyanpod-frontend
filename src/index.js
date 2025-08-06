import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { SettingsProvider } from './context/SettingsContext';
import { ToastContainer } from './components/common/Notification';
import reportWebVitals from './reportWebVitals';

// Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('🎉 SW registered successfully:', registration);
        
        // Update available
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Show update available notification
              window.addToast?.({
                type: 'info',
                title: 'Update Available!',
                message: 'A new version is available. Refresh to update.',
                duration: 0,
                action: (
                  <button
                    onClick={() => window.location.reload()}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                  >
                    Update Now
                  </button>
                )
              });
            }
          });
        });
      })
      .catch((registrationError) => {
        console.log('❌ SW registration failed:', registrationError);
      });
  });
}

// PWA Install prompt handling
let deferredPrompt;
window.installPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('📱 Install prompt ready');
  e.preventDefault();
  deferredPrompt = e;
  window.installPrompt = deferredPrompt;
  
  // Show install notification after 10 seconds
  setTimeout(() => {
    if (deferredPrompt) {
      window.addToast?.({
        type: 'info',
        title: '📱 Install GyanPod App',
        message: 'Install our app for better experience!',
        duration: 8000,
        action: (
          <button
            onClick={async () => {
              if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`User ${outcome} the install prompt`);
                deferredPrompt = null;
                window.installPrompt = null;
              }
            }}
            className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
          >
            Install
          </button>
        )
      });
    }
  }, 10000);
});

// PWA installation success
window.addEventListener('appinstalled', (evt) => {
  console.log('🎉 GyanPod app installed successfully!');
  deferredPrompt = null;
  window.installPrompt = null;
  
  // Show success message
  window.addToast?.({
    type: 'success',
    title: 'App Installed! 🎉',
    message: 'GyanPod is now installed on your device.',
    duration: 5000
  });
  
  // Track installation
  // eslint-disable-next-line no-undef
  if (typeof gtag !== 'undefined') {
    // eslint-disable-next-line no-undef
    gtag('event', 'app_installed', {
      event_category: 'PWA',
      event_label: 'GyanPod App Installation'
    });
  }
});

// Global error handlers
window.addEventListener('error', (e) => {
  console.error('❌ Global error:', e.error);
  
  // Show user-friendly error message for critical errors
  if (e.error && e.error.message && !e.error.message.includes('Loading chunk')) {
    window.addToast?.({
      type: 'error',
      title: 'Something went wrong',
      message: 'Please refresh the page or try again later.',
      duration: 8000,
      action: (
        <button
          onClick={() => window.location.reload()}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
        >
          Refresh
        </button>
      )
    });
  }
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('❌ Unhandled promise rejection:', e.reason);
  
  // Handle specific promise rejections
  if (e.reason?.code === 'auth/network-request-failed') {
    window.addToast?.({
      type: 'warning',
      title: 'Network Error',
      message: 'Please check your internet connection.',
      duration: 5000
    });
  }
});

// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'navigation') {
      console.log(`📊 Page load time: ${entry.loadEventEnd - entry.loadEventStart}ms`);
    }
  }
});

if ('PerformanceObserver' in window) {
  performanceObserver.observe({ entryTypes: ['navigation'] });
}

// Network status monitoring
window.addEventListener('online', () => {
  console.log('🌐 Back online');
  window.addToast?.({
    type: 'success',
    title: 'Connection Restored',
    message: 'You\'re back online! All features are available.',
    duration: 3000
  });
});

window.addEventListener('offline', () => {
  console.log('📡 Gone offline');
  window.addToast?.({
    type: 'warning',
    title: 'No Internet Connection',
    message: 'Some features may be limited in offline mode.',
    duration: 5000
  });
});

// Analytics initialization (if in production)
if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_GA_TRACKING_ID) {
  // Google Analytics
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.REACT_APP_GA_TRACKING_ID}`;
  script.async = true;
  document.head.appendChild(script);
  
  // eslint-disable-next-line no-undef
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line no-undef
  function gtag(){dataLayer.push(arguments);} // eslint-disable-line no-unused-vars
  
  // Wait for gtag to be available
  setTimeout(() => {
    // eslint-disable-next-line no-undef
    if (typeof gtag !== 'undefined') {
      // eslint-disable-next-line no-undef
      gtag('js', new Date());
      // eslint-disable-next-line no-undef
      gtag('config', process.env.REACT_APP_GA_TRACKING_ID, {
        page_title: 'GyanPod - Smart Learning Platform',
        page_location: window.location.href
      });
      
      console.log('📈 Analytics initialized');
    }
  }, 1000);
}

// Keyboard shortcuts for developers
if (process.env.NODE_ENV === 'development') {
  document.addEventListener('keydown', (e) => {
    // Ctrl+Shift+C - Clear all data
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
      // eslint-disable-next-line no-restricted-globals
      if (window.confirm('Clear all app data? This will reset everything.')) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
      }
    }
    
    // Ctrl+Shift+I - Show install prompt
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
      if (window.installPrompt) {
        window.installPrompt.prompt();
      } else {
        console.log('📱 Install prompt not available');
      }
    }
  });
  
  console.log('⌨️ Dev shortcuts enabled:');
  console.log('   Ctrl+Shift+C - Clear data');
  console.log('   Ctrl+Shift+I - Show install prompt');
}

// Hide loading screen with smooth animation
const hideLoadingScreen = () => {
  const loadingElement = document.getElementById('loading');
  if (loadingElement) {
    loadingElement.style.opacity = '0';
    loadingElement.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    
    setTimeout(() => {
      try {
        loadingElement.remove();
        console.log('🎭 Loading screen removed');
      } catch (error) {
        console.warn('Loading screen already removed');
      }
    }, 800);
  }
};

// App initialization
console.log('🚀 GyanPod - Smart Learning Platform');
console.log('📱 Version: 2.0.0');
console.log('🔧 Environment:', process.env.NODE_ENV);

// Create React root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render app with providers
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <SettingsProvider>
        <AuthProvider>
          <App />
          <ToastContainer />
        </AuthProvider>
      </SettingsProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// Hide loading screen after app renders
setTimeout(() => {
  hideLoadingScreen();
}, 2500);

// Web Vitals measurement
reportWebVitals((metric) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 ${metric.name}:`, metric.value, metric.unit);
  }
  
  // Send to analytics in production
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV === 'production' && typeof gtag !== 'undefined') {
    // eslint-disable-next-line no-undef
    gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true
    });
  }
});

export default root;
