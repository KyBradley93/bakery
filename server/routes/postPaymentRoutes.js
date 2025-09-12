const express = require('express');
const router = express.Router();
const { postPayment } = require('../controllers/postPaymentController');

router.post('/webhook', express.raw({ type: 'application/json' }), postPayment);

module.exports = router;
