const express = require('express');
const mongoose = require('mongoose');
const { processPayment } = require('./controllers/paymentController');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/payment-db")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Payment routes
app.post('/api/payments/process', async (req, res) => {
  try {
    const result = await processPayment(req.body);
    res.json(result);
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({ 
      status: 'failed',
      error: error.message 
    });
  }
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something broke!',
    details: err.message 
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Payment service running on port ${PORT}`);
});