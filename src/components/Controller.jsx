import "./Controller.css";
import {
  IoPlayCircle,
  IoPauseCircle,
  IoPlaySkipBackCircleSharp,
  IoPlaySkipForwardCircleSharp,
  IoShuffle,
  IoRepeat,
} from "react-icons/io5";
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
        <div className="audio_tools">
          <button className="audio_btn shuffle">
            <IoShuffle size={28} />
          </button>
          <button className="audio_btn prev" onClick={handlePrev}>
            <IoPlaySkipBackCircleSharp size={35} />
          </button>

          <button
            className={`audio_btn ${playing ? "play" : "pause"}`}
            accessKey="Space"
            onClick={() => {
              setPlaying(!playing);
            }}
            onKeyDown={(e) => {
              if (e.key == "Space") setPlaying(!playing);
            }}
          >
            {playing ? <IoPauseCircle size={35} /> : <IoPlayCircle size={35} />}
          </button>

          <button className="audio_btn next">
            <IoPlaySkipForwardCircleSharp size={35} />
          </button>
          <button className="audio_btn loop">
            <IoRepeat size={28} />
          </button>
        </div>
        <div className="audio_right">sdgfdefgdf</div>
      </div>
    </div>
  );
};

export default Controller;
