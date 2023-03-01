import "./Controller.css";
import Controls from "./Controls";
import { useState, useRef, useEffect } from "react";
import songlink from "../../assets/koode.mp3";

const Controller = () => {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState({ playing: 0, duration: 0 });
  const [looping, setLooping] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const link =
    "https://i.scdn.co/image/ab67616d0000b2734b7ec1826a0aff0a0954bcab"; //photolink

  let link2 =
    "https://storage.googleapis.com/hybrid-heaven-363612.appspot.com/audio/uploads/songFile-1677584593836?GoogleAccessId=firebase-adminsdk-3aeuh%40hybrid-heaven-363612.iam.gserviceaccount.com&Expires=16730303400&Signature=TIxn%2BBoaf6NQ%2Fw7VfIrKIMo%2BOTwQFQmuoUg5jg3yW8C6ZCl4KUdisldLNnuZKsdje%2BMBgE6LawpKlkCGPUZAgL8oZ9a0IotBOv5JiWB%2BfJorwmM%2BVqrUVL2ZB2WUEdR%2FRICu8b5TWNi30HvbkFSF38Aymc2PavExnlbFPe%2FTrNlq3k5S2YQxtwKm2vSYXTHwhCZQuMseHCHk1xLHr6aDQTpNmUwKnuz2iQvpXTI4n77mKwQfu%2BVQq4RCwZu1yDYkruQe2OFnIIKWP3GG7XLp2xPBTHqkO9Jb8WtvCd0NDTFYs2VLsVmJb2plBf1pMzKLImDYB9zKFgKnAat0ggSX4w%3D%3D";

  const [song, setSong] = useState(
    // "https://drive.google.com/uc?id=1QuB7d8kWkrhPXr985Fk0jauZVpFYXp18&export=download"
    // "https://drive.google.com/uc?id=1l6pIxppZyuHAIvBap38g41181EGla-2N&export=download"
    // "https://www.dropbox.com/s/43v06k35rbeon9u/3.mp3?raw=1"
    // songlink
    link2
  );

  const audioRef = useRef();

  useEffect(() => {
    if (playing) audioRef.current.play();
    else audioRef.current.pause();
  }, [playing]);

  const handleTimeUpdate = () => {
    setTime({
      playing: audioRef.current.currentTime,
      duration: audioRef.current.duration,
    });
  };
  const handleSeek = (e) => {
    setTime({
      playing: e.target.value,
    });
    audioRef.current.currentTime = e.target.value;
    audioRef.current.play();
    setPlaying(true);
  };

  const handlePrev = () => {
    setTime({
      playing: 0,
    });
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
        max={time.duration}
        className="audio_slider"
        value={time.playing}
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
          {formatTime(time.playing)} / {formatTime(time.duration)}
        </div>
      </div>
    </div>
  );
};

export default Controller;
