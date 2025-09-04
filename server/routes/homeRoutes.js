const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/homeController');

router.get('/contest', HomeController.getContestWinner);
router.get('/photos', HomeController.getPhotos);
router.get('/threads', HomeController.getThreads);

module.exports = router;