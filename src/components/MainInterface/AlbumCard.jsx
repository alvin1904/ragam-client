import React, { useEffect, useState } from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { getAlbum } from "../../apis/songs";
import { useSongsContext } from "../../context/songContext";
import Loading from "../Loader/Loading";

const AlbumCard = ({ gradient, album }) => {
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

  const { playTheList } = useSongsContext();
  const [loading, setLoading] = useState(false);
  const handlePlay = async () => {
    setLoading(true);
    let res = await getAlbum(album._id);
    if (res.status == 200) {
      playTheList(res.data);
      setLoading(false);
    } else {
      showMessage((res.response && res.response.data.error) || res.message);
    }
  };
  return (
    <>
      <div className={`album_card gradient_${gradient}`} onClick={handlePlay}>
        <div className="album_card_details">
          <h1>{album.albumName && album.albumName}</h1>
          <p>{album.artist && album.artist.length>0 && album.artist[0].name}</p>
        </div>
        <div className="play_button">
          {loading ? <Loading /> : <BsFillPlayCircleFill size={40} />}
        </div>
      </div>
    </>
  );
};

export default AlbumCard;
