import React, { useEffect, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import getRandomNumber from "../../utils/randomNumber";
import "./SearchComponents.css";
import SongCardComponent from "../MainInterface/SongCardComponent";
import { useSongsContext } from "../../context/songContext";
import { DislikeSong } from "../../apis/like";
import { removeFromPlaylist } from "../../apis/playlist";
import { usePlayListContext } from "../../context/PlaylistContext";

export default function PlayListDetails() {
  const { data } = usePlayListContext();
  const [details, setDetails] = useState(data);
  const gradient = getRandomNumber(1, 7);
  const { playTheList } = useSongsContext();

  const handlePlay = () => {
    details.songs && details.songs.length > 0 && playTheList(details.songs);
  };
  const handleDelete = async (id) => {
    let res;
    if (details.name == "Liked Songs") res = await DislikeSong(id);
    else res = await removeFromPlaylist(details._id, { songsId: [`${id}`] });
    if (res.status == 200) {
      let temp = [...details.songs];
      temp = temp.filter((song) => song._id !== id);
      console.log(temp);
      setDetails({ songs: [...temp], ...details });
    } else console.log("error handle");
    console.log(details);
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
            return (
              <SongCardComponent
                key={song._id}
                song={song}
                showdelete={true}
                handleDelete={handleDelete}
              />
            );
          })}
      </div>
    </>
  );
}
