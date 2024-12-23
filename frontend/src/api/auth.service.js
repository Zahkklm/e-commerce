import { authAPI } from '../api/auth.api';

export const authService = {
  setToken: (token) => {
    localStorage.setItem('token', token);
  },
  
  getToken: () => {
    return localStorage.getItem('token');
  },
  
  removeToken: () => {
    localStorage.removeItem('token');
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  login: async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      const { token, user } = response.data;
      authService.setToken(token);
      return user;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  register: async (userData) => {
    try {
      const response = await authAPI.register(userData);
      const { token, user } = response.data;
      authService.setToken(token);
      return user;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  logout: async () => {
    try {
      await authAPI.logout();
      authService.removeToken();
    } catch (error) {
      console.error('Logout failed:', error);
      authService.removeToken(); // Remove token anyway
    }
  },

  verifyAuth: async () => {
    try {
      if (!authService.isAuthenticated()) {
        return false;
      }
      await authAPI.verifyToken();
      return true;
    } catch (error) {
      authService.removeToken();
      return false;
    }
  }
};