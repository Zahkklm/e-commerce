const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'payment-service',
  brokers: ['kafka:9092']
});

const producer = kafka.producer();

const sendPaymentMessage = async (paymentData) => {
  console.log('Sending payment message:', paymentData);
  await producer.connect();
  await producer.send({
    topic: 'payment-completed',
    messages: [{ value: JSON.stringify(paymentData) }]
  });
};

module.exports = { sendPaymentMessage };