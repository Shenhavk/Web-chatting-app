const chatsController = require('../controllers/chats');

const express = require('express');
var router = express.Router();

router.route('/').post(chatsController.createChat);
router.route('/').get(chatsController.getChats, chatsController.index);
router.route('/:id/Messages').post(chatsController.createMessage);
router.route('/:id/Messages').get(chatsController.getMessages, chatsController.indexMessages);
router.route('/:id').get(chatsController.getChatById, chatsController.indexChatById);
router.route('/:id').delete(chatsController.removeChat);

module.exports = router;