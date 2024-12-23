// payment-service/src/services/kafkaProducer.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'payment-service',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

const sendPaymentMessage = async (paymentData) => {
  await producer.connect();
  await producer.send({
    topic: 'payment-completed',
    messages: [{ value: JSON.stringify(paymentData) }]
  });
};

module.exports = { sendPaymentMessage };