import React, { useState } from 'react';

function SearchBar(props) {
  const [searchBarContent, setSearchBarContent] = useState('');

  const handleSearchBarChange = (event) => {
    setSearchBarContent(event.target.value);
  }

  return (
    <div className="search-part">
        <div className="input">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" value={searchBarContent} onChange={handleSearchBarChange} onClick={props.handleSearchChat(searchBarContent)} placeholder="Search new chat   "></input>
        </div>
        <i className="fa-sharp fa-solid fa-bars-filter"></i>
    </div>
  );
}

export default SearchBar;