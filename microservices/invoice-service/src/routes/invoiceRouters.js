const express = require('express');
const router = express.Router();
const { getInvoice, getAllInvoices } = require('../controllers/invoiceController');

router.get('/:id', getInvoice);
router.get('/', getAllInvoices);

module.exports = router;