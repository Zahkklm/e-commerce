const Shipment = require('../models/Shipment');

// Create a new shipment
const createShipment = async (req, res) => {
  try {
    const { order, trackingNumber, carrier, shippingDate } = req.body;

    const shipment = new Shipment({
      order,
      trackingNumber,
      carrier,
      shippingDate,
      status: 'Pending',
    });

    await shipment.save();

    res.status(201).json({ message: 'Shipment created successfully', shipment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all shipments
const getShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find().populate('order');

    res.status(200).json({ shipments });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single shipment
const getShipment = async (req, res) => {
  try {
    const { id } = req.params;
    const shipment = await Shipment.findById(id).populate('order');

    if (!shipment) return res.status(404).json({ error: 'Shipment not found' });

    res.status(200).json({ shipment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update shipment status
const updateShipmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const shipment = await Shipment.findById(id);
    if (!shipment) return res.status(404).json({ error: 'Shipment not found' });

    shipment.status = status;
    await shipment.save();

    res.status(200).json({ message: 'Shipment status updated', shipment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a shipment
const deleteShipment = async (req, res) => {
  try {
    const { id } = req.params;

    const shipment = await Shipment.findByIdAndDelete(id);
    if (!shipment) return res.status(404).json({ error: 'Shipment not found' });

    res.status(200).json({ message: 'Shipment deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createShipment,
  getShipments,
  getShipment,
  updateShipmentStatus,
  deleteShipment,
};