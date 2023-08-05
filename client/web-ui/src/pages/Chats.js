import React, { useState, useEffect } from "react";
import MainContainer from "../components/ChatScreenComponents/MainContainer";
import "../design/chat.css"

const Chats = (props) => {
  return (
    <div className="chat-body">
      <MainContainer socket={props.socket} username={props.username} />
    </div>
  );
};

export default Chats;