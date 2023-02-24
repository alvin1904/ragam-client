import "./Controller.css";
import Controls from "./Controls";
import { useState, useRef, useEffect } from "react";
import song from "../constants/njnuyarnupogum.mp3";

const Controller = () => {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const link =
    "https://images.unsplash.com/photo-1677141216267-fab8433a646d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80";

  const audioRef = useRef();

  useEffect(() => {
    if (playing) audioRef.current.play();
    else audioRef.current.pause();
  }, [playing]);

  const handleTimeUpdate = () => {
    setTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };
  const handleSeek = (e) => {
    setTime(e.target.value);
    audioRef.current.currentTime = e.target.value;
    audioRef.current.play();
    setPlaying(true);
  };

  const handlePrev = () => {
    setTime(0);
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setPlaying(true);
  };

  const formatTime = (tym) => {
    const min = Math.floor(tym / 60);
    const sec = Math.floor(tym % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="audio_controller">
      <audio autoPlay ref={audioRef} onTimeUpdate={handleTimeUpdate}>
        <source src={song} type="audio/mpeg" />
      </audio>
      <input
        type="range"
        min={0}
        max={duration}
        className="audio_slider"
        value={time}
        onChange={handleSeek}
      />
      <div className="audio_controls">
        <div className="audio_details">
          <div className="song_image">
            <img src={link}></img>
          </div>
          <div className="song_title">
            <h1 className="song_name">Song Name</h1>
            <p className="song_artist">Artist Name</p>
          </div>
        </div>

        <Controls
          setPlaying={setPlaying}
          handlePrev={handlePrev}
          playing={playing}
        />

        <div className="audio_right">
          {formatTime(time)} / {formatTime(duration)}
        </div>
      </div>
    </div>
  );
};

export default Controller;
