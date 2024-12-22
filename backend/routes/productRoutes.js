const express = require('express');
const { createProduct, getAllProducts, updateProduct, deleteProduct, getProductById } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');
const router = express.Router();

// Admin-exclusive routes
router.post('/', authMiddleware, authorizeRoles('admin'), createProduct); // Create product (Admin only)
router.patch('/:id', authMiddleware, authorizeRoles('admin'), updateProduct); // Update product (Admin only)
router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteProduct); // Delete product (Admin only)

// Shared routes (Authenticated users)
router.get('/', getAllProducts); // Get all products (Authenticated users)
router.get('/:id', getProductById); // Get a single product by ID (Authenticated users)

module.exports = router;