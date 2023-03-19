import React, { useEffect, useRef, useState } from "react";
import "./Playlist.css";
import { GrAdd, GrCheckmark, GrClose } from "react-icons/gr";
import { createPlaylist } from "../../apis/playlist";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import { themes, types } from "../ErrorHandler/config";

export default function CreatePlaylistCard({ addToPlaylists }) {
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

  const [edit, setEdit] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputRef.current.value) {
      let temp = {};
      temp.name = inputRef.current.value;
      const res = await createPlaylist(temp);
      if (res.status == 201) addToPlaylists(res.data);
      else
        showMessage((res.response && res.response.data.error) || res.message);
    } else
      showMessage("Enter a name for new playlist", themes.light, types.warning);
    handleClose();
  };

  const handleClose = () => {
    setEdit(false);
    inputRef.current.value = "";
  };

  return (
    <>
      <ErrorHandler show={show} {...messageProps} />
      <div className="playlistcard create">
        <div
          className={edit ? `cp cpslide` : `cp cpview`}
          onClick={() => {
            setEdit(true);
          }}
        >
          <GrAdd size={25} /> Create a playlist
        </div>

        <div className="ip">
          <form className="ip_container" onSubmit={handleSubmit}>
            <input
              type="text"
              ref={inputRef}
              placeholder="Enter a name for your playlist"
            />
            <button className="createp_button" type="submit">
              <GrCheckmark size={18} />
            </button>
            <GrClose size={18} onClick={handleClose} />
          </form>
        </div>
      </div>
    </>
  );
}
