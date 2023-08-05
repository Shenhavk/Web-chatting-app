import React, { useState, useEffect } from 'react';
import LeftHeader from './LeftHeader';
import SearchBar from "./SearchBar";
import ChatList from "./ChatList";

function LeftPart(props) {
    const [searchChat, setSearchChat] = useState('');

    const handleSearchChat = (searchBarContent) => {
        setSearchChat(searchBarContent);
    };

    return (
        <div className="left-part">
            <LeftHeader handleAddChat={props.handleAddChat} chats={props.chats} />
            <SearchBar handleSearchChat={handleSearchChat} chats={props.chats} />
            <ChatList chats={props.chats} handleSelectChat={props.handleSelectChat} searchChat={searchChat} messages={props.messages} />
        </div>
    );
}

export default LeftPart;