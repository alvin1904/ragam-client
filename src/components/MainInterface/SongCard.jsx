import React, { useState } from "react";
import { useSongsContext } from "../../context/songContext";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const SongCard = ({ song, index }) => {
  const { handleNextCustom, currentSongIndex } = useSongsContext();
  const [liked, setLiked] = useState(false);
  const { artist, songName } = song;
  return (
    <div
      className={`song_card ${
        currentSongIndex === index ? "currently_playing" : ""
      }`}
    >
      <div
        onClick={() => {
          handleNextCustom(index);
        }}
      >
        <h1>{songName}</h1>
        <p>{artist[0].name}</p>
      </div>
      <div>
        {liked ? (
          <AiFillHeart
            size={25}
            onClick={() => {
              setLiked(false);
            }}
          />
        ) : (
          <AiOutlineHeart
            size={25}
            onClick={() => {
              setLiked(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SongCard;
