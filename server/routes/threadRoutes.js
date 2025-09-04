const express = require('express');
const router = express.Router();
const ThreadController = require('../controllers/threadController');

router.get('/', ThreadController.getThreads);
router.get('/:comments', ThreadController.getThreadComments);
router.post('/', ThreadController.addThread);
router.post('/:comment', ThreadController.postThreadComment)


module.exports = router;