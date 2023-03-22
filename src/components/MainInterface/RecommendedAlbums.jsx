import React, { useEffect, useState } from "react";
import AlbumCard from "./AlbumCard";
import getRandomNumber from "../../utils/randomNumber";
import { useSongsContext } from "../../context/songContext";
import {
  useTransition,
  useChain,
  animated,
  useSpringRef,
} from "@react-spring/web";

const RecommendedAlbums = () => {
  const { albums } = useSongsContext();

  const transRef = useSpringRef();
  const transitions = useTransition(albums, {
    ref: transRef,
    trail: 300 / albums.length,
    from: { scale: 0 },
    enter: { scale: 1 },
    leave: { scale: 0, display: "none" },
  });

  useChain([transRef], [0, 0.3]);

  return (
    <div className="main_section">
      <h1 className="main_section_heading">Albums curated for your taste...</h1>
      <div className="main_albums_list">
        {albums &&
          albums.length > 0 &&
          transitions((style, album) => (
            <animated.div
              style={{
                ...style,
              }}
            >
              <AlbumCard
                key={album._id}
                gradient={getRandomNumber(1, 7)}
                album={album}
              />
            </animated.div>
          ))}
      </div>
    </div>
  );
};

export default RecommendedAlbums;
