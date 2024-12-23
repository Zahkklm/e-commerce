const { Kafka } = require('kafkajs');

const testKafkaConsumer = async () => {
  const kafka = new Kafka({
    clientId: 'test-consumer',
    brokers: ['localhost:9092']
  });

  const consumer = kafka.consumer({ groupId: 'test-group' });

  try {
    await consumer.connect();
    console.log('Consumer connected');

    await consumer.subscribe({ topic: 'payment-completed' });
    console.log('Subscribed to topic');

    await consumer.run({
      eachMessage: async ({ message }) => {
        console.log('Received message:', message.value.toString());
      },
    });
  } catch (error) {
    console.error('Consumer error:', error);
  }
};

testKafkaConsumer();