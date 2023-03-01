import "./Controller.css";
import Controls from "./Controls";
import { useState, useRef, useEffect } from "react";
import songlink from "../../assets/koode.mp3";

const Controller = () => {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState({ current: 0, duration: 0, loading: false });
  const [looping, setLooping] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const link =
    "https://i.scdn.co/image/ab67616d0000b2734b7ec1826a0aff0a0954bcab"; //photolink

  let link1 =
    "https://storage.googleapis.com/hybrid-heaven-363612.appspot.com/audio/uploads/songFile-1677674140462?GoogleAccessId=firebase-adminsdk-3aeuh%40hybrid-heaven-363612.iam.gserviceaccount.com&Expires=16730303400&Signature=mSAufGJr0hu5rWnrSPH7%2FtIgN0m1GlJSTYR8J1pIpwu9EJHD52hitc%2BkBB8qogjZeQ9LlESfpvtQYIVM83grMPDEKuVKt73ldseJlN%2BK8CH10DYlosX80ETwV7c5zoLUIqA806fma1l3B7Al2X6wD2K4CznajQUyXBuaubSumrYAJBmebF3XcFAWuDvzay5CKolcNfHcVydv1SWmswOtonOhTI%2BPFfntXqS53Edr5xcfd%2BbageeIADsxyyQCalI23URRC3VZtMGCk0DeotIv3PgoUiNi5bKMzP%2BEanTLqhp4GkSrKn4b7QuEKs1UBzb%2FFvHEFqFNx5M064uSBQIgkw%3D%3D";
  let link2 =
    "https://storage.googleapis.com/hybrid-heaven-363612.appspot.com/audio/uploads/songFile-1677676364834?GoogleAccessId=firebase-adminsdk-3aeuh%40hybrid-heaven-363612.iam.gserviceaccount.com&Expires=16730303400&Signature=qM44HDoRbdpZ8d7GcK8MPGujGtLQbhlE4MIik6EAE%2B7pPDEsoowZzHM11hERXJQg9h%2BD84Y2937tQDSyQRbYLu8cbPpR09tFT6QTE6EmPI9j0ommbm1%2Fb0hFsQPQfyz03mZ09QxUxh2nT%2BuUkk9bVX6%2BZRq9mcPa915KMiB06YET7ZpgEi46oaiSJdp%2FRpgNn2UlcrnMvr3qIKMvqgQgdEg%2BOvQCQpjInpgDQHnRngpOdMkXt6ZaAkwSLWbK8eHLv8ssq0bZkKnc%2BrsssfO9RhUTj%2BUGZXvt484p8%2B39iCIOAUXhDwiSbRqWeULSzWxHOFD%2BtFWuOioEGfV7jW0bMw%3D%3D";

  const [songs, setSongs] = useState([
    // "https://drive.google.com/uc?id=1QuB7d8kWkrhPXr985Fk0jauZVpFYXp18&export=download",
    // "https://drive.google.com/uc?id=1l6pIxppZyuHAIvBap38g41181EGla-2N&export=download",
    // "https://www.dropbox.com/s/43v06k35rbeon9u/3.mp3?raw=1",
    songlink,
    link1,
    link2,
  ]);
  const [count, setCount] = useState(0);

  const audioRef = useRef();

  useEffect(() => {
    if (playing) audioRef.current.play();
    else audioRef.current.pause();
  }, [playing]); //for play pause button

  useEffect(() => {
    // Add an event listener to the audio element to detect when it finishes playing
    const handleEnded = () => {
      handleNext();
    };

    // Set the event listener on the audio element
    audioRef.current.addEventListener("ended", handleEnded);

    // Return a function to remove the event listener when the component unmounts
    return () => {
      audioRef.current.removeEventListener("ended", handleEnded);
    };
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

  const handlePrev = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setPlaying(true);
  };

  const handleNext = () => {
    if (count >= songs.length - 1) {
      setCount(0);
      audioRef.current.src = songs[0];
    } else {
      audioRef.current.src = songs[count + 1];
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
      <audio autoPlay ref={audioRef} onTimeUpdate={handleTimeUpdate}>
        <source src={songs[count]} type="audio/mpeg" />
      </audio>

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
          handleNext={handleNext}
          shuffle={shuffle}
          looping={looping}
          setShuffle={setShuffle}
          setLooping={setLooping}
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
