const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class APIError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = 'APIError';
  }
}

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new APIError(
      errorData.message || `HTTP ${response.status}: ${response.statusText}`,
      response.status
    );
  }
  return response.json();
};

export const api = {
  // Authentication
  auth: {
    login: (credentials) => 
      fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      }).then(handleResponse),

    register: (userData) =>
      fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      }).then(handleResponse),

    logout: () =>
      fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      }).then(handleResponse),

    refreshToken: () =>
      fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include'
      }).then(handleResponse)
  },

  // Content Management
  content: {
    getAll: (filters) => {
      const params = new URLSearchParams(filters);
      return fetch(`${API_BASE_URL}/content?${params}`).then(handleResponse);
    },

    getById: (id) =>
      fetch(`${API_BASE_URL}/content/${id}`).then(handleResponse),

    create: (contentData) =>
      fetch(`${API_BASE_URL}/content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contentData),
        credentials: 'include'
      }).then(handleResponse),

    update: (id, contentData) =>
      fetch(`${API_BASE_URL}/content/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contentData),
        credentials: 'include'
      }).then(handleResponse),

    delete: (id) =>
      fetch(`${API_BASE_URL}/content/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      }).then(handleResponse)
  },

  // User Management
  users: {
    getProfile: () =>
      fetch(`${API_BASE_URL}/users/profile`, {
        credentials: 'include'
      }).then(handleResponse),

    updateProfile: (userData) =>
      fetch(`${API_BASE_URL}/users/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        credentials: 'include'
      }).then(handleResponse),

    getProgress: () =>
      fetch(`${API_BASE_URL}/users/progress`, {
        credentials: 'include'
      }).then(handleResponse),

    updateProgress: (progressData) =>
      fetch(`${API_BASE_URL}/users/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(progressData),
        credentials: 'include'
      }).then(handleResponse)
  },

  // Analytics
  analytics: {
    getUserStats: () =>
      fetch(`${API_BASE_URL}/analytics/user`, {
        credentials: 'include'
      }).then(handleResponse),

    getContentStats: (contentId) =>
      fetch(`${API_BASE_URL}/analytics/content/${contentId}`, {
        credentials: 'include'
      }).then(handleResponse),

    trackEvent: (eventData) =>
      fetch(`${API_BASE_URL}/analytics/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
        credentials: 'include'
      }).then(handleResponse)
  }
};

export default api;
