// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const validatePassword = (password) => {
  const errors = [];
  
  if (!password) {
    errors.push('Password is required');
    return { isValid: false, errors };
  }
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    strength: getPasswordStrength(password)
  };
};

const getPasswordStrength = (password) => {
  let score = 0;
  
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
  
  if (score <= 2) return 'weak';
  if (score <= 4) return 'medium';
  return 'strong';
};

// Name validation
export const isValidName = (name) => {
  if (!name || name.trim().length < 2) return false;
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  return nameRegex.test(name.trim());
};

// Phone number validation
export const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

// Age validation
export const isValidAge = (age) => {
  const numAge = parseInt(age);
  return !isNaN(numAge) && numAge >= 5 && numAge <= 100;
};

// Class validation
export const isValidClass = (className) => {
  const validClasses = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  return validClasses.includes(className);
};

// Subject validation
export const isValidSubject = (subject) => {
  const validSubjects = [
    'mathematics', 'science', 'physics', 'chemistry', 'biology',
    'english', 'hindi', 'social-science', 'computer-science'
  ];
  return validSubjects.includes(subject);
};

// URL validation
export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// File validation
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 10 * 1024 * 1024, // 10MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
    required = false
  } = options;
  
  const errors = [];
  
  if (required && !file) {
    errors.push('File is required');
    return { isValid: false, errors };
  }
  
  if (!file) {
    return { isValid: true, errors: [] };
  }
  
  if (file.size > maxSize) {
    errors.push(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`);
  }
  
  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type must be one of: ${allowedTypes.join(', ')}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Form validation
export const validateForm = (formData, rules) => {
  const errors = {};
  let isValid = true;
  
  Object.keys(rules).forEach(field => {
    const value = formData[field];
    const fieldRules = Array.isArray(rules[field]) ? rules[field] : [rules[field]];
    const fieldErrors = [];
    
    fieldRules.forEach(rule => {
      if (typeof rule === 'function') {
        const result = rule(value, formData);
        if (result !== true) {
          fieldErrors.push(result);
        }
      } else if (typeof rule === 'object') {
        const { validator, message } = rule;
        if (!validator(value, formData)) {
          fieldErrors.push(message);
        }
      }
    });
    
    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors;
      isValid = false;
    }
  });
  
  return { isValid, errors };
};

// Common validation rules
export const validationRules = {
  required: (message = 'This field is required') => ({
    validator: (value) => value !== null && value !== undefined && value !== '',
    message
  }),
  
  minLength: (min, message) => ({
    validator: (value) => !value || value.length >= min,
    message: message || `Must be at least ${min} characters`
  }),
  
  maxLength: (max, message) => ({
    validator: (value) => !value || value.length <= max,
    message: message || `Must be no more than ${max} characters`
  }),
  
  email: {
    validator: (value) => !value || isValidEmail(value),
    message: 'Please enter a valid email address'
  },
  
  url: {
    validator: (value) => !value || isValidURL(value),
    message: 'Please enter a valid URL'
  },
  
  numeric: {
    validator: (value) => !value || !isNaN(Number(value)),
    message: 'Please enter a valid number'
  },
  
  min: (min, message) => ({
    validator: (value) => !value || Number(value) >= min,
    message: message || `Must be at least ${min}`
  }),
  
  max: (max, message) => ({
    validator: (value) => !value || Number(value) <= max,
    message: message || `Must be no more than ${max}`
  }),
  
  match: (fieldName, message) => ({
    validator: (value, formData) => !value || value === formData[fieldName],
    message: message || `Must match ${fieldName}`
  })
};

export default {
  isValidEmail,
  validatePassword,
  isValidName,
  isValidPhoneNumber,
  isValidAge,
  isValidClass,
  isValidSubject,
  isValidURL,
  validateFile,
  validateForm,
  validationRules
};
