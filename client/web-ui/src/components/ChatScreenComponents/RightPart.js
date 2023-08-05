import React, { useState } from 'react';
import RightHeader from './RightHeader';
import ChatPart from './ChatPart';
import ChatBoxInput from './ChatBoxInput';

function RightPart(props) {
    const chat = props.selectedChat;
    const messages = props.messages;
    const serverAdress = 'http://localhost:5000/'

    const handleAddMessage = async (message) => {
        try {
            const response = await fetch(`${serverAdress}api/Chats/${chat.id}/Messages/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + sessionStorage.getItem('token')
              },
              body: JSON.stringify(message)
            })

            //.then((response) => response.json())
      
            //.then((responseData) => {
            props.handleSendMessage(chat, message);
            //})
      
          } catch (error) {
            alert("Failed to send message!");
          }
    };

    return (
        <div className="right-part">
            <RightHeader selectedChat={chat} />
            <ChatPart selectedChat={chat} messages={messages} />
            <ChatBoxInput handleAddMessage={handleAddMessage} chat={chat} />
        </div>
  );
}

export default RightPart;