const express = require('express');
const {
  registerUser,
  loginUser,
  getAllUsers,
  requestPasswordReset,
  updateUserRole,
  deactivateUser,
} = require('../controllers/UserController');

const router = express.Router();

// Public routes
router.post('/register', registerUser); // Register new user
router.post('/login', loginUser); // Login user
router.post('/request-password-reset', requestPasswordReset); // Request password reset

// Protected routes (require authentication & authorization middleware)
// These middlewares can check the JWT and roles as required
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/users', authenticateUser, authorizeRoles('admin'), getAllUsers); // Get all users (Admin only)
router.patch('/users/:id/role', authenticateUser, authorizeRoles('admin'), updateUserRole); // Update user role (Admin only)
router.patch('/users/:id/deactivate', authenticateUser, authorizeRoles('admin'), deactivateUser); // Deactivate user (Admin only)

module.exports = router;
