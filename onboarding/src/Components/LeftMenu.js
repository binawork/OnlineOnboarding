import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ModeButton from "./ModeButton";
import "../static/css/LeftMenu.scss"

const LeftMenu = ({ packagesList, showAside, setToggleAside }) => {
  const location = useLocation();
  const [showFolders, setShowFolders] = useState(false);
  const [windowWidth, setWindowWidth] = useState();

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
    setWindowWidth(window.innerWidth);
    setToggleAside(showAside && windowWidth < 768 ? true : false);
  }

  return (
    <aside 
      className={`LeftMenu app-aside
        app-aside-expand-md app-aside-light 
        ${showAside ? "show" : ""}`}
      style={{zIndex: "9"}}>
      <div className={`${showAside ? "LeftMenu__pseudo-wrapper" : ""} w-100 h-100`} onClick={ handleHideAside }>
        <div className="LeftMenu__wrapper">
          <div className="LeftMenu__overflow aside-menu overflow-auto">
            <nav id="stacked-menu" className="stacked-menu">
              <ul className="LeftMenu__list">
                <li className="menu-header px-0">
                  <NavLink 
                    exact to="/"
                    className="LeftMenu__link LeftMenu__link--main menu-link"
                    activeStyle={{color: "#346CB0"}}
                    onClick={ handleHideAside }
                  >
                      <span className="menu-icon fas fa-home"></span>{" "}
                      <span className="menu-text">Dashboard</span>
                  </NavLink>
                </li>

                <li className={`${
                  showFolders ? "has-active" : ""
                } menu-item has-child`}>
                  <NavLink 
                    to="/packages" 
                    className="LeftMenu__link menu-link"
                    activeStyle={{color: "#346CB0"}}
                    onClick={ handleHideAside }
                  >
                    <i className="bi bi-diagram-2 mr-2" style={{ fontSize: "18px"}}></i>
                    <span className="menu-text"> Wdrożenia</span>
                  </NavLink>
                  { showFolders && packagesList &&  (
                    <ul className="LeftMenu__sublist menu">
                      { packagesList.map(element => (
                        <li key={`package-${element.id}`} className="menu-item">
                          <NavLink
                            to={ "/package/" + element.id }
                            className="LeftMenu__link menu-link"
                            activeStyle={{color: "#346CB0"}}
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
                <li className="menu-item">
                  <NavLink
                    to="/add_user"
                    className="LeftMenu__link menu-link"
                    activeStyle={{color: "#346CB0"}}
                    onClick={ handleHideAside }
                  >
                    <i className="bi bi-plus-circle mr-2" style={{ fontSize: "18px"}}></i>
                    <span className="menu-text"> Dodaj pracownika</span>
                  </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink
                    to="/user_list"
                    className="LeftMenu__link menu-link"
                    activeStyle={{color: "#346CB0"}}
                    onClick={ handleHideAside }
                  >
                    <i className="bi bi-people mr-2" style={{ fontSize: "18px"}}></i>
                    <span className="menu-text"> Lista pracowników</span>
                  </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink 
                    to="/company"
                    className="LeftMenu__link menu-link"
                    activeStyle={{color: "#346CB0"}}
                    onClick={ handleHideAside }
                  >
                    <i className="bi bi-building mr-2" style={{ fontSize: "18px"}}></i>
                    <span className="menu-text"> O firmie</span>
                  </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink 
                    to="/q_and_a"
                    className="LeftMenu__link menu-link"
                    activeStyle={{color: "#346CB0"}}
                    onClick={ handleHideAside }
                  >
                    <i className="bi bi-question-circle mr-2" style={{ fontSize: "18px"}}></i>
                    <span className="menu-text"> Q&A</span>
                  </NavLink>
                </li>
              </ul>

              {/*<ul className="menu">
                          <li className="menu-header">
                              <span className="menu-icon fas fa-home"></span> <span className="menu-text">Components</span>
                          </li>

                          <li className="menu-item">
                              <Link to='/add_user' className="menu-link"><span className="menu-icon fas fa-file"></span> <span className="menu-text">Add new user</span></Link>
                          </li>
                          <li className="menu-item">
                              <Link to='/user_list' className="menu-link"><span className="menu-icon fas fa-file"></span> <span className="menu-text">Lista pracowników</span></Link>
                          </li>
                          <li className="menu-item">
                              <Link to="/profile/manager" className="menu-link"> UserManagerProfile</Link>
                          </li>
                          <li className="menu-item">
                              <Link to="/employee/:employee_id" className="menu-link"> EmployeeProfile</Link>
                          </li>
                          <li className="menu-item">
                              <Link to="/add_user" className="menu-link"> UserManagerProfile</Link>
                          </li>
                          <li className="menu-item">
                              <Link to="/form_edit" className="menu-link"> FormsEdit</Link>
                          </li>
                          <li className="menu-item">
                              <Link to="/package_page" className="menu-link"> FormTable</Link>
                          </li>
                          <li className="menu-item">
                              <Link to="/user_list" className="menu-link"> UserList</Link>
                          </li>
                          <li className="menu-item">
                              <Link to="/packages" className="menu-link"> PackagesList </Link>
                          </li>
                          <li className="menu-item">
                            <Link to="/users_pages" className="menu-link"> AddUserTable </Link>
                          </li>

                          <li className="menu-item">
                              <Link to="/employe_forms_list" className="menu-link"> EmployeeFormsList</Link>
                          </li>
                          <li className="menu-item">
                              <Link to="/employe_page_fill" className="menu-link"> FormsEmployee</Link>
                          </li>
                        </ul>*/}
            </nav>
          </div>
          <ModeButton />
        </div>
      </div>
    </aside>
  );
}
export default LeftMenu;
