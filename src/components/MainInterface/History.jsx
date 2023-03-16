import React from "react";
import { useSongsContext } from "../../context/songContext";
import SongCard from "./SongCard";

const History = () => {
  const { songs } = useSongsContext();
  console.log(songs);
  return (
    <div className="main_section">
      <h1 className="main_section_heading">Up next...</h1>
      {songs && (
        <div className="main_songs_list">
          {songs.map((song, index) => {
            return <SongCard key={song._id} song={song} index={index}/>;
          })}
        </div>
      )}
    </div>
  );
};

export default History;
