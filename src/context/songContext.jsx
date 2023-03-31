import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { getAlbums, getSongs } from "../apis/songs";

const SongContext = React.createContext();

const SongProvider = ({ children }) => {
  const [fetch, setFetch] = useState(false);
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [err, setErr] = useState("");
  const audioRef = useRef(null);

  // FETCH SONGS
  const fetchData = useCallback(async () => {
    setCurrentSongIndex(0);
    const res = await getSongs(5);
    if (res.status === 200) {
      setSongs(res.data);
      setFetch(false);
      if (audioRef.current) {
        audioRef.current.src = res.data[0].songFile;
        handlePrev(); //to bring back seek to 0
      }
      setIsPlaying(true); // auto play plays it and the icon needs to change
    } else
      setErr(
        (res.response && res.response.data.error) ||
          res.message ||
          "Something went wrong!"
      );
  }, []);
  useEffect(() => {
    if (fetch) fetchData();
  }, [fetch]);
  useEffect(() => {
    if (songs.length == 0 || currentSongIndex >= songs.length - 1)
      setFetch(true);
  }, []);

  const [fetch2, setFetch2] = useState(false);
  const [albums, setAlbums] = useState([]);
  // FETCH SONGS
  const fetchAlbums = useCallback(async () => {
    const res = await getAlbums(6);
    if (res.status === 200) {
      setAlbums(res.data);
      setFetch2(false);
    }
  }, []);
  useEffect(() => {
    if (fetch2) fetchAlbums();
  }, [fetch2]);
  useEffect(() => {
    setFetch2(true);
  }, []);

  // PLAY / PAUSE
  useEffect(() => {
    if (isPlaying && audioRef.current.paused) audioRef.current.play();
    else if (!isPlaying && songs.length > 0 && !audioRef.current.paused)
      audioRef.current.pause();
  }, [isPlaying]);

  // PREV AND NEXT FUNCTIONS
  const handlePrev = () => {
    audioRef.current.currentTime = 0;
    audioRef.current?.play();
    setIsPlaying(true);
  };

  const handleNext = (index) => {
    if (!audioRef.current.paused) audioRef.current.pause();
    if (typeof index !== "number" || index === undefined) {
      if (currentSongIndex === songs.length - 1) {
        setSongs([]);
        setFetch(true);
        return;
      } else {
        index = currentSongIndex + 1;
      }
    }

    if (index >= 0 && index <= songs.length - 1) {
      audioRef.current.src = songs[index].songFile;
      setCurrentSongIndex(index);
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      setSongs([]);
      setFetch(true);
    }
  };

  const playTheList = (songs) => {
    try {
      setSongs(songs);
      setFetch(false);
      if (audioRef.current) {
        audioRef.current.src = songs[0].songFile;
        handlePrev(); //to bring back seek to 0
      }
      setCurrentSongIndex(0);
      setIsPlaying(true);
    } catch (err) {
      setErr("Something went wrong...");
    }
  };

  return (
    <SongContext.Provider
      value={{
        songs,
        currentSongIndex,
        audioRef,
        isPlaying,
        setIsPlaying,
        handlePrev,
        handleNext,
        err,
        playTheList,
        albums,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const useSongsContext = () => useContext(SongContext);

export { SongProvider };
