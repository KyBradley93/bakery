const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contactController');

router.get('/', ContactController.getContacts);
router.post('/contact-request', ContactController.contactRequest);

module.exports = router;