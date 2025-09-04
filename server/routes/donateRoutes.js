const express = require('express');
const router = express.Router();
const DonateController = require('../controllers/donateController');

router.post('/sponsor-request', DonateController.sponsorRequest);
router.post('/volunteer-request', DonateController.volunteerRequest);
router.get('/sposors', DonateController.getSponsors);
router.get('/volunteers', DonateController.getVolunteers);

module.exports = router;