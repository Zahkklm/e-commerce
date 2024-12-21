import api from './api';

const paymentService = {
  processPayment: async (paymentData) => {
    const { data } = await api.post('/payments', paymentData);
    return data;
  },
  
  getPaymentStatus: async (paymentId) => {
    const { data } = await api.get(`/payments/${paymentId}`);
    return data;
  }
};

export default paymentService;