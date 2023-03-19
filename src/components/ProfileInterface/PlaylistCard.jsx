import React from "react";
import "./Playlist.css";
import { HiTrash } from "react-icons/hi";

export default function PlaylistCard({ data, handleDelete, handleOpen }) {
  return (
    <div className="playlistcard pcard currently_playing">
      <p onClick={handleOpen}>{data.name}</p>
      <HiTrash
        size={25}
        onClick={() => {
          handleDelete(data._id);
        }}
      />
    </div>
  );
}
