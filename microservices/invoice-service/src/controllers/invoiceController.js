const Invoice = require('../models/Invoice');

const createInvoice = async (req, res) => {
  try {
    const { paymentId, orderId, amount, userId, status } = req.body;

    const invoice = new Invoice({
      paymentId,
      orderId,
      amount,
      userId,
      status
    });

    await invoice.save();

    if (res && res.json) {
      res.json({
        status: 'success',
        message: 'Invoice created successfully',
        invoice
      });
    }
  } catch (error) {
    if (res && res.status) {
      res.status(500).json({
        status: 'failed',
        error: error.message
      });
    } else {
      console.error('Error creating invoice:', error.message);
    }
  }
};

module.exports = { createInvoice };