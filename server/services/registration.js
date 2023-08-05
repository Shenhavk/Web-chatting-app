const UserDetails = require('../models/registration');
const jwt = require("jsonwebtoken")
const key = 'my-secret-key';

const createUser = async (username, password, displayName, profilePic) => {
    const user = new UserDetails({ username: username, password: password, displayName: displayName, profilePic: profilePic });
    return await user.save();
};

const createChat = async (username, token) => {
    const temp = token.split(" ")[1];
    try {
        const decoded = jwt.verify(temp, key);
        try {
            const newUserData =  await UserDetails.findOne({ username: username });
            if (!newUserData || (newUserData.token !== null && temp === newUserData.token)) {
                return 'No such user'
            } else {
                const myData = await UserDetails.findOne({ token: temp });
                const myNewChat = { id: myData.chats.length + 1, user: { username: newUserData.username, displayName: newUserData.displayName, profilePic: newUserData.profilePic },
                                    lastMessage: { id: null, created: null, content: null }, messages: [] };
                const newUsersNewChat = { id: newUserData.chats.length + 1, user: { username: myData.username, displayName: myData.displayName, profilePic: myData.profilePic },
                                    lastMessage: { id: null, created: null, content: null }, messages: [] };
                const chat = { id: myData.chats.length + 1, user: { username: newUserData.username, displayName: newUserData.displayName, profilePic: newUserData.profilePic } };
                myData.chats.push(myNewChat);
                await myData.save();
                newUserData.chats.push(newUsersNewChat);
                await newUserData.save();
                return chat;
            }
        } catch {
            return 'No such user'
        }
    } catch (error) {
        return 'No such user'
    }
};

const getUser = async (username, token) => {
    const temp = token.split(" ")[1];
    try {
        const decoded = jwt.verify(temp, key);
        try {
            const usersData =  await UserDetails.findOne({ username: username });
            if (!usersData) {
                return 'No such user'
            } else {
                return usersData;
            }
        } catch {
            return 'No such user'
        }
    } catch (error) {
        return 'No such user'
    }
};

const getUserByToken = async (token) => {
    const temp = token.split(" ")[1];
    try {
        const decoded = jwt.verify(temp, key);
        try {
            const usersData =  await UserDetails.findOne({ token: temp });
            if (!usersData) {
                return 'No such user'
            } else {
                return usersData;
            }
        } catch {
            return 'No such user'
        }
    } catch (error) {
        return 'No such user'
    }
};

const generateToken = async (username, password) => {
    try {
        const usersData =  await UserDetails.findOne({ username: username, password: password });
        if (!usersData) {
            return 'Invalid username and/or password'
        } else {
            const data = { username: username }
            const token = jwt.sign(data, key);
            usersData.token = token;
            await usersData.save();
            return token;
        }
    } catch {
        return 'Invalid username and/or password'
    }
};

const getMessagesById = async (chatsId, token) => {
    const userData = await getUserByToken(token);
    const chats = userData.chats;
    let messages;
    chats.forEach((chat) => {
        if (chat.id === Number(chatsId)) {
          // Found the chat with the desired id
          messages = chat.messages;
        }
    });
    return messages;
}

const addMessage = async (chatsId, token, message) => {
    const temp = token.split(" ")[1];
    const userData =  await UserDetails.findOne({ token: temp });
    let name;
    let n;
    let b;
    const ma = userData.chats;
    ma.forEach((chat) => {
        if (chat.id === Number(chatsId)) {  
          // Found the chat with the desired id
          n = chat.messages;
          b = chat;
          name = chat.user.username;
        }
    })
    const othersData = await UserDetails.findOne({ username: name });
    const othersChats = othersData.chats;
    const currentTime = new Date();
    b.lastMessage = { id: n.length + 1, created: currentTime, content: message };
    const messageToPushMe = { id: n.length + 1, created: currentTime, sender: { username: userData.username }, content: message };
   // console.log(n + "1");
    n.unshift(messageToPushMe);
    await userData.save();
    othersChats.forEach((chat) => {
        if (chat.user.username === userData.username) {
          // Found the chat with my username
          n = chat.messages;
          b = chat;
        }
    });
    b.lastMessage = { id: n.length + 1, created: currentTime, content: message };
    const messageToPushOther = { id: n.length + 1, created: currentTime, sender: { username: userData.username }, content: message };
    n.unshift(messageToPushOther);  
    await othersData.save();
    return messageToPushMe;
}

const removeChatId = async (chatsId, token) => {
    const temp = token.split(" ")[1];
    const userData =  await UserDetails.findOne({ token: temp });
    const chats = userData.chats;
    //Use array filter method to remove the chat with the specified chatId
    const filteredChats = chats.filter((chat) => chat.id !== Number(chatsId));
    filteredChats.forEach((chat) => {
        if (chat.id > Number(chatsId)) {  
          // Found the chat with the desired id
          chat.id--;
        }
    });

    userData.chats = filteredChats;
    // Save the updated user document
    await userData.save();
}

module.exports = { createUser, generateToken, getUser, getUserByToken, createChat, getMessagesById, addMessage , removeChatId}