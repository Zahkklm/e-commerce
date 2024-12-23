const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

// Cart operations
router.get('/', cartController.getCart);
router.post('/items/:productId', cartController.addToCart);
router.delete('/items/:productId', cartController.removeFromCart);
router.patch('/items/:productId', cartController.updateQuantity);
router.delete('/', cartController.clearCart);

// Checkout operation
router.post('/checkout', cartController.checkout);

module.exports = router;