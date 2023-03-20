import React, { useState } from "react";
import { useSongsContext } from "../../context/songContext";
import { AiFillHeart, AiOutlineHeart, AiOutlinePlus } from "react-icons/ai";
import PlaylistAdder from "../../components/PlaylistAdder/PlaylistAdder";

const SongCard = ({ song, index, playlists }) => {
  const { handleNext, currentSongIndex } = useSongsContext();
  const [liked, setLiked] = useState(song.liked || false);
  const [shows, setShows] = useState(false);
  return (
    <div
      className={`song_card ${
        currentSongIndex === index ? "currently_playing" : ""
      }`}
    >
      <div
        onClick={() => {
          handleNext(index);
        }}
      >
        <h1>{song.songName}</h1>
        {song.artist && <p>{song.artist[0].name}</p>}
      </div>
      <div className="songcard_like_plus">
        <div
          onMouseEnter={() => {
            setShows(true);
          }}
          onMouseLeave={() => {
            setShows(false);
          }}
        >
          <PlaylistAdder
            shows={shows}
            playlists={playlists}
            song_id={song._id}
          />
          {playlists && <AiOutlinePlus size={25} />}
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
