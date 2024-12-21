const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  trackingNumber: { type: String, required: true, unique: true },
  carrier: { type: String, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Shipped', 'In Transit', 'Delivered', 'Returned'],
    default: 'Pending',
  },
  shippingDate: { type: Date },
  deliveryDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Shipment', shipmentSchema);