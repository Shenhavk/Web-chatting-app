======= Web Chatting App =======

This project is written using: HTML, CSS, JAVASCRIPT, REACT, Bootstrap, NodeJS and MongoDB.


--- Getting Started ---

The files of the React application are in the "client/web-ui" folder and the server's home page is the React application.
The git repository does not include the “node_modules” folder, so in order to run our application, you need to follow these stages:

1. Clone into the git repository, using the command: "git clone https://github.com/Shenhavk/Web-chatting-app"
2. Navigate to “server” folder.
3. Run the command “npm install” in command line, which will create the “node_module” folder.
4. Run the application via command line using the command “node app.js”.
5. open your browser and enter the address: http://localhost:5000/


--- About ---

The application contains three screens:

1. Login screen - this is the main screen, where each registered user have to enter his username and password (if already registered), in order to move to the chats screen. There is also link to the registration screen, if you have not registered yet. If the user is already registered, he can login and go to the chat screen at any time even after logging out.

2. Registration screen - this screen is for new users, who would like to register to the site. It asks the user to enter username, password, display name and a picture, and there is one more field for password verification, there is also link to the login screen, if you already have registered.

To register:
- All fields must be filled in.
- The password must be the same as the password verification.
- The password must have at least 8 characters, a number, a lowercase letter and an uppercase letter in English.
Registration information is stored in a user database using mongoDB.

3. Chats screen - When the details entered in the login screen are indeed correct we will go to this screen. in the left part of this screen, there is a list of the user's chats. For each chat displays a picture, his username, the last message that sent in the chat, and the date\hour that this message arrived. In addition, there is a search panel where you can search for a contact by name. To talk with other users, the user must add contacts by clicking the man button that pop-up and add new contact entering the contact's name. if the username entered is not an actual contact or we have already added this contact before, adding the chat will fail. if the name is correct the window will open a conversation with a new contact with the selected name.

In the right part of the screen, the messages that was sent in the chat with the same person, will be displayed. Additionally, there is a panel to write a message. When you press ENTER or the send button, the message with the written text will be sent at the current time to the chat we were in. 
There is also link to log out, which redirect you back to the login screen.

This project uses Socket.IO library, so when two users are logged in and are in the chat with each other, the messages will appear instantly on the receiving side.
