import React, { useState, useEffect } from 'react';
import LeftPart from './LeftPart';
import RightPart from './RightPart';


function MainContainer(props) {
    const [selectedChat, setSelectedChat] = useState({});
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const serverAdress = 'http://localhost:5000/';
    const socket = props.socket;
    const username = props.username;

    const handleAddChat = (chat) => {
        setChats((prevChats) => [...prevChats, chat]);
    };

    useEffect(() => {
      (async () => {
        try {
          const response = await fetch(`${serverAdress}api/Chats/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'bearer ' + sessionStorage.getItem('token')
            },
          });
    
          const responseData = await response.json();
          setChats(responseData);
        } catch (error) {
          console.error('Error:', error);
        }
      })();
    }, [messages]);

    useEffect(() => {
      // Event listener for receiving messages
      socket.on("receive-message", async (message) => {
        if (username === message.toSend) {
          try {
            const response = await fetch(`${serverAdress}api/Chats/`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + sessionStorage.getItem('token')
              },
            });
      
            const responseData = await response.json();
            setChats(responseData);
          } catch (error) {
            console.error('Error:', error);
          }

          if (selectedChat) {
            try {
              const response = await fetch(`${serverAdress}api/Chats/${selectedChat.id}/Messages/`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + sessionStorage.getItem('token')
                  },
              });
              try {
                const responseData = await response.json();
                setMessages(responseData);
              }
              catch (error) {
                console.error('Error:', error);
              }
              } catch (error) {
                  console.error('Error:', error);
              }
          }
        }
      });
      }, [socket, messages, chats]);

      const handleSelectChat = async (chat) => {
        try {
        const response = await fetch(`${serverAdress}api/Chats/${chat.id}/Messages/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'bearer ' + sessionStorage.getItem('token')
            },
        });
        const responseData = await response.json();
        setMessages(responseData);
        } catch (error) {
            console.error('Error:', error);
        }
        setSelectedChat(chat);
    };

    const handleSendMessage = (chat, message) => {
        handleSelectChat(chat)
        const messageToServer = { toSend: chat.user.username, sender: username, content: message.msg };
        socket.emit("new-message", messageToServer);
    };

    return (
        <div className="main-container">
            <LeftPart handleSelectChat={handleSelectChat} handleAddChat={handleAddChat} chats={chats} messages={messages} />
            {Object.keys(selectedChat).length !== 0 && <RightPart selectedChat={selectedChat} handleSendMessage={handleSendMessage} messages={messages} />}
        </div>
    );
}

export default MainContainer;