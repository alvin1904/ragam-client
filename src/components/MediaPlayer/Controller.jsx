import "./Controller.css";
import Controls from "./Controls";
import { useState, useRef, useEffect } from "react";
import songDefImg from "../../assets/songdefault.webp";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import { useSongsContext } from "../../context/songContext";
import { themes, types } from "../ErrorHandler/config";

const Controller = () => {
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

  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState({ current: 0, duration: 0, loading: false });
  const [songs, setSongs] = useState([]);
  const audioRef = useRef();

  const { currentlyPlaying, count, setCount, getSongs } = useSongsContext();

  useEffect(() => {
    if (currentlyPlaying) setSongs(currentlyPlaying);
    if (currentlyPlaying !== songs) setSongs(currentlyPlaying);
  }, [currentlyPlaying]);

  useEffect(() => {
    try {
      if (time.loading) handlePrev();
      else if (playing) audioRef.current.play();
      else if (!playing && songs.length > 0) audioRef.current.pause();
    } catch (err) {
      showMessage("The song is loading...", themes.light, types.info);
    }
  }, [playing, currentlyPlaying, songs]); //for play pause button

  useEffect(() => {
    try {
      const handleEnded = async () => {
        let response = await getSongs(5);
        console.log(response);
      };
      // Add an event listener to the audio element to detect when it finishes playing
      if (audioRef.current) {
        // Set the event listener on the audio element
        audioRef.current.addEventListener("ended", handleEnded);
        // Return a function to remove the event listener when the component unmounts
        return () => {
          audioRef.current &&
            audioRef.current.removeEventListener("ended", handleEnded);
        };
      }
    } catch (err) {
      showMessage("The song is loading...", themes.light, types.info);
    }
  }, [count]);

  const handleTimeUpdate = () => {
    setTime({
      current: audioRef.current.currentTime,
      duration: audioRef.current.duration,
      loading: false,
    });
  };

  const handleSeek = (e) => {
    setTime({
      ...time,
      current: e.target.value,
    });
    audioRef.current.currentTime = e.target.value;
    audioRef.current.play();
    setPlaying(true);
  };

  const handlePrev = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setPlaying(true);
  };

  const handleNext = () => {
    try {
      if (count >= songs.length - 1) {
        setCount(0);
        audioRef.current.src = songs[0].songFile;
      } else {
        audioRef.current.src = songs[count + 1].songFile;
        setCount(count + 1);
        audioRef.current.play();
        setPlaying(true);
      }
    } catch (err) {
      showMessage("There's been some issue with the player...");
    }
  };

  const formatTime = (tym) => {
    if (isNaN(tym)) {
      setTime({ ...time, duration: 0, loading: true });
    } else {
      const min = Math.floor(tym / 60);
      const sec = Math.floor(tym % 60);
      return `${min}:${sec < 10 ? "0" : ""}${sec}`;
    }
  };

  return (
    <div className="audio_controller">
      <ErrorHandler show={show} {...messageProps} />
      {songs.length > 0 && songs[count] && (
        <audio autoPlay ref={audioRef} onTimeUpdate={handleTimeUpdate}>
          <source src={songs[count].songFile} type="audio/mpeg" />
        </audio>
      )}

      <input
        type="range"
        min={0}
        max={time.duration}
        className="audio_slider"
        value={time.current}
        onChange={handleSeek}
      />
      <div className="audio_controls">
        <div className="audio_details">
          {songs.length > 0 && songs[count] && (
            <>
              <div className="song_image">
                <img src={songs[count].songImage || songDefImg}></img>
              </div>

              <div className="song_title">
                <h1 className="song_name ">{songs[count].songName}</h1>
                <p className="song_artist hover_effect_1">
                  {songs[count].artist[0].name}
                </p>
              </div>
            </>
          )}
        </div>

        <Controls
          playing={playing}
          setPlaying={setPlaying}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />

        {time.loading ? (
          <div className="audio_right">loading...</div>
        ) : (
          <div className="audio_right">
            {formatTime(time.current)} /{formatTime(time.duration)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Controller;
