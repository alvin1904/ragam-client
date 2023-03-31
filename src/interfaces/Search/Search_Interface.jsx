import React, { useEffect, useState } from "react";
import { usePlayListContext } from "../../context/PlaylistContext";
import SearchInf from "./SearchInf";
import ExpandPlaylist from "./ExpandPlaylist";

export default function Search_Interface({ changeInterface }) {
  const { viewPlayList} = usePlayListContext();
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
  }, [viewPlayList]);
  return (
    <div className="interface_inside">
      {search ? <SearchInf /> : <ExpandPlaylist />}
    </div>
  );
}
