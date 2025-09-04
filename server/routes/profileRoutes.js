const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/profileController');
const AuthenticateCustomer = require('../middleware/auth')

router.get('/events', AuthenticateCustomer, ProfileController.getEvents);
router.get('/profile-rewards', AuthenticateCustomer, ProfileController.getProfileRewards);
router.get('/profile-events', AuthenticateCustomer, ProfileController.getProfileEvents);
router.get('/profile-points', AuthenticateCustomer, ProfileController.getProfilePoints);
router.put('/use-profile-rewards', AuthenticateCustomer, ProfileController.useReward);
router.post('/contest', AuthenticateCustomer, ProfileController.postContest);
router.post('/rsvp', AuthenticateCustomer, ProfileController.rsvp);
router.post('/add-reward', AuthenticateCustomer, ProfileController.addReward);

module.exports = router;
