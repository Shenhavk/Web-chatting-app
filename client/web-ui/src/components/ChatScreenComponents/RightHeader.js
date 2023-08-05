import React from 'react';

function RightHeader(props) {
  const chat = props.selectedChat;

  return (
    <div className="header">
        <div className="img-text">
            <div className="user-img">
                <img className="dp" src={chat.user.profilePic} alt=""></img>
            </div>
            <h5>{chat.user.username}</h5>
        </div>
        <div className="icons">
            <li><i className="fa-solid fa-magnifying-glass"></i></li>
        </div>
    </div>
  );
}

export default RightHeader;



// <br/><span>{chat.isConnected == true ? "Connected" : "Not Connected"}</span> right after username