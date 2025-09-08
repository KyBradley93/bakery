const express = require('express');
const router = express.Router();
const ThreadController = require('../controllers/threadController');
const AuthenticateCustomer = require('../middleware/auth');

router.get('/', AuthenticateCustomer, ThreadController.getThreads);
router.get('/thread-comments', AuthenticateCustomer, ThreadController.getThreadComments);
router.post('/', AuthenticateCustomer, ThreadController.addThread);
router.post('/thread-comment', AuthenticateCustomer, ThreadController.postThreadComment)


module.exports = router;