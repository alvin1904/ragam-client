import React from "react";
import {
  IoPlayCircle,
  IoPauseCircle,
  IoPlaySkipBackCircleSharp,
  IoPlaySkipForwardCircleSharp,
  IoShuffle,
  IoRepeat,
} from "react-icons/io5";

export default function Controls({
  playing,
  setPlaying,
  handlePrev,
  shuffle,
  looping,
  setShuffle,
  setLooping,
}) {
  return (
    <div className="audio_tools">
      <button
        className={`audio_btn shuffle ${shuffle ? "shuffling" : ""}`}
        onClick={() => setShuffle(!shuffle)}
      >
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
      >
        {playing ? <IoPauseCircle size={35} /> : <IoPlayCircle size={35} />}
      </button>

      <button className="audio_btn next">
        <IoPlaySkipForwardCircleSharp size={35} />
      </button>
      <button
        className={`audio_btn loop ${looping ? "looping" : ""}`}
        onClick={() => setLooping(!looping)}
      >
        <IoRepeat size={28} />
      </button>
    </div>
  );
}
