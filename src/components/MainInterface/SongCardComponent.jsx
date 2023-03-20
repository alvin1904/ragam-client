//for playlist expand
import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineDelete } from "react-icons/ai";

const SongCardComponent = ({ song }) => {
  const [liked, setLiked] = useState(song.liked || false);
  return (
    <div className="song_card_template gradient_0">
      <div>
        <h1>{song.songName}</h1>
        {song.artist && <p>{song.artist[0].name}</p>}
      </div>
      <div className="songcard_template_like_plus">
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
            u
          />
        )}
        <AiOutlineDelete size={25} />
      </div>
    </div>
  );
};

export default SongCardComponent;
