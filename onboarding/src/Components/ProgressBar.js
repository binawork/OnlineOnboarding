import React from "react";
import "../static/css/tag.css";

function ProgressBar({ color, backgroundSize }) {
  return (
    <span className={`tag tag--${color}`} style={{ backgroundSize: backgroundSize }}></span>
  );
}

export default ProgressBar;
