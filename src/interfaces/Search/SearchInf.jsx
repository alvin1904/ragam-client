import React, { useEffect, useRef, useState } from "react";
import ErrorHandler from "../../components/ErrorHandler/ErrorHandler";
import { SearchData } from "../../apis/like";
import SearchBar from "../../components/SearchInterface/SearchBar/SearchBar";
import SearchResult from "../../components/SearchInterface/SearchBar/SearchResult";

export default function SearchInf() {
  //ERROR HANDLER START
  const [show, setShow] = useState(false);
  const [messageProps, setMessageProps] = useState({});
  const showMessage = (text, theme, type) => {
    setMessageProps({ message: text, themes: theme, types: type });
    setShow(true);
  };
  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [show]);
  //ERROR HANDLER END

  const searchRef = useRef();
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState({});

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchData({});
    setLoading(true);
    if (searchRef.current.value !== "") {
      const res = await SearchData(searchRef.current.value);
      if (res.status == 200) {
        setSearchData(res.data);
      } else if (res.response && res.response.status == 400) {
        showMessage("Search request timed out!");
      } else {
        showMessage((res.response && res.response.data.error) || res.message);
      }
    } else alert("Enter some text to search");
    searchRef.current.value = "";
    setLoading(false);
  };

  return (
    <div className="search_component">
      <ErrorHandler show={show} {...messageProps} />
      <SearchBar handleSearch={handleSearch} searchRef={searchRef} />
      <SearchResult loading={loading} searchData={searchData} />
    </div>
  );
}
