import React, { useEffect } from "react";
import ModeButton from "../ModeButton";
import { NavLink } from "react-router-dom";
import "../../static/css/LeftMenu.scss";

function LeftMenuEmployee({ showAside, setToggleAside}) {
  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
  }, []);

  const handleWindowResize = () => {
    if(window.innerWidth >= 768) {
      setToggleAside(false);
    }
  }

  return (
    <aside
      className={`LeftMenu app-aside app-aside-expand-md
      app-aside-light ${showAside ? "show" : ""}`}
      style={{zIndex: "9"}}
    >
      <div
        className={`${showAside ? "LeftMenu__pseudo-wrapper" : ""} w-100 h-100`}
        onClick={ () => setToggleAside(false) }
      >
        <div className="LeftMenu__wrapper">
          <div className="LeftMenu__overflow aside-menu overflow-auto">
            <nav id="stacked-menu" className="stacked-menu pt-5">
              <ul className="LeftMenu__list">
                <li className="menu-item has-child">
                  <NavLink
                    exact to="/"
                    className="LeftMenu__link menu-link"
                    activeStyle={{color: "#346CB0"}}
                  >
                    <i className="bi bi-diagram-2 mr-2" style={{ fontSize: "18px"}}></i>
                    <span className="menu-text">Wdrożenia</span>
                  </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink
                    to="/my_profile"
                    className="LeftMenu__link menu-link"
                    activeStyle={{color: "#346CB0"}}
                  >
                    <i className="bi bi-person mr-2" style={{ fontSize: "18px"}}></i>
                    <span className="menu-text">Mój profil</span>
                  </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink
                    to="/q_and_a"
                    className="LeftMenu__link menu-link"
                    activeStyle={{color: "#346CB0"}}
                  >
                    <i className="bi bi-question-circle mr-2" style={{ fontSize: "18px"}}></i>
                    <span className="menu-text">Q&A</span>
                  </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink 
                    to="/company"
                    className="LeftMenu__link menu-link"
                    activeStyle={{color: "#346CB0"}}
                  >
                    <i className="bi bi-building mr-2" style={{ fontSize: "18px"}}></i>
                    <span className="menu-text">O firmie</span>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <ModeButton />
        </div>
      </div>
    </aside>
  );
}
export default LeftMenuEmployee;

