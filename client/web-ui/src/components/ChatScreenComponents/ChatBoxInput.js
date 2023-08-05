import React, { useState, useRef } from 'react';

function ChatBoxInput(props) {
  const [chatBoxContent, setChatBoxContent] = useState('');
  const handleAddMessage = props.handleAddMessage;
  const chat = props.chat;
  const buttonRef = useRef(null);

  const handleChatBoxContentChange = (event) => {
    setChatBoxContent(event.target.value);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      buttonRef.current.click();
    }
  };

  const handleSendClick = (event) => {
    if (chatBoxContent !== "") {
      //const currentTime = new Date().toLocaleTimeString(); // Get current time in string format
      event.preventDefault();
      //const sender = "me";
      //const timeSent = currentTime;
      const content = chatBoxContent;
      const newMessage = {
          msg: content
      };
      setChatBoxContent("");
      handleAddMessage(newMessage);
    }
};

  return (
    <div className="chatbox-input">
      <i className="fa-regular fa-face-grin"></i>
      <i className="fa-sharp fa-solid fa-paperclip"></i>
      <button type="submit" class="btn btn-secondary" onClick={handleSendClick} ref={buttonRef}>Send</button>
      <input type="text" value={chatBoxContent} onChange={handleChatBoxContentChange} onKeyDown={handleKeyDown} placeholder="Type a message"/>
      <i lclassName="fa-solid fa-ellipsis-vertical"></i>
    </div>
  );
}

export default ChatBoxInput;