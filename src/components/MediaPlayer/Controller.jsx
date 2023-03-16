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

  const { songs, currentSongIndex, audioRef, setIsPlaying, handleNext } =
    useSongsContext();
  const [time, setTime] = useState({ current: 0, duration: 0, loading: false });

  // HANDLE TIME UPDATE
  const handleTimeUpdate = () => {
    if (audioRef.current.currentTime === audioRef.current.duration)
      handleNext();

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
    setIsPlaying(true);
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
      {songs && songs.length > 0 && songs[currentSongIndex] && (
        <>
          <audio ref={audioRef} onTimeUpdate={handleTimeUpdate}>
            <source src={songs[currentSongIndex].songFile} type="audio/mpeg" />
          </audio>
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
              <div className="song_image">
                <img
                  src={songs[currentSongIndex].songImage || songDefImg}
                ></img>
              </div>

              <div className="song_title">
                <h1 className="song_name ">
                  {songs[currentSongIndex].songName}
                </h1>
                <p className="song_artist hover_effect_1">
                  {songs[currentSongIndex].artist[0].name}
                </p>
              </div>
            </div>

            <Controls />

            {time.loading ? (
              <div className="audio_right">loading...</div>
            ) : (
              <div className="audio_right">
                {formatTime(time.current)} /{formatTime(time.duration)}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Controller;
