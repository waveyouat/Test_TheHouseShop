import React from "react";

function selection(props) {
  return <li onClick={props.isComing}>{props.name}</li>;
}

export default selection;
