const { Kafka } = require('kafkajs');
const { createInvoice } = require('../controllers/invoiceController');

const kafka = new Kafka({
  clientId: 'invoice-service',
  brokers: ['kafka:9092'],
  connectionTimeout: 10000, // Increase connection timeout
  retry: {
    initialRetryTime: 100,
    retries: 1000
  }
});

const consumer = kafka.consumer({ groupId: 'invoice-group' });

const startConsumer = async () => {
  try {
    await consumer.connect();
    console.log('Kafka consumer connected');
    await consumer.subscribe({ topic: 'payment-completed' });
    console.log('Subscribed to topic: payment-completed');

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const paymentData = JSON.parse(message.value.toString());
          console.log('Received message:', paymentData);
          // Create invoice based on payment data
          await createInvoice({ body: paymentData }, { json: () => {} });
        } catch (error) {
          console.error('Error processing message:', error);
        }
      },
    });
  } catch (error) {
    console.error('Error in Kafka consumer:', error);
  }
};

module.exports = { startConsumer };