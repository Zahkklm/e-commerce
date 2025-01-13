const Payment = require('../models/Payment');
const { sendPaymentMessage } = require('../services/kafkaProducer');

const processPayment = async (req, res) => {
  try {
    console.log('req:', req.body);
    const { user, _id: cartId, items, paymentMethod, orderId, total } = req.body; // Extracting from request body
    const userId = user; 

    console.log("User ID:", userId);
    console.log("Cart ID:", cartId);

    // Calculate the total amount
    const totalAmount = total;
    console.log("Total Amount:", totalAmount);

    // Create payment record
    const payment = new Payment({
      amount: totalAmount,
      paymentMethod,
      status: 'pending',
      user: user,
      currency: 'USD',
      createdAt: Date.now()
    });

    // Save pending payment 
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
      amount: totalAmount,
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