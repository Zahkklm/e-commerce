// invoice-service/src/services/kafkaConsumer.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'invoice-service',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'invoice-group' });

const startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'payment-completed' });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const paymentData = JSON.parse(message.value);
      // Create invoice based on payment data
      await createInvoice(paymentData);
    },
  });
};

module.exports = { startConsumer };