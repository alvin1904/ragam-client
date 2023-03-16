import React from "react";
import AlbumCard from "./AlbumCard";
import getRandomNumber from '../../utils/randomNumber'

const RecommendedAlbums = () => {
  return (
    <div className="main_section">
      <h1 className="main_section_heading">Albums curated for your taste...</h1>
      <div className="main_albums_list">
        <AlbumCard gradient={getRandomNumber(1,7)} />
        <AlbumCard gradient={getRandomNumber(1,7)} />
        <AlbumCard gradient={getRandomNumber(1,7)} />

      </div>
    </div>
  );
};

export default RecommendedAlbums;
