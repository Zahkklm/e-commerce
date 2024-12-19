const Order = require('../models/Order');
const Product = require('../models/Product');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { items, paymentMethod, shippingAddress, billingAddress } = req.body;

    // Calculate the total amount
    const itemDetails = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) throw new Error(`Product with ID ${item.product} not found.`);
        if (product.quantity < item.quantity) throw new Error(`Insufficient stock for ${product.name}.`);

        return {
          product: item.product,
          quantity: item.quantity,
          price: product.price,
          total: product.price * item.quantity,
        };
      })
    );

    const totalAmount = itemDetails.reduce((sum, item) => sum + item.total, 0);

    // Create the order
    const order = new Order({
      user: req.user._id,
      items: itemDetails,
      status: 'Pending',
      paymentMethod,
      totalAmount,
      shippingAddress,
      billingAddress,
    });

    await order.save();

    // Update product stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { quantity: -item.quantity },
      });
    }

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all orders for an admin or user
const getOrders = async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { user: req.user._id };
    const orders = await Order.find(query)
      .populate('user', 'name email')
      .populate('items.product', 'name price');

    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single order
const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate('user', 'name email')
      .populate('items.product', 'name price');

    if (!order) return res.status(404).json({ error: 'Order not found' });

    if (req.user.role !== 'admin' && req.user._id.toString() !== order.user.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update order status (Admin only)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    order.status = status;

    if (status === 'Cancelled') {
      order.cancelledAt = Date.now();
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { quantity: item.quantity },
        });
      }
    } else if (status === 'Delivered') {
      order.deliveredAt = Date.now();
    }

    await order.save();

    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  deleteOrder,
};
