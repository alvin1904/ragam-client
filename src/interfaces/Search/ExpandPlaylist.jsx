import React from "react";
import { IoClose } from "react-icons/io5";
import { usePlayListContext } from "../../context/PlaylistContext";
import PlayListDetails from "../../components/SearchInterface/PlayListDetails";
import Loading from "../../components/Loader/Loading";

export default function ExpandPlaylist() {
  const { data, setViewPlaylist, setData } = usePlayListContext();
  return (
    <div className="search_component">
      {data && Object.keys(data).length !== 0 ? (
        <PlayListDetails />
      ) : (
        <Loading />
      )}
      <div
        className="close_btn"
        onClick={() => {
          setViewPlaylist("");
          setData({});
        }}
      >
        <IoClose size={35} />
      </div>
    </div>
  );
}
