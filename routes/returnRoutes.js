const express = require('express');
const {
  createReturn,
  getReturns,
  updateReturnStatus,
} = require('../controllers/returnController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');
const router = express.Router();

// Admin-exclusive routes
router.patch('/:id/status', authMiddleware, authorizeRoles('admin'), updateReturnStatus); // Update return status

// Shared routes (Admin and User)
router.get('/', authMiddleware, getReturns); // Get all returns

// User-specific route
router.post('/', authMiddleware, createReturn); // Create a return (Users only)

module.exports = router;