import React from "react";
import "../static/css/ProgressBar.scss";

function ProgressBar({ color, backgroundSize }) {
  return (
    <span className={`ProgressBar ProgressBar--${color}`} style={{ backgroundSize: backgroundSize }}></span>
  );
}

export default ProgressBar;
