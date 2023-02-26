import "./Controller.css";
import Controls from "./Controls";
import { useState, useRef, useEffect } from "react";
import songlink from "../constants/njnuyarnupogum.mp3";

const Controller = () => {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [looping, setLooping] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [song, setSong] = useState(
    // "https://drive.google.com/file/d/1eFtUVyh-X1lVI6MtQr03u6vuFueDMg9t/view"
    // "https://drive.google.com/uc?id=1QuB7d8kWkrhPXr985Fk0jauZVpFYXp18&export=stream"
    // songlink
    "https://drive.google.com/file/d/1tkvKtt7Z-HO_8YHLkLKGkAvFdY_PfuyH/preview"
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
    if (audioRef.current.duration != NaN)
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
    if (tym == NaN) return "00:00";
    const min = Math.floor(tym / 60);
    const sec = Math.floor(tym % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="audio_controller">
      <audio autoPlay ref={audioRef} onTimeUpdate={handleTimeUpdate}>
        <source
          // src="https://doc-00-98-docs.googleusercontent.com/docs/securesc/dlfeeh7md5q6826l8mhnjtkgnf52s757/abo11b6qp37gekn9b2fbm3skbgcuo76s/1677388950000/11852845253625371789/17166374309800377361/1eFtUVyh-X1lVI6MtQr03u6vuFueDMg9t?e=download&ax=AB85Z1DuWeKzp4NziuAhKj09IFqqGMmSQiZS8ylElXj2jfP8vqObqsVXiSOfB8upl2bv77dO-28lo_s0vNdvObSeGcydL9rzE998EKT71lTjIruZ4HWgo0-Thu0fZmplKUSM6UR51Xj89-_T3olRVu-4uK72Vn-YVJBqN43AJ35s5XKZ18pdNrZgO16son2RD7ZFidh-iVsXbn-kiuXK8k_ndjauOrW7-ZzRonlyFso-S7X3i7mAMl1dFJmAhb8oJo2xkf6oKwzBtkcJQUtLPvL4YefnOFqH7i8j8ZHHrJOQrBufS4JQbYNT9GF3UdMhtVNbXRh-ZSzigt-pUUb0jvwQ_XxECI_HDqLdb99sRl8a4OTvWWuEbv3CNZQFSV1PD3jBgeBj8gq1M1vMvEwJxhvuazHrnnKToEZNJbHLedlU9l8cDCt-HXqyzb5Fknu3B-5uSy-hypKdxQJeZnqV76ovZAZ5WUDMO4hjxCk4biWXbXSbd3xmeFVxH-fY6Q9cYPGmwkIJ_qSvT9NNJnMMZyHJ3TIFkgWo53sOWCT3fAitcd-IqXPfzxNzCFHjGRRUIswUkiDOVE7glWqJcAd6-JP7cWa-yIuVCT_yIj9pD87t7GCuNsa84mjYpzk3D9FgTeibjsNOuJG_YtHzGkX64EUqTM71gZ0T2f9dgAON0byI1n-B9yVcCKN3sUFkEhx8R6-eQSefaPdTctZPSL2hY9BHZnG4MFhRnRWw7X9YQUBnUAteinAH5gtJBR2W--k_Rl0YCtfnWRIaIL7qL7IfN-S-Pc2oCl20bqRyAFZSDldieCAJ20dW3a_CAautG9aF14Z1xauWr2NFo4CGL7hnXEADhoETeJzqpUM15VJpXOkZyyCiWVrMo32J2UhUP9LfMVJiewhUj7FoljMQKuzT0DqLRoEzABEll4cQEdnsjTBdwMpJ7TURhM7FW0J2T1a_LYNuJtvhBtyu&uuid=49cd623d-d345-48d4-a24b-7ef9c288b542&authuser=0"
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
