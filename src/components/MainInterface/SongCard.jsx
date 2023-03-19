import React, { useState } from "react";
import { useSongsContext } from "../../context/songContext";
import { AiFillHeart, AiOutlineHeart, AiOutlinePlus } from "react-icons/ai";
import PlaylistAdder from "../../components/PlaylistAdder/PlaylistAdder";

const SongCard = ({ song, index, playlists }) => {
  const { handleNextCustom, currentSongIndex } = useSongsContext();
  const [liked, setLiked] = useState(false);
  const [show, setShow] = useState(false);
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
      <div className="songcard_like_plus">
        <div
          onMouseEnter={() => {
            setShow(true);
          }}
          onMouseLeave={() => {
            setShow(false);
          }}
        >
          <PlaylistAdder show={show} playlists={playlists} song_id={song._id}/>
          <AiOutlinePlus size={25} />
        </div>
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
