import React, { useContext, useEffect, useState } from "react";
import {
  getAlbumApi,
  getAlbumsApi,
  getSongApi,
  getSongsApi,
} from "../apis/index";

const SongContext = React.createContext();

const SongProvider = ({ children }) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState([]);
  const [count, setCount] = useState(0);
  const getSongs = async (count = 5) => {
    try {
      const response = await getSongsApi(count);
      console.log(response);
      if (response.data.length > 0) setCurrentlyPlaying(response.data);
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  const getSong = async (id) => {
    try {
      const response = await getSongApi(id);
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  const getAlbums = async () => {
    try {
      const response = await getAlbumsApi();
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  const getAlbum = async (id) => {
    try {
      const response = await getAlbumApi(id);
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  useEffect(() => {
    if (count == 0 || count == currentlyPlaying.length) getSongs();
  }, [count]);
  return (
    <SongContext.Provider
      value={{
        getSongs,
        getSong,
        getAlbums,
        getAlbum,
        count,
        setCount,
        currentlyPlaying,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const useSongsContext = () => useContext(SongContext);

export { SongProvider };
