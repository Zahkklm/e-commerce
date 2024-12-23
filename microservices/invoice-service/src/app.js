const express = require('express');
const mongoose = require('mongoose');
const { startConsumer } = require('./services/kafkaConsumer');
const invoiceRoutes = require('./routes/invoiceRoutes');

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/invoice-db")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/invoices', invoiceRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start Kafka consumer
startConsumer().catch(console.error);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something broke!',
    details: err.message 
  });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Invoice service running on port ${PORT}`);
});