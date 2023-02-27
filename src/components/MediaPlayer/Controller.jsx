import "./Controller.css";
import Controls from "./Controls";
import { useState, useRef, useEffect } from "react";
import songlink from "../../assets/koode.mp3";

const Controller = () => {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [looping, setLooping] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [song, setSong] = useState(
    // "https://drive.google.com/uc?id=1QuB7d8kWkrhPXr985Fk0jauZVpFYXp18&export=download"
    // "https://drive.google.com/uc?id=1l6pIxppZyuHAIvBap38g41181EGla-2N&export=download"
    // "https://www.dropbox.com/s/43v06k35rbeon9u/3.mp3?raw=1"
    songlink
  );

  const link =
    "https://i.scdn.co/image/ab67616d0000b2734b7ec1826a0aff0a0954bcab"; //photolink

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
        <source
          src={song}
          type="audio/mpeg"
        />
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
            <h1 className="song_name ">Aararo</h1>
            <p className="song_artist hover_effect_1">RAGHU DIXIT</p>
          </div>
        </div>

        <Controls
          playing={playing}
          setPlaying={setPlaying}
          handlePrev={handlePrev}
          shuffle={shuffle}
          looping={looping}
          setShuffle={setShuffle}
          setLooping={setLooping}
        />

        <div
          className="audio_right"
          onClick={() => {
            setSong(false);
          }}
        >
          {formatTime(time)} / {formatTime(duration)}
        </div>
      </div>
    </div>
  );
};

export default Controller;
