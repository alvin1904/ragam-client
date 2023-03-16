import React from "react";
import {
  IoPlayCircle,
  IoPauseCircle,
  IoPlaySkipBackCircleSharp,
  IoPlaySkipForwardCircleSharp,
} from "react-icons/io5";
import { useSongsContext } from "../../context/songContext";

const Controls = () => {
  const { isPlaying, setIsPlaying, handlePrev, handleNext } = useSongsContext();
  const controlsize = 38;

  return (
    <div className="audio_tools">
      <button className="audio_btn prev" onClick={handlePrev}>
        <IoPlaySkipBackCircleSharp size={controlsize} />
      </button>
      <button
        onClick={() => {
          setIsPlaying(!isPlaying);
        }}
        className={`audio_btn ${isPlaying ? "play" : "pause"}`}
        accessKey="Space"
      >
        {isPlaying ? (
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
