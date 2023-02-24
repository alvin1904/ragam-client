import React from 'react'
import {
    IoPlayCircle,
    IoPauseCircle,
    IoPlaySkipBackCircleSharp,
    IoPlaySkipForwardCircleSharp,
    IoShuffle,
    IoRepeat,
  } from "react-icons/io5";

export default function Controls({setPlaying, handlePrev, playing}) {
  return (
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
  )
}
