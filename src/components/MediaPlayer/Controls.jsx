import React from "react";
import {
  IoPlayCircle,
  IoPauseCircle,
  IoPlaySkipBackCircleSharp,
  IoPlaySkipForwardCircleSharp,
  IoShuffle,
  IoRepeat,
} from "react-icons/io5";

const Controls = ({
  playing,
  setPlaying,
  handlePrev,
  handleNext,
  shuffle,
  looping,
  setShuffle,
  setLooping,
}) => {
  const controlsize = 37;

  return (
    <div className="audio_tools">
      <button
        className={`audio_btn shuffle ${shuffle ? "shuffling" : ""}`}
        onClick={() => setShuffle(!shuffle)}
      >
        <IoShuffle size={controlsize - 7} />
      </button>
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
      <button
        className={`audio_btn loop ${looping ? "looping" : ""}`}
        onClick={() => setLooping(!looping)}
      >
        <IoRepeat size={controlsize - 7} />
      </button>
    </div>
  );
};

export default Controls;
