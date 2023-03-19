import React, { useContext, useEffect, useState } from "react";
import { getPlayListDetails } from "../apis/playlist";

const PlayListContext = React.createContext();

const PlayListProvider = ({ children }) => {
  const [viewPlayList, setViewPlaylist] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPlayListDetails(viewPlayList);
      if (res.status == 200) setData(res.data);
      else console.log("error handle");
    };
    if (viewPlayList !== "") fetchData();
  }, [viewPlayList]);

  return (
    <PlayListContext.Provider value={{ viewPlayList, setViewPlaylist, data ,setData}}>
      {children}
    </PlayListContext.Provider>
  );
};

export const usePlayListContext = () => useContext(PlayListContext);

export { PlayListProvider };
