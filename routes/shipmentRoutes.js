const express = require('express');
const {
  createShipment,
  getShipments,
  getShipment,
  updateShipmentStatus,
  deleteShipment,
} = require('../controllers/shipmentController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');
const router = express.Router();

// Admin-exclusive routes
router.patch('/:id/status', authMiddleware, authorizeRoles('admin'), updateShipmentStatus); // Update shipment status
router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteShipment); // Delete a shipment

// Shared routes (Admin and User)
router.get('/:id', authMiddleware, getShipment); // Get a single shipment
router.get('/', authMiddleware, getShipments); // Get all shipments

// User-specific route
router.post('/', authMiddleware, createShipment); // Create a shipment (Users only)

module.exports = router;