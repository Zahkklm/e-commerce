const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/invoiceRouters');
const { startConsumer } = require('./services/kafkaConsumer');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use('/api', routes);

mongoose.connect('mongodb://127.0.0.1:27017/e-commerce-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Start Kafka consumer
startConsumer().catch(err => console.error('Error starting Kafka consumer:', err));

app.listen(PORT, () => {
  console.log(`Invoice service running on port ${PORT}`);
});