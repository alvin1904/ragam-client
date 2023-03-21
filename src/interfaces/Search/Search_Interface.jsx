import React, { useEffect, useState } from "react";
import { usePlayListContext } from "../../context/PlaylistContext";
import SearchInf from "./SearchInf";
import ExpandPlaylist from "./ExpandPlaylist";
import "./Search.css";

export default function Search_Interface({ changeInterface }) {
  const { viewPlayList, setViewPlaylist, setData } = usePlayListContext();
  const [search, setSearch] = useState(true);
  useEffect(() => {
    const decide = () => {
      if (viewPlayList) {
        setSearch(false);
      } else {
        setSearch(true);
      }
    };

    decide();

    // return () => {
    //   setSearch(true);
    //   setData({});
    // };
  }, [viewPlayList]);
  return (
    <div className="interface_inside">
      {search ? <SearchInf /> : <ExpandPlaylist />}
    </div>
  );
}
