import React from "react";
import { useSongsContext } from "../../context/songContext";

const SongCard = ({ song, index }) => {
  const { handleNext, currentSongIndex } = useSongsContext();
  const { artist, songName } = song;
  return (
    <div
      className={`song_card ${
        currentSongIndex === index ? "currently_playing" : ""
      }`}
      onClick={() => {
        handleNext(index);
      }}
    >
      <div>
        <h1>{songName}</h1>
        <p>{artist[0].name}</p>
      </div>
      <div>{index}</div>
    </div>
  );
};

export default SongCard;
