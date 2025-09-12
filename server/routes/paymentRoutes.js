const express = require('express');
const router = express.Router();
const { handlePayment } = require('../controllers/paymentController');
const authenticateCustomer = require('../middleware/auth');

router.post('/', authenticateCustomer, handlePayment);

module.exports = router;
