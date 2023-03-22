import React, { useContext, useEffect, useState } from "react";
import { getPlayListDetails } from "../apis/playlist";
import { getLikedSongs } from "../apis/songs";

const PlayListContext = React.createContext();

const PlayListProvider = ({ children }) => {
  const [viewPlayList, setViewPlaylist] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPlayListDetails(viewPlayList);
      if (res.status == 200) setData({ ...res.data, _id: viewPlayList });
      else console.log("error handle");
    };
    const fetchData2 = async () => {
      const res = await getLikedSongs();
      if (res.status == 200) setData({ name: "Liked Songs", songs: res.data });
      else console.log("error handle");
    };
    if (viewPlayList !== "" && viewPlayList !== "liked") fetchData();
    if (viewPlayList !== "" && viewPlayList === "liked") fetchData2();
  }, [viewPlayList]);

  return (
    <PlayListContext.Provider
      value={{ viewPlayList, setViewPlaylist, data, setData }}
    >
      {children}
    </PlayListContext.Provider>
  );
};

export const usePlayListContext = () => useContext(PlayListContext);

export { PlayListProvider };
