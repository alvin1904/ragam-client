import React from "react";
import "./Playlist.css";
import { HiTrash } from "react-icons/hi";
import { deletePlaylist } from "../../apis/playlist";

export default function PlaylistCard({ data, handleDelete }) {
  return (
    <div className="playlistcard pcard currently_playing">
      {data.name}
      <HiTrash
        size={25}
        onClick={() => {
          handleDelete(data._id);
        }}
      />
    </div>
  );
}
