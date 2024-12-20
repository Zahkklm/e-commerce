const express = require('express');
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  deleteOrder,
} = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');
const router = express.Router();

// Admin-exclusive routes
router.get('/', authMiddleware, authorizeRoles('admin'), getOrders); // Get all orders
router.patch('/:id/status', authMiddleware, authorizeRoles('admin'), updateOrderStatus); // Update order status
router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteOrder); // Delete an order

// Shared routes (Admin and User)
router.get('/:id', authMiddleware, getOrder); // Get a single order

// User-specific route
router.post('/', authMiddleware, createOrder); // Create an order (Users only)

module.exports = router;
