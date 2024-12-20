const express = require('express');
const {
  createInvoice,
  getInvoices,
  getInvoiceById,
  getUserInvoices,
  updateInvoice,
  deleteInvoice,
} = require('../controllers/invoiceController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');

const router = express.Router();

// Admin-exclusive routes
router.post('/', authMiddleware, authorizeRoles('admin'), createInvoice); // Create an invoice
router.get('/', authMiddleware, authorizeRoles('admin'), getInvoices); // Get all invoices
router.patch('/:id', authMiddleware, authorizeRoles('admin'), updateInvoice); // Update an invoice
router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteInvoice); // Delete an invoice

// Shared routes (Admin and User)
router.get('/:id', authMiddleware, getInvoiceById); // Get a single invoice

// User-specific route
router.get('/user/:userId', authMiddleware, getUserInvoices); // Get all invoices for a specific user

module.exports = router;
