const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatSchema = new mongoose.Schema({
    id: {
      type: Number,
      required: true
    },
    user: {
        username: {
            type: String,
            required: true
        },
        displayName: {
            type: String,
            required: true
        },
        profilePic: {
            type: String,
            required: true
        }
    },
    lastMessage: {
        id: {
            type: Number,
            default: null
        },
        created: {
            type: Date,
            default: null
        },
        content: {
            type: String,
            default: null
        }
    },
    messages: {
      type: Array,
      default: []
    }
  });

const UserDetails = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: null
    },
    chats: {
        type: [chatSchema],
        default: []
    }
});


//const MessageDetails = new Schema({
//    id: {
//        type: int,
//        required: true
//    },
//    created: {
//        type: Date,
//        required: true
//    },
//    sender: {
//        username: {
//            type: String,
//            required: true
//        }
//    },
//    content: {
//        type: String,
//        default: null
//    }
//});

module.exports = mongoose.model('Users', UserDetails);