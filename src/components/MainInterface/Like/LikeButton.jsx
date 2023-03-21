import React, { useEffect, useState } from "react";
import { DislikeSong, LikeSong } from "../../../apis/like";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ErrorHandler from "../../ErrorHandler/ErrorHandler";
import { themes, types } from "../../ErrorHandler/config";

export default function LikeButton({ liked, songId }) {
  const [like, setLike] = useState(liked);
  const sendReq = async () => {
    let res = {};

    if (!like) res = await LikeSong(songId);
    else res = await DislikeSong(songId);

    if (res.status == 200) setLike(!like);
    else console.log(res);
  };
  return (
    <>
      {like ? (
        <AiFillHeart size={25} onClick={sendReq} />
      ) : (
        <AiOutlineHeart size={25} onClick={sendReq} />
      )}
    </>
  );
}
