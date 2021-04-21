import React from "react";
import "../static/css/Tag.scss";

/**
 *  Prints bar with background color and text on it.
 * @param title - any string to print in the bar;
 * @param color - color strings defining the class of <span/>, options: "purple", "yellow", "amaranthine";
 * @returns {JSX.Element}
 * @constructor
 */
function Tag({ title, color }) {
  return (
    <span className={`Tag Tag--${color}`}>
        { title }
    </span>
  )
}

export default Tag;
