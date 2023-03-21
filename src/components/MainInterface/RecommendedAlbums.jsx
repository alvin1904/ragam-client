import React, { useEffect, useState } from "react";
import AlbumCard from "./AlbumCard";
import getRandomNumber from "../../utils/randomNumber";
import { useSongsContext } from "../../context/songContext";

const RecommendedAlbums = () => {
  const { albums } = useSongsContext();

  return (
    <div className="main_section">
      <h1 className="main_section_heading">Albums curated for your taste...</h1>
      <div className="main_albums_list">
        {albums &&
          albums.length > 0 &&
          albums.map((album, index) => {
            return <AlbumCard key={index} gradient={getRandomNumber(1, 7)} album={album} />;
          })}
      </div>
    </div>
  );
};

export default RecommendedAlbums;
