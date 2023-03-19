import React, { useEffect, useState } from "react";
import { useSongsContext } from "../../context/songContext";
import SongCard from "./SongCard";
import {
  useTransition,
  useChain,
  animated,
  useSpringRef,
} from "@react-spring/web";
import { getAllPlaylists } from "../../apis/playlist";

const History = () => {
  const [playlists, setPlaylists] = useState([]);
  const [fetch, setFetch] = useState(true);
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

  const { songs } = useSongsContext();

  const transRef = useSpringRef();
  const transitions = useTransition(songs, {
    ref: transRef,
    trail: 300 / songs.length,
    from: { scale: 0 },
    enter: { scale: 1 },
    leave: { scale: 0, display: "none" },
  });

  useChain([transRef], [0, 0.3]);

  return (
    <div className="main_section">
      <h1 className="main_section_heading">Up next...</h1>
      <div className="main_songs_list">
        {songs &&
          transitions((style, song) => (
            <animated.div
              style={{
                ...style,
              }}
            >
              <SongCard
                key={song._id}
                song={song}
                index={songs.indexOf(song)}
                playlists={playlists}
              />
            </animated.div>
          ))}
      </div>
    </div>
  );
};

export default History;
