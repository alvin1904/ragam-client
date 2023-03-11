import "./Controller.css";
import Controls from "./Controls";
import { useState, useRef, useEffect } from "react";
import songDefImg from "../../assets/songdefault.webp";
// import songlink from "../../assets/koode.mp3";
// import { link1, link2, link3, link4, link5 } from "../../constants/data";
import { useSongsContext } from "../../context/songContext";

const Controller = () => {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState({ current: 0, duration: 0, loading: false });
  const [looping, setLooping] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const [songs, setSongs] = useState([]);

  const { currentlyPlaying,count, setCount } = useSongsContext();
  useEffect(() => {
    currentlyPlaying && setSongs(currentlyPlaying);
  }, [currentlyPlaying]);

  const audioRef = useRef();

  useEffect(() => {
    if (time.loading) console.log("Loading.."); //to prevent conflict error
    else if (playing) audioRef.current.play();
    else if (!playing && songs.length > 0) audioRef.current.pause();
  }, [playing, currentlyPlaying]); //for play pause button

  useEffect(() => {
    try {
      const handleEnded = () => {
        if (!looping) handleNext();
      };
      // Add an event listener to the audio element to detect when it finishes playing
      if (audioRef.current) {
        // Set the event listener on the audio element
        audioRef.current.addEventListener("ended", handleEnded);
        // Return a function to remove the event listener when the component unmounts
        return () => {
          audioRef.current &&
            audioRef.current.removeEventListener("ended", handleEnded);
        };
      }
    } catch (err) {
      console.log(err);
    }
  }, [count]);

  const handleTimeUpdate = () => {
    setTime({
      current: audioRef.current.currentTime,
      duration: audioRef.current.duration,
      loading: false,
    });
  };

  const handleSeek = (e) => {
    setTime({
      ...time,
      current: e.target.value,
    });
    audioRef.current.currentTime = e.target.value;
    audioRef.current.play();
    setPlaying(true);
  };

  const handleLoop = (value) => {
    audioRef.current.loop = value;
  };

  const handlePrev = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setPlaying(true);
  };

  const handleNext = () => {
    if (count >= songs.length - 1) {
      setCount(0);
      audioRef.current.src = songs[0].songFile;
    } else {
      audioRef.current.src = songs[count + 1].songFile;
      setCount(count + 1);
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const formatTime = (tym) => {
    if (isNaN(tym)) {
      setTime({ ...time, duration: 0, loading: true });
    } else {
      const min = Math.floor(tym / 60);
      const sec = Math.floor(tym % 60);
      return `${min}:${sec < 10 ? "0" : ""}${sec}`;
    }
  };

  return (
    <div className="audio_controller">
      {songs.length > 0 && songs[count] && (
        <audio autoPlay ref={audioRef} onTimeUpdate={handleTimeUpdate}>
          <source src={songs[count].songFile} type="audio/mpeg" />
        </audio>
      )}

      <input
        type="range"
        min={0}
        max={time.duration}
        className="audio_slider"
        value={time.current}
        onChange={handleSeek}
      />
      <div className="audio_controls">
        <div className="audio_details">
          {songs.length > 0 &&
            songs[count] &&
            (<>
              <div className="song_image">
                <img src={songs[count].songImage || songDefImg}></img>
              </div>

              <div className="song_title">
                <h1 className="song_name ">{songs[count].songName}</h1>
                <p className="song_artist hover_effect_1">
                  {songs[count].artistId.name}
                </p>
              </div>
            </>)}
        </div>

        <Controls
          playing={playing}
          setPlaying={setPlaying}
          handlePrev={handlePrev}
          handleNext={handleNext}
          shuffle={shuffle}
          looping={looping}
          setShuffle={setShuffle}
          setLooping={setLooping}
          handleLoop={handleLoop}
        />

        {time.loading ? (
          <div className="audio_right">loading...</div>
        ) : (
          <div className="audio_right">
            {formatTime(time.current)} /{formatTime(time.duration)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Controller;
