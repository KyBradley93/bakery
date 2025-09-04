const express = require('express');
const router = express.Router();
const ThreadController = require('../controllers/threadController');

router.get('/', ThreadController.getThreads);
router.get('/thread-comments', ThreadController.getThreadComments);
router.post('/thread', ThreadController.addThread);
router.post('/thread-comment', ThreadController.postThreadComment)


module.exports = router;