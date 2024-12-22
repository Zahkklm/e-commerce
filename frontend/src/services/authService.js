import api from './api';

const authService = {
  login: async (credentials) => {
    const { data } = await api.post('/users/login', credentials);
    localStorage.setItem('token', data.token);
    return data;
  },

  register: async (userData) => {
    const { data } = await api.post('/users/register', userData);
    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    const { data } = await api.get('/users/me');
    return data;
  }
};

export default authService;