import React, { useEffect, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import getRandomNumber from "../../utils/randomNumber";
import "./SearchComponents.css";
import SongCardComponent from "../MainInterface/SongCardComponent";
import { useSongsContext } from "../../context/songContext";

export default function PlayListDetails({ data }) {
  const [details, setDetails] = useState(data);
  const gradient = getRandomNumber(1, 7);
  const { playTheList } = useSongsContext();

  const handlePlay = () => {
    details.songs && playTheList(details.songs);
  };

  return (
    <>
      <div className={`playlist_title gradient_${gradient}`}>
        <div>
          <h1>{details.name ? details.name : ""}</h1>
          <button onClick={handlePlay}>
            <AiFillPlayCircle size={55} />
          </button>
        </div>
      </div>
      <div className="playlist_songs_list">
        {details.name &&
          details.songs.map((song) => {
            return <SongCardComponent key={song._id} song={song} />;
          })}
      </div>
    </>
  );
}
