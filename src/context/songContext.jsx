import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { getSongs } from "../apis/songs";

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
        setIsPlaying(true); // auto play plays it and the icon needs to change
      }
    }
  }, []);
  useEffect(() => {
    if (fetch) fetchData();
  }, [fetch]);
  useEffect(() => {
    console.log(songs?.data);
    if (songs.length == 0 || currentSongIndex >= songs.length - 1)
      setFetch(true);
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

  const handleNext = (index = currentSongIndex + 1) => {
    console.log(index)
    console.log(currentSongIndex+1)
    if (!audioRef.current.paused) audioRef.current.pause();
    if (
      currentSongIndex === songs.length - 1 &&
      index !== currentSongIndex + 1
    ) {
      setSongs([]);
      setFetch(true);
    } else {
      audioRef.current.src = songs[index].songFile;
      setCurrentSongIndex(index);
      audioRef.current.play();
      setIsPlaying(true);
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
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const useSongsContext = () => useContext(SongContext);

export { SongProvider };
