const Payment = require('../models/Payment');
const { sendPaymentMessage } = require('../services/kafkaProducer');

const processPayment = async (req, res) => {
  try {
    const { userId, amount, paymentMethod, orderId } = req.body;

    // Create payment record
    const payment = new Payment({
      userId,
      amount,
      paymentMethod,
      orderId,
      status: 'pending'
    });

    await payment.save();

    // Process payment logic here (e.g., Stripe, PayPal)
    // ... payment processing ...

    // Update payment status
    payment.status = 'completed';
    await payment.save();

    // Send message to Kafka for invoice creation
    await sendPaymentMessage({
      paymentId: payment._id,
      orderId,
      amount,
      userId,
      status: 'completed'
    });

    res.json({ 
      status: 'completed',
      paymentId: payment._id,
      message: 'Payment processed successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'failed',
      error: error.message 
    });
  }
};

module.exports = { processPayment };