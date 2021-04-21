import React from "react";
import PropTypes from "prop-types";
import "../static/css/ProgressBar.scss";

function ProgressBar({ color, backgroundSize }) {
  return (
    <span className={`ProgressBar${color ? ` ProgressBar--${color}` : ""}`} style={{ backgroundSize: backgroundSize }}></span>
  );
}

ProgressBar.propTypes = {
  color: PropTypes.string,
  backgroundSize: PropTypes.string.isRequired,
}

export default ProgressBar;
