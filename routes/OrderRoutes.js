const express = require('express');
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  deleteOrder,
} = require('../controllers/orderController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin-exclusive routes
router.get('/', authenticateUser, authorizeRoles('admin'), getOrders); // Get all orders
router.patch('/:id/status', authenticateUser, authorizeRoles('admin'), updateOrderStatus); // Update order status
router.delete('/:id', authenticateUser, authorizeRoles('admin'), deleteOrder); // Delete an order

// Shared routes (Admin and User)
router.get('/:id', authenticateUser, getOrder); // Get a single order

// User-specific route
router.post('/', authenticateUser, createOrder); // Create an order (Users only)

module.exports = router;
