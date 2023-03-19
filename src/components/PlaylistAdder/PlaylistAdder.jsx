import React, { useEffect, useState } from "react";
import "./PlaylistAdder.css";
import Loading from "../Loader/Loading";
import { addToPlaylist } from "../../apis/playlist";

export default function PlaylistAdder({ show, playlists, song_id }) {
  const handleAdd = async (id) => {
    let temp = {};
    temp.songsId = [song_id];
    const res = await addToPlaylist(id, temp);
    if (res.status == 200) console.log("success ahndle");
    else console.log(res);
  };

  if (show)
    return (
      <div className="playlist_adder">
        {playlists ? (
          <ul>
            {playlists.map((playlist) => {
              return (
                <li
                  key={playlist._id}
                  onClick={() => {
                    handleAdd(playlist._id);
                  }}
                >
                  {playlist.name}
                </li>
              );
            })}
          </ul>
        ) : (
          <Loading />
        )}
      </div>
    );
  else return null;
}
