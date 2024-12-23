import API from './index';

export const authAPI = {
  login: (credentials) => API.post('/users/login', credentials),
  register: (userData) => API.post('/users/register', userData),
  logout: () => API.post('/users/logout'),
  verifyToken: () => API.get('/users/verify'),
  getProfile: () => API.get('/users/profile'),
  updateProfile: (data) => API.patch('/users/profile', data)
};