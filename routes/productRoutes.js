const express = require('express');
const { createProduct, getAllProducts } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, createProduct); // Admin only
router.get('/', authMiddleware, getAllProducts); // Authenticated users

module.exports = router;
