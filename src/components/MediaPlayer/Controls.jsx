import React from "react";
import {
  IoPlayCircle,
  IoPauseCircle,
  IoPlaySkipBackCircleSharp,
  IoPlaySkipForwardCircleSharp,
} from "react-icons/io5";

const Controls = ({ playing, setPlaying, handlePrev, handleNext }) => {
  const controlsize = 38;

  return (
    <div className="audio_tools">
      <button className="audio_btn prev" onClick={handlePrev}>
        <IoPlaySkipBackCircleSharp size={controlsize} />
      </button>
      <button
        className={`audio_btn ${playing ? "play" : "pause"}`}
        accessKey="Space"
        onClick={() => {
          setPlaying(!playing);
        }}
      >
        {playing ? (
          <IoPauseCircle size={controlsize} />
        ) : (
          <IoPlayCircle size={controlsize} />
        )}
      </button>
      <button className="audio_btn next" onClick={handleNext}>
        <IoPlaySkipForwardCircleSharp size={controlsize} />
      </button>
    </div>
  );
};

export default Controls;
