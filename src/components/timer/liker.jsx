import React, { useEffect, useState } from "react";

const Likings = (props) => {
    const [liked, setLiked] = useState(false);
    function liking() {
        if(liked){
          setLiked(false);
        }else(
          setLiked(true)
        )
      }

      return (
        <>
        <div className="nft__item_like" onClick={liking}>
          {liked ? (
            <>
              <i className="fa fa-heart liked-color"></i>
              <span>{props.items.likes + 1}</span>
            </>
          ) : (
            <>
              <i className="fa fa-heart"></i>
              <span>{props.items.likes}</span>
            </>
          )}
        </div>
        </>
        )
};

export default Likings;