import React from 'react';

function ChatList(props) {
    const { chats, currentChatId, searchChat } = props;
    if (searchChat.trim() === "") {
        return (
            <div className="chat-list">
                {chats.map((chat) => (
                    <div
                    key={chat.id}
                    className={`chat-box ${chat.id === currentChatId ? "selected" : ""}`}
                    onClick={() => props.handleSelectChat(chat)}
                    >
                        <div className="img-box">
                            <img className="img-cover" src={chat.user.profilePic} alt=""></img>
                        </div>
                        <div className="chat-details">
                            <div className="text-head">
                                <h4>{chat.user.username}</h4><br/>
                                {chat.lastMessage && chat.lastMessage.created !== null && <p className="time">{chat.lastMessage.created.substring(11, 19)}</p>}
                            </div>
                            <div className="text-message">
                                {chat.lastMessage && chat.lastMessage.content !== null && <p>{chat.lastMessage.content}</p>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>  
        );
    }
    else {
        const filteredChats = chats.filter(
            (chat) => searchChat === chat.user.username
        );
        return (
            <div className="chat-list">
                {filteredChats.map((chat) => (
                    <div
                        key={chat.id}
                        className={`chat-box ${chat.id === currentChatId ? "selected" : ""}`}
                        onClick={() => props.handleSelectChat(chat)}
                        >
                            <div className="img-box">
                                <img className="img-cover" src={chat.user.profilePic} alt=""></img>
                            </div>
                            <div className="chat-details">
                                <div className="text-head">
                                    <h4>{chat.user.username}</h4>
                                    {chat.lastMessage && chat.lastMessage.created !== null && <p className="time">{chat.lastMessage.created.substring(11, 19)}</p>}
                                </div>
                                <div className="text-message">
                                {chat.lastMessage && chat.lastMessage.content !== null && <p>{chat.lastMessage.content}</p>}
                                </div>
                            </div>
                        </div>
                ))}
            </div>
        )
    }
}

export default ChatList;