import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar({handleSearch, searchRef}) {
  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <input type="text" ref={searchRef}></input>
      <button type="submit">
        <AiOutlineSearch size={35} />
      </button>
    </form>
  );
}
