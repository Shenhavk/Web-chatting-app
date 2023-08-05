import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function LeftHeader(props) {
  const navigate = useNavigate();

  const serverAdress = 'http://localhost:5000/'
  const handleAddChat = props.handleAddChat;
  const buttonRef = useRef(null);

  const [newChatName, setNewChatName] = useState('');

  const handleLogOut = (event) => {
    event.preventDefault();
    navigate('/');
  }

  const handleNewChatNameChange = (event) => {
    setNewChatName(event.target.value);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      buttonRef.current.click();
    }
  };

  const checkNewUser = () => {
    return !props.chats.some((chat) => chat.user.username === newChatName);
  };

  const handleModalSubmit = async (event) => {
    event.preventDefault();
    if (checkNewUser()) {
      const name = {
        username: newChatName
      };

      setNewChatName("")
      try {
        const response = await fetch(`${serverAdress}api/Chats`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + sessionStorage.getItem('token')
          },
          body: JSON.stringify(name)
        });

        if (response.ok) {
          const responseData = await response.json();
          handleAddChat(responseData);
        } else {
          alert("Failed to add new chat!");
        }

      } catch (error) {
        alert("Failed to add new chat!");
      }
    }
    else {
      setNewChatName("")
      alert("Failed to add new chat!");
    }
  };

  return (
    <>
      <div className="header">
        <form onSubmit={handleLogOut}>
          <input type="submit" value="Logout"></input>
        </form>
        <div className="icons">
          <button type="button" id="user" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <i className="fa-solid fa-user"></i>
          </button>
          <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header modal-body">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">New Chat</h1>
                  <button type="button" className="btn-close btn-primary" data-bs-dismiss="modal" aria-label="Close" data-bs-toggle="tooltip" title="Tooltip"></button>
                </div>
                <div className="modal-body">
                  <input type="text" value={newChatName} onChange={handleNewChatNameChange} onKeyDown={handleKeyDown} id="userName" placeholder="Enter username"/>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleModalSubmit} ref={buttonRef}>Add Chat</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeftHeader;