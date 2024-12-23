const mongoose = require('mongoose');
const Return = require('../models/Return');
const Order = require('../models/Order');

// Create a new return
const createReturn = async (req, res) => {
  try {
    const { order, returnReason } = req.body;

    const existingOrder = await Order.findById(order);
    if (!existingOrder) return res.status(404).json({ error: 'Order not found' });

    const returnItem = new Return({
      order,
      user: req.user.id,
      returnReason,
      status: 'Pending',
    });

    await returnItem.save();
    res.status(201).json({ message: 'Return created successfully', returnItem });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all returns for an admin or user
const getReturns = async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { user: req.user.id };
    const returns = await Return.find(query).populate('order').populate('user', 'name email');

    res.status(200).json({ returns });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update return status (Admin only)
const updateReturnStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const returnItem = await Return.findById(id);
    if (!returnItem) return res.status(404).json({ error: 'Return not found' });

    returnItem.status = status;
    await returnItem.save();

    res.status(200).json({ message: 'Return status updated', returnItem });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createReturn,
  getReturns,
  updateReturnStatus,
};