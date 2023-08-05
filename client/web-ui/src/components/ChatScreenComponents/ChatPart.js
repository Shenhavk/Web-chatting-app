import React, { useRef, useEffect } from 'react';

function ChatPart(props) {
  const messagesEndRef = useRef(null);
  const chat = props.selectedChat;
  const messages = props.messages;
  const reversed = [...messages].reverse();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
      <div className="chat-part">
        {reversed.map((message) => (
            <div
            className={`message-box ${message.sender.username !== chat.user.username ? "my-" : "friend-"}message`}
            >
                <p>{message.content}<br/><span>{message.created}</span></p>
            </div>
          ))}
      <div ref={messagesEndRef} />
      </div>
  );
}

export default ChatPart;