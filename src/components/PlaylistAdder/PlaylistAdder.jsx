import React, { useEffect, useState } from "react";
import "./PlaylistAdder.css";
import Loading from "../Loader/Loading";
import { addToPlaylist } from "../../apis/playlist";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import { themes, types } from "../ErrorHandler/config";

export default function PlaylistAdder({ shows, playlists, song_id }) {
  //ERROR HANDLER START
  const [show, setShow] = useState(false);
  const [messageProps, setMessageProps] = useState({});
  const showMessage = (text, theme, type) => {
    setMessageProps({ message: text, themes: theme, types: type });
    setShow(true);
  };
  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [show]);
  //ERROR HANDLER END

  const handleAdd = async (id) => {
    let temp = {};
    temp.songsId = [song_id];
    const res = await addToPlaylist(id, temp);
    console.log(res);
    if (res.status == 200)
      showMessage(
        "Song successfully added to playlist",
        themes.light,
        types.success
      );
    else
      showMessage(
        (res.response && res.response.data.error) ||
          res.message ||
          "Error Handle"
      );
  };

  if (shows)
    return (
      <>
        <ErrorHandler show={show} {...messageProps} />
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
      </>
    );
  else return null;
}
