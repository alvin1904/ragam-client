import React, { useEffect, useState } from "react";
import "./Profile.css";
import PlaylistCard from "../../components/ProfileInterface/PlaylistCard";
import CreatePlaylistCard from "../../components/ProfileInterface/CreatePlaylistCard";
import ProfileDetails from "../../components/ProfileInterface/ProfileDetails";
import { deletePlaylist, getAllPlaylists } from "../../apis/playlist";
import ErrorHandler from "../../components/ErrorHandler/ErrorHandler";
import { themes, types } from "../../components/ErrorHandler/config";
import { usePlayListContext } from "../../context/PlaylistContext";
import Loading from '../../components/Loader/Loading'

export default function Profile_Interface({ changeInterface }) {
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

  const [playlists, setPlaylists] = useState([]);
  const [fetch, setFetch] = useState(true);
  const { setViewPlaylist } = usePlayListContext(); // for going to search_interface

  const addToPlaylists = (data) => {
    let temp = [...playlists];
    temp.push(data);
    setPlaylists(temp);
  };

  useEffect(() => {
    const fetchPlaylists = async () => {
      let res = await getAllPlaylists();
      if (res && res.status == 200) setPlaylists(res.data);
      else
        showMessage((res.response && res.response.data.error) || res.message);
      setFetch(false);
    };

    if (fetch || playlists.length == 0) fetchPlaylists();
  }, [fetch]);

  const handleDelete = async (id) => {
    let res = await deletePlaylist(id);
    if (res && res.status == 200)
      showMessage("Playlist deleted successfully", themes.light, types.success);
    else showMessage((res.response && res.response.data.error) || res.message);
    setFetch(true);
  };
  
  return (
    <div className="interface_inside">
      <ErrorHandler show={show} {...messageProps} />
      <div className="profile_intf">
        <ProfileDetails />
        <div className="profile_section playlist_section">
          <h1 className="profile_welcome">Playlists created by you</h1>
          <div className="main_songs_list">
            <CreatePlaylistCard addToPlaylists={addToPlaylists} />
            {playlists ? (
              playlists.map((playlist, index) => {
                return (
                  <PlaylistCard
                    key={index}
                    data={playlist}
                    handleDelete={handleDelete}
                    handleOpen={() => {
                      setViewPlaylist(playlist._id);
                      changeInterface("Search_Interface");
                    }}
                  />
                );
              })
            ) : (
              <div>
                <Loading />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
