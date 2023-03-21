import React, { useState } from "react";
import { useSongsContext } from "../../context/songContext";
import { AiOutlinePlus } from "react-icons/ai";
import PlaylistAdder from "../../components/PlaylistAdder/PlaylistAdder";
import LikeButton from "./Like/LikeButton";

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
          {playlists && playlists.length !== 0 && (
            <>
              <PlaylistAdder
                shows={shows}
                playlists={playlists}
                song_id={song._id}
              />
              <AiOutlinePlus size={25} />
            </>
          )}
        </div>
        {song._id && <LikeButton liked={song.liked} songId={song._id} />}
      </div>
    </div>
  );
};

export default SongCard;
