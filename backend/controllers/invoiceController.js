const Invoice = require('../models/Invoice');
const Order = require('../models/Order');

// Generate a unique invoice number with better formatting
const generateInvoiceNumber = () => {
  const date = new Date();
  const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
  return `INV-${formattedDate}-${Math.floor(1000 + Math.random() * 9000)}`;
};

// Create an invoice
const createInvoice = async (req, res) => {
  try {
    const { orderId, dueDate, notes } = req.body;

    // Find the order and populate necessary details
    const order = await Order.findById(orderId).populate('user items.product');
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if an invoice for the order already exists
    const existingInvoice = await Invoice.findOne({ order: orderId });
    if (existingInvoice) {
      return res.status(400).json({ error: 'Invoice for this order already exists' });
    }

    // Create a new invoice
    const invoice = new Invoice({
      order: orderId,
      user: order.user,
      invoiceNumber: generateInvoiceNumber(),
      issueDate: Date.now(),
      dueDate,
      totalAmount: order.totalAmount,
      paymentMethod: order.paymentMethod,
      items: order.items,
      notes,
    });

    await invoice.save();
    res.status(201).json({ message: 'Invoice created successfully', invoice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all invoices
const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate('order', 'status totalAmount')
      .populate('user', 'name email');

    res.status(200).json({ invoices });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an invoice by ID
const getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findById(id)
      .populate('order', 'status totalAmount')
      .populate('user', 'name email');

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Ensure user can only access their invoice (if not admin)
    if (req.user.role !== 'admin' && invoice.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.status(200).json({ invoice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an invoice
const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const invoice = await Invoice.findByIdAndUpdate(id, updates, { new: true });
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    res.status(200).json({ message: 'Invoice updated successfully', invoice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an invoice
const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await Invoice.findByIdAndDelete(id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    res.status(200).json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all invoices for a specific user
const getUserInvoices = async (req, res) => {
  try {
    const { userId } = req.params;

    if (req.user.role !== 'admin' && req.user.id !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const invoices = await Invoice.find({ user: userId }).populate('order', 'status totalAmount');
    res.status(200).json({ invoices });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createInvoice,
  getInvoices,
  getInvoiceById,
  getUserInvoices,
  updateInvoice,
  deleteInvoice,
};
