import React, { useState } from "react";
import Loading from "../../Loader/Loading";
import NotFound from "../../../assets/notfound.gif";
import SongCardComponent from "../../MainInterface/SongCardComponent";
import { BiChevronDown } from "react-icons/bi";
import getRandomNumber from "../../../utils/randomNumber";

export default function SearchResult({ loading, searchData }) {
  if (loading)
    return (
      <div className="search_result">
        <Loading />
      </div>
    );
  else if (Object.keys(searchData).length == 0) {
    return <div className="search_result"></div>;
  } else if (
    searchData.musicByGenre.length == 0 &&
    searchData.musicByLanguage.length == 0 &&
    searchData.musicByName.length == 0 &&
    searchData.albums.length == 0
  )
    return (
      <div className="search_result">
        <div className="search_image_error">
          <img src={NotFound} />
        </div>
      </div>
    );
  else {
    let temp = { ...searchData };

    const MusicLister = ({ filter, name }) => {
      const [expanded, setExpanded] = useState(false);
      let sample = temp[filter];
      if (sample && sample.length > 0)
        return (
          <div
            className={`search_result_sections ${
              expanded ? "expanded" : "notexpanded"
            }`}
          >
            <div
              className={`section_heading`}
              onClick={() => {
                setExpanded(!expanded);
              }}
            >
              <div>Search results by {`${name} (${sample.length})`}</div>
              <div className="icon">
                <BiChevronDown size={35} />
              </div>
            </div>
            <div className="section_list">
              {sample.map((song, index) => {
                return (
                  <SongCardComponent
                    key={index}
                    song={song}
                    showdelete={false}
                  />
                );
              })}
            </div>
          </div>
        );
      else return null;
    };

    return (
      <div className="search_result">
        <MusicLister filter={"musicByName"} name={"song names"} />
        <MusicLister filter={"musicByLanguage"} name={"language"} />
        <MusicLister filter={"musicByGenre"} name={"genre"} />
      </div>
    );
  }
}
