const express = require('express');
const {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
} = require('../controllers/InvoiceController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticateUser, authorizeRoles('admin'), createInvoice); // Create an invoice
router.get('/', authenticateUser, authorizeRoles('admin'), getInvoices); // Get all invoices
router.get('/:id', authenticateUser, authorizeRoles('admin'), getInvoiceById); // Get a single invoice
router.patch('/:id', authenticateUser, authorizeRoles('admin'), updateInvoice); // Update an invoice
router.delete('/:id', authenticateUser, authorizeRoles('admin'), deleteInvoice); // Delete an invoice

module.exports = router;
