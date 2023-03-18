import React from "react";
import { useSongsContext } from "../../context/songContext";
import SongCard from "./SongCard";
import {
  useTransition,
  useChain,
  animated,
  useSpringRef,
} from "@react-spring/web";

const History = () => {
  const { songs } = useSongsContext();

  const transRef = useSpringRef();
  const transitions = useTransition(songs, {
    ref: transRef,
    trail: 300 / songs.length,
    from: { scale: 0 },
    enter: { scale: 1 },
    leave: { scale: 0, display: "none" },
  });

  useChain([ transRef], [0, 0.3]);

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
              />
            </animated.div>
          ))}
      </div>
    </div>
  );
};

export default History;
