const express = require('express');

const router = express.Router();

let messageController = require('../controllers/MessageController')

router.post('/', messageController.createMessage);
router.get('/', messageController.getAllMessages);
router.get('/:email', messageController.viewMessagesOfUser);

module.exports = router;