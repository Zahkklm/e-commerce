const Invoice = require('../models/Invoice');

const createInvoice = async (paymentData) => {
  try {
    const invoice = new Invoice({
      paymentId: paymentData.paymentId,
      orderId: paymentData.orderId,
      amount: paymentData.amount,
      status: 'generated'
    });

    await invoice.save();
    console.log('Invoice created:', invoice._id);
    return invoice;
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw error;
  }
};

module.exports = { createInvoice };