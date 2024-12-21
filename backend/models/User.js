const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'user' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
  verified: { type: Boolean, default: false },
  verificationToken: { type: String },
  verificationTokenExpiry: { type: Date },
  resetPasswordToken: { type: String },
  resetPasswordTokenExpiry: { type: Date },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wishlist' }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
  paymentMethods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PaymentMethod' }],
  settings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserSettings',
    default: null,
  },
});

module.exports = mongoose.model('User', userSchema);
