import React, { useState } from "react";
import { DislikeSong, LikeSong } from "../../../apis/like";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function LikeButton({ liked, songId }) {
  const [like, setLike] = useState(liked);
  const sendReq = async () => {
    let res = {};

    if (!like) res = await LikeSong(songId);
    else res = await DislikeSong(songId);

    if (res.status == 200) setLike(!like);
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
