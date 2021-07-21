import React from "react";
import PropTypes from "prop-types";
import "../static/css/ProgressBar.scss";

function ProgressBar({ color, backgroundSize }) {
  return (
    <div className="ProgressBar__wrapper">
      <span className={`ProgressBar${color ? ` ProgressBar--${color}` : ""}`} style={{ backgroundSize: backgroundSize }}></span>
    </div>
  );
}

ProgressBar.propTypes = {
  color: PropTypes.string,
  backgroundSize: PropTypes.string.isRequired,
}

export default ProgressBar;
