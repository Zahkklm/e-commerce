const express = require('express');
const { createInvoice } = require('../controllers/invoiceController');

const router = express.Router();

router.post('/invoices', createInvoice);

module.exports = router;