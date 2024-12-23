const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Order = require('../models/Order');
const axios = require('axios');

// Create axios instance with config, payment microservice
const paymentService = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

const cartController = {
  getCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.user.id })
        .populate('items.product');
      
      if (!cart) {
        return res.json({ items: [], total: 0 });
      }
      
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  addToCart: async (req, res) => {
    try {
      console.log('User from request:', req.user); // Debug user object
      console.log('Product ID:', req.params.productId); // Debug product ID

      const { productId } = req.params;
      const product = await Product.findById(productId);
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      let cart = await Cart.findOne({ user: req.user.id }); // Change from .id to ._id
      console.log('Existing cart:', cart); // Debug cart

      if (!cart) {
        cart = new Cart({ 
          user: req.user.id, // Change from .id to ._id
          items: []
        });
      }

      const existingItem = cart.items.find(item => 
        item.product.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({ 
          product: productId, 
          quantity: 1 
        });
      }

      await cart.save();
      
      // Populate product details before sending response
      await cart.populate('items.product');
      res.json(cart);

    } catch (error) {
      console.error('Cart Error:', error); // Debug error
      res.status(500).json({ 
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  },

  removeFromCart: async (req, res) => {
    try {
      const { productId } = req.params;
      const cart = await Cart.findOne({ user: req.user.id });

      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }

      cart.items = cart.items.filter(item => 
        item.product.toString() !== productId
      );

      await cart.save();
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateQuantity: async (req, res) => {
    try {
      const { productId } = req.params;
      const { quantity } = req.body;

      const cart = await Cart.findOne({ user: req.user.id });
      const item = cart.items.find(item => 
        item.product.toString() === productId
      );

      if (!item) {
        return res.status(404).json({ error: 'Item not found in cart' });
      }

      item.quantity = quantity;
      await cart.save();
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  clearCart: async (req, res) => {
    try {
      await Cart.findOneAndUpdate(
        { user: req.user.id },
        { $set: { items: [], total: 0 } }
      );
      res.json({ message: 'Cart cleared' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  checkout: async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.user.id })
        .populate('items.product');

      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
      }

      const totalAmount = cart.items.reduce((sum, item) => {
        return sum + (item.quantity * item.product.price);
      }, 0);

      try {
        const paymentResult = await paymentService.post('', {
          userId: req.user.id,
          amount: totalAmount,
          paymentMethod: req.body.paymentMethod || 'debit/credit',
          orderId: cart._id
        });

        // ...rest of the checkout code...
      } catch (paymentError) {
        console.error('Payment service error:', paymentError);
        return res.status(503).json({
          error: 'Payment service unavailable',
          details: paymentError.message
        });
      }
    } catch (error) {
      console.error('Checkout Error:', error);
      res.status(500).json({
        error: 'Checkout failed',
        details: error.message
      });
    }
  }
};

module.exports = cartController;