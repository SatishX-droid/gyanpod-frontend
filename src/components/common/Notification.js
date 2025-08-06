import React, { useState, useEffect } from 'react';

const Notification = ({ 
  type = 'info', 
  title, 
  message, 
  duration = 5000, 
  onClose,
  action
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Allow fade out animation
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const types = {
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      icon: '✅',
      iconBg: 'bg-green-100 dark:bg-green-800',
      titleColor: 'text-green-800 dark:text-green-200',
      messageColor: 'text-green-600 dark:text-green-300'
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      icon: '❌',
      iconBg: 'bg-red-100 dark:bg-red-800',
      titleColor: 'text-red-800 dark:text-red-200',
      messageColor: 'text-red-600 dark:text-red-300'
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      icon: '⚠️',
      iconBg: 'bg-yellow-100 dark:bg-yellow-800',
      titleColor: 'text-yellow-800 dark:text-yellow-200',
      messageColor: 'text-yellow-600 dark:text-yellow-300'
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      icon: 'ℹ️',
      iconBg: 'bg-blue-100 dark:bg-blue-800',
      titleColor: 'text-blue-800 dark:text-blue-200',
      messageColor: 'text-blue-600 dark:text-blue-300'
    }
  };

  const config = types[type];

  if (!isVisible) return null;

  return (
    <div className={`
      fixed top-4 right-4 z-50 max-w-sm w-full
      ${config.bg} ${config.border} border rounded-xl shadow-lg
      transform transition-all duration-300 ease-out
      ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
    `}>
      <div className="p-4">
        <div className="flex items-start">
          <div className={`flex-shrink-0 w-8 h-8 ${config.iconBg} rounded-full flex items-center justify-center`}>
            <span className="text-sm">{config.icon}</span>
          </div>
          
          <div className="ml-3 flex-1">
            {title && (
              <h3 className={`text-sm font-medium ${config.titleColor}`}>
                {title}
              </h3>
            )}
            {message && (
              <p className={`${title ? 'mt-1' : ''} text-sm ${config.messageColor}`}>
                {message}
              </p>
            )}
            {action && (
              <div className="mt-3">
                {action}
              </div>
            )}
          </div>
          
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <span className="text-lg">×</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Toast manager component
export const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Date.now();
    const newToast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Expose addToast function globally
  useEffect(() => {
    window.addToast = addToast;
    return () => {
      delete window.addToast;
    };
  }, []);

  return (
    <div className="fixed top-0 right-0 z-50 p-4 space-y-4 pointer-events-none">
      {toasts.map(toast => (
        <div key={toast.id} className="pointer-events-auto">
          <Notification
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default Notification;
