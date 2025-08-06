import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  helper,
  icon,
  className = '',
  type = 'text',
  size = 'md',
  variant = 'default',
  ...props
}, ref) => {
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3',
    lg: 'px-5 py-4 text-lg'
  };

  const variants = {
    default: 'border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500',
    error: 'border-red-300 focus:border-red-500 focus:ring-red-500',
    success: 'border-green-300 focus:border-green-500 focus:ring-green-500'
  };

  const inputVariant = error ? 'error' : variant;

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{icon}</span>
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={`
            block w-full rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors
            ${sizes[size]}
            ${variants[inputVariant]}
            ${icon ? 'pl-10' : ''}
            ${error ? 'pr-10' : ''}
          `.trim().replace(/\s+/g, ' ')}
          {...props}
        />
        
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-red-500">⚠️</span>
          </div>
        )}
      </div>
      
      {helper && !error && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{helper}</p>
      )}
      
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
