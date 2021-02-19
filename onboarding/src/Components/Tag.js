import React from "react";
import "../static/css/tag.css";

function Tag({ title, color }) {
  return (
    <span className={`tag tag--${color}`}>
        { title }
    </span>
  )
}

export default Tag;
