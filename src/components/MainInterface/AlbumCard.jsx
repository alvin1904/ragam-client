import React from "react";

const AlbumCard = ({gradient}) => {
  return (
    <div className={`album_card gradient_${gradient}`} >
      <div>
        <h1>Ponniyan Selvan I</h1>
        <p>Artist name</p>
      </div>
    </div>
  );
};

export default AlbumCard;
