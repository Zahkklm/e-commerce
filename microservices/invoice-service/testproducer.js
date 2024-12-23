const { Kafka } = require('kafkajs');

const testKafkaProducer = async () => {
  const kafka = new Kafka({
    clientId: 'test-client',
    brokers: ['localhost:9092'], // Change from kafka:9092 to localhost:9092
    connectionTimeout: 10000, // Increase timeout
    retry: {
      initialRetryTime: 100,
      retries: 5
    }
  });

  const producer = kafka.producer();

  try {
    console.log('Attempting to connect to Kafka...');
    await producer.connect();
    console.log('Producer connected successfully');

    await producer.send({
      topic: 'payment-completed',
      messages: [
        { value: JSON.stringify({ test: 'message' }) }
      ],
    });
    console.log('Test message sent');
    
    await producer.disconnect();
  } catch (error) {
    console.error('Producer error:', error);
  }
};

// Add error handling
process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
  process.exit(1);
});

testKafkaProducer();