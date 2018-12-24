import React, { Component } from "react";

const Liked = props => {
  let classes = "fa fa-heart";
  if (!props.like) classes += "-o";

  return (
    <i
      style={{ cursor: "pointer" }}
      className={classes}
      onClick={props.onLiked}
    />
  );
};

export default Liked;
