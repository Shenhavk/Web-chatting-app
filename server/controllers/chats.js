const registrationService = require('../services/registration');

const createChat = async (req, res) => {
    const newUser = await registrationService.createChat(req.body.username, req.headers.authorization);
    //console.log(newUser);
    if (newUser === 'No such user') {
        res.status(404).json(newUser);
    }
    else {
        res.status(200).json(newUser);
    }
};

const index = async (req, res) => {
    const user = await registrationService.getUserByToken(req.headers.authorization);
    const chats = user.chats;
    let fixedChats = [];
    let temp;
    chats.forEach((chat) => {
        temp = { id : chat.id, user: chat.user, lastMessage: chat.lastMessage };
        fixedChats.push(temp);
    });
    res.status(200).json(fixedChats);
}

const getChats = async (req, res, next) => {
    const user = await registrationService.getUserByToken(req.headers.authorization);
    if (user === 'No such user') {
        return res.status(404).json(user);
    }
    else {
        return next();
    }
};

const indexMessages = async (req, res) => {
    const messages = await registrationService.getMessagesById(req.params.id, req.headers.authorization);
    res.status(200).json(messages)
};

const getMessages = async (req, res, next) => {
    //const messages = await registrationService.getMessagesById(req.params.id, req.headers.authorization);
    return next();
};

const createMessage = async (req, res) => {
    const message = await registrationService.addMessage(req.params.id, req.headers.authorization, req.body.msg);
    res.status(200).json(message);
};

const indexChatById = async (req, res) => {
    const chatId = Number(req.params.id);
    const user = await registrationService.getUserByToken(req.headers.authorization);
    const chats = user.chats;
    let fixedChat;
    const me = {username: user.username, displayName: user.displayName, profilePic: user.profilePic};
    chats.forEach((chat) => {
        if (chat.id === chatId) {
            fixedChat = { id: chat.id, users: [chat.user,me], messages: chat.messages };
        }
    });
    res.status(200).json(fixedChat);
}

const getChatById = async (req, res, next) => {
    return next();
}
const removeChat = async (req,res) => {
    const resourceId = await registrationService.removeChatId(req.params.id, req.headers.authorization);
    res.status(200).json();
}
module.exports = { getChats, index, createChat, getMessages, indexMessages, createMessage, getChatById, indexChatById, removeChat }