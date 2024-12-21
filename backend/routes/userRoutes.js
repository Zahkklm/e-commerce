const express = require('express');
const {
  registerUser,
  loginUser,
  getAllUsers,
  requestPasswordReset,
  updateUserRole,
  deactivateUser,
} = require('../controllers/userController');

const router = express.Router();

// Public routes
router.post('/register', registerUser); // Register new user
router.post('/login', loginUser); // Login user
router.post('/request-password-reset', requestPasswordReset); // Request password reset

// Protected routes (require authentication & authorization middleware)
// These middlewares can check the JWT and roles as required
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');

router.get('/', authMiddleware, authorizeRoles('admin'), getAllUsers); // Get all users (Admin only)
router.patch('/:id/role', authMiddleware, authorizeRoles('admin'), updateUserRole); // Update user role (Admin only)
router.patch('/:id/deactivate', authMiddleware, authorizeRoles('admin'), deactivateUser); // Deactivate user (Admin only)

module.exports = router;
