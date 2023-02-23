import "./Controller.css";
import {
  IoPlayCircle,
  IoPauseCircle,
  IoPlaySkipBackCircleSharp,
  IoPlaySkipForwardCircleSharp,
  IoShuffle,
  IoRepeat
} from "react-icons/io5";
import { useState } from "react";

const Controller = () => {
  const [playing, setPlaying] = useState(false);
  const link =
    "https://images.unsplash.com/photo-1677141216267-fab8433a646d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80";
  return (
    <div className="audio_controller">
      <input type="range" className="audio_slider" />
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
            <IoShuffle size={35} />
          </button>
          <button className="audio_btn prev">
            <IoPlaySkipBackCircleSharp size={35} />
          </button>

          <button
            className={`audio_btn ${playing ? "play" : "pause"}`}
            onClick={() => {
              setPlaying(!playing);
            }}
          >
            {playing ? <IoPauseCircle size={35} /> : <IoPlayCircle size={35} />}
          </button>

          <button className="audio_btn next">
            <IoPlaySkipForwardCircleSharp size={35} />
          </button>
          <button className="audio_btn loop">
            <IoRepeat size={35} />
          </button>
        </div>
        <div className="audio_right">sdgfdefgdf</div>
      </div>
    </div>
  );
};

export default Controller;
