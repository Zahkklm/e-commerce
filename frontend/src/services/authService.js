import api from './api';

const authService = {
  login: async (credentials) => {
    const { data } = await api.post('/login', credentials);
    localStorage.setItem('token', data.token);
    return data;
  },

  register: async (userData) => {
    const { data } = await api.post('/register', userData);
    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    const { data } = await api.get('/me');
    return data;
  }
};

export default authService;