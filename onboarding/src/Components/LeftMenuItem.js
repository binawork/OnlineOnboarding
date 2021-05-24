import React from "react";
import { NavLink } from "react-router-dom";

function LeftMenuItem({ itemClassName, path, title, setToggleAside, sublist }) {
  return (
    <li className={ itemClassName || "LeftMenu__item menu-item" }>
      <NavLink
        exact
        to={ path }
        className="LeftMenu__link"
        // style={{ whiteSpace: "normal"}}
        activeClassName="LeftMenu__link--active"
        onClick={() => setToggleAside(false)}
      >
        <span className="menu-text">{ title }</span>
      </NavLink>
      { sublist && sublist }
    </li>
  );
}

export default LeftMenuItem;
