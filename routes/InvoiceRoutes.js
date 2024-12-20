const express = require('express');
const {
  createInvoice,
  getInvoices,
  getInvoiceById,
  getUserInvoices,
  updateInvoice,
  deleteInvoice,
} = require('../controllers/InvoiceController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin-exclusive routes
router.post('/', authenticateUser, authorizeRoles('admin'), createInvoice); // Create an invoice
router.get('/', authenticateUser, authorizeRoles('admin'), getInvoices); // Get all invoices
router.patch('/:id', authenticateUser, authorizeRoles('admin'), updateInvoice); // Update an invoice
router.delete('/:id', authenticateUser, authorizeRoles('admin'), deleteInvoice); // Delete an invoice

// Shared routes (Admin and User)
router.get('/:id', authenticateUser, getInvoiceById); // Get a single invoice

// User-specific route
router.get('/user/:userId', authenticateUser, getUserInvoices); // Get all invoices for a specific user

module.exports = router;
