const express = require('express');
var app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

const cors = require('cors');
app.use(cors());

const port = 5000;

// Connect to the MongoDB server
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Shenhavk1:Shenhav77@cluster0.qb0svl4.mongodb.net/My_App_DB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static('public'))

io.on("connection", (socket) => {
    socket.on('new-message', (message) => {
        socket.broadcast.emit("receive-message", message);
    });
});

app.use('/api/Users', require('./routes/registration'));
app.use('/api/Tokens', require('./routes/token'));
app.use('/api/Chats', require('./routes/chats'));

server.listen(port);