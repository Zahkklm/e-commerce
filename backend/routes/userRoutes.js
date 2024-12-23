const express = require('express');
const {
  registerUser,
  loginUser,
  getAllUsers,
  requestPasswordReset,
  updateUserRole,
  deactivateUser,
  getProfile,
  updateProfile
} = require('../controllers/userController');

const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/request-password-reset', requestPasswordReset);

// Protected user routes
router.get('/profile', authMiddleware, getProfile);
router.patch('/profile', authMiddleware, updateProfile);

// Admin only routes
router.get('/', authMiddleware, authorizeRoles('admin'), getAllUsers);
router.patch('/:id/role', authMiddleware, authorizeRoles('admin'), updateUserRole);
router.patch('/:id/deactivate', authMiddleware, authorizeRoles('admin'), deactivateUser);

module.exports = router;