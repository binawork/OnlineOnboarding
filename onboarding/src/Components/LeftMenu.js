import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ModeButton from "./ModeButton";
import "../static/css/LeftMenu.scss";
import logo from "../static/images/logo_onboarding_single.svg";

const LeftMenu = ({ packagesList, showAside, setToggleAside }) => {
  const location = useLocation();
  const [showFolders, setShowFolders] = useState(false);

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
  }, []);

  useEffect(() => {
    if(showFolders && packagesList === 0) {
      packagesList = JSON.parse(sessionStorage.getItem("packages_list"));
    }
  }, [showFolders]);

  useEffect(() => {
    location 
      && (/\/package\/\d+/g).test(location.pathname)
        || (/\/form\/\d+/g).test(location.pathname)
        ? setShowFolders(true)
        : setShowFolders(false);
  }, [location.pathname]);

  const handleHideAside = () => {
    setToggleAside(false);
  }

  const handleWindowResize = () => {
    if(window.innerWidth >= 768) {
      setToggleAside(false);
    }
  }

  return (
    <aside 
      className={`LeftMenu app-aside
        app-aside-expand-md app-aside-light 
        ${showAside ? "show" : ""}`}
      style={{zIndex: "9"}}>
      <div className={`${showAside ? "LeftMenu__pseudo-wrapper " : ""}w-100 h-100`} onClick={ handleHideAside }>
        <div className="LeftMenu__wrapper">
          <div className="LeftMenu__overflow aside-menu overflow-auto">
            <nav id="stacked-menu" className="LeftMenu__nav">
              <header className="LeftMenu__header">
                <img className="LeftMenu__logo" src={ logo } alt="Logo OnlineOnboarding"/>
              </header>
              <ul className="LeftMenu__list">
                <li className="LeftMenu__item menu-item">
                  <NavLink 
                    exact to="/"
                    className="LeftMenu__link"
                    // className="LeftMenu__link LeftMenu__link--main menu-link"
                    activeClassName="LeftMenu__link--active"
                    onClick={ handleHideAside }
                  >
                      {/* <span className="menu-icon fas fa-home"></span>{" "} */}
                      <span className="menu-text">Dashboard</span>
                  </NavLink>
                </li>

                <li className={`LeftMenu__item ${
                  showFolders ? "has-active" : ""
                } menu-item has-child`}>
                  <NavLink 
                    to="/packages" 
                    className="LeftMenu__link menu-link"
                    activeClassName="LeftMenu__link--active"
                    onClick={ handleHideAside }
                  >
                    {/* <i className="bi bi-diagram-2 mr-2" style={{ fontSize: "18px"}}></i> */}
                    <span className="menu-text"> Wdrożenia</span>
                  </NavLink>
                  { showFolders && packagesList &&  (
                    <ul className="LeftMenu__sublist menu">
                      { packagesList.map(element => (
                        <li key={`package-${element.id}`} className="LeftMenu__item menu-item">
                          <NavLink
                            to={ "/package/" + element.id }
                            className="LeftMenu__link menu-link"
                            activeClassName="LeftMenu__link--active"
                            style={{ whiteSpace: "normal"}}
                            onClick={ handleHideAside }
                          >
                            Katalog { element.title }
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
                <li className="LeftMenu__item menu-item">
                  <NavLink
                    to="/add_user"
                    className="LeftMenu__link menu-link"
                    activeClassName="LeftMenu__link--active"
                    onClick={ handleHideAside }
                  >
                    {/* <i className="bi bi-plus-circle mr-2" style={{ fontSize: "18px"}}></i> */}
                    <span className="menu-text"> Dodaj pracownika</span>
                  </NavLink>
                </li>
                <li className="LeftMenu__item menu-item">
                  <NavLink
                    to="/user_list"
                    className="LeftMenu__link menu-link"
                    activeClassName="LeftMenu__link--active"
                    onClick={ handleHideAside }
                  >
                    {/* <i className="bi bi-people mr-2" style={{ fontSize: "18px"}}></i> */}
                    <span className="menu-text"> Lista pracowników</span>
                  </NavLink>
                </li>
                <li className="LeftMenu__item menu-item">
                  <NavLink 
                    to="/company"
                    className="LeftMenu__link menu-link"
                    activeClassName="LeftMenu__link--active"
                    onClick={ handleHideAside }
                  >
                    {/* <i className="bi bi-building mr-2" style={{ fontSize: "18px"}}></i> */}
                    <span className="menu-text"> O firmie</span>
                  </NavLink>
                </li>
                <li className="LeftMenu__item menu-item">
                  <NavLink 
                    to="/q_and_a"
                    className="LeftMenu__link menu-link"
                    activeClassName="LeftMenu__link--active"
                    onClick={ handleHideAside }
                  >
                    {/* <i className="bi bi-question-circle mr-2" style={{ fontSize: "18px"}}></i> */}
                    <span className="menu-text"> Q&A</span>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
          {/* <ModeButton /> */}
        </div>
      </div>
    </aside>
  );
}
export default LeftMenu;
