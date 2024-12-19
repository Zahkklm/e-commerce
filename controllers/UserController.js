const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

// Helper function to generate JWT tokens
const generateToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};

// Register a new user with email verification
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = generateToken({ email }, process.env.JWT_SECRET, '1h');

    // Create the user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiry: Date.now() + 3600000, // 1 hour
    });

    await user.save();

    // Send verification email
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
    await sendEmail({
      to: email,
      subject: 'Verify Your Email',
      text: `Click the link to verify your email: ${verificationLink}`,
    });

    res.status(201).json({ message: 'User registered successfully. Please verify your email.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Verify user email
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email, verificationToken: token });

    if (!user || user.verified) {
      return res.status(400).json({ error: 'Invalid or expired token.' });
    }

    user.verified = true;
    user.verificationToken = null;
    user.verificationTokenExpiry = null;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add an item to the wishlist
const addToWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ error: 'Product already in wishlist' });
    }

    user.wishlist.push(productId);
    await user.save();

    res.status(200).json({ message: 'Product added to wishlist', wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove an item from the wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
    await user.save();

    res.status(200).json({ message: 'Product removed from wishlist', wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add an address
const addAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const { address } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.addresses.push(address);
    await user.save();

    res.status(200).json({ message: 'Address added successfully', addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an address
const deleteAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const { addressId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.addresses = user.addresses.filter((id) => id.toString() !== addressId);
    await user.save();

    res.status(200).json({ message: 'Address removed successfully', addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user's wishlist, cart, and orders
const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .populate('cart')
      .populate('wishlist')
      .populate('orders')
      .populate('reviews')
      .populate('addresses')
      .populate('settings');

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  verifyEmail,
  loginUser,
  getAllUsers,
  requestPasswordReset,
  updateUserRole,
  deactivateUser,
  addToWishlist,
  removeFromWishlist,
  addAddress,
  deleteAddress,
  getUserDetails,
};
