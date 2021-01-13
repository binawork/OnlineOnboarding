import React, { useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import ModeButton from "./ModeButton";
import LoggedUser from "./hooks/LoggedUser.js";

function LeftMenu(props) {
  const packageIdRef = useRef(0);
  let loggedUser;
  if(props.loggedUser)
    loggedUser = props.loggedUser;
  else
    loggedUser = LoggedUser();


  if (props.packageId && isFinite(String(props.packageId))) {
    packageIdRef.current = props.packageId;
  }

  let userListUrls = [];
  if (packageIdRef.current > 0) {
    userListUrls.push(
      <NavLink
        to={{
          pathname: "/add_user",
          state: { packageId: packageIdRef.current, loggedUser: loggedUser }
        }}
        className="menu-link"
        activeStyle={{color: "#346CB0"}}
      >
        <i class="bi bi-plus-circle mr-2" style={{ fontSize: "18px"}}></i>
        <span className="menu-text"> Dodaj pracownika</span>
      </NavLink>
    );
    userListUrls.push(
      <NavLink
        to={{
          pathname: "/user_list",
          state: { packageId: packageIdRef.current, loggedUser: loggedUser }
        }}
        className="menu-link"
        activeStyle={{color: "#346CB0"}}
      >
        <i class="bi bi-people mr-2" style={{ fontSize: "18px"}}></i>
        <span className="menu-text"> Lista pracowników</span>
      </NavLink>
    );
  } else {
    userListUrls.push(
      <NavLink to={{ pathname: "/add_user", state: { packageId: packageIdRef.current, loggedUser: loggedUser } }} className="menu-link" activeStyle={{color: "#346CB0"}}>
        <i class="bi bi-plus-circle mr-2" style={{ fontSize: "18px"}}></i>
        <span className="menu-text"> Dodaj pracownika</span>
      </NavLink>
    );
    userListUrls.push(
      <NavLink to={{
          pathname: "/user_list",
          state: {loggedUser: loggedUser}
      }} className="menu-link" activeStyle={{color: "#346CB0"}}>
        <i class="bi bi-people mr-2" style={{ fontSize: "18px"}}></i>
        <span className="menu-text"> Lista pracowników</span>
      </NavLink>
    );
  }

  return (
    <aside className="app-aside app-aside-expand-md app-aside-light">
      <div className="aside-content">
        <header className="aside-header d-block d-md-none"></header>
        <div className="aside-menu overflow-hidden">
          <nav id="stacked-menu" className="stacked-menu">
            <ul className="menu pl-3">
              <li className="menu-header px-0">
                <NavLink exact to={{ pathname: "/", state: {loggedUser: loggedUser} }} className="menu-link p-0" activeStyle={{color: "#346CB0"}}>
                    <span className="menu-icon fas fa-home"></span>{" "}
                    <span className="menu-text">Dashboard</span>
                </NavLink>
              </li>

              <li className="menu-item has-child has-active">
                <NavLink to={{ pathname: "/packages", state: {loggedUser: loggedUser} }} className="menu-link" activeStyle={{color: "#346CB0"}}>
                  <i className="bi bi-diagram-2 mr-2" style={{ fontSize: "18px"}}></i>
                  <span className="menu-text"> Wdrożenia</span>
                </NavLink>
                {packageIdRef.current > 0 && (
                  <ul className="menu">
                    <li className="menu-item">
                      <NavLink
                        to={{
                          pathname: "/package_page/" + packageIdRef.current,
                          state: { packageId: packageIdRef.current, loggedUser: loggedUser },
                        }}
                        className="menu-link"
                        activeStyle={{color: "#346CB0"}}
                      >
                        Lista formularzy
                      </NavLink>
                    </li>
                    <li className="menu-item">
                      <NavLink to={{ pathname: "/users_pages", state: { packageId: packageIdRef.current, loggedUser: loggedUser } }} className="menu-link" activeStyle={{color: "#346CB0"}}>
                        - Wyślij pracownikowi
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              {userListUrls.map((link, keyProp) => (
                <li className="menu-item" key={keyProp}>
                  {link}
                </li>
              ))}
              <li className="menu-item">
                <NavLink to={{ pathname: "/company", state: { packageId: packageIdRef.current, loggedUser: loggedUser } }} className="menu-link" activeStyle={{color: "#346CB0"}}>
                  <i class="bi bi-building mr-2" style={{ fontSize: "18px"}}></i>
                  <span className="menu-text"> O firmie</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink to={{ pathname: "/q_and_a", state: { packageId: packageIdRef.current, loggedUser: loggedUser } }} className="menu-link" activeStyle={{color: "#346CB0"}}>
                  <i class="bi bi-question-circle mr-2" style={{ fontSize: "18px"}}></i>
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
                            <Link to="/employee_profile" className="menu-link"> EmployeeProfile</Link>
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
    </aside>
  );
}
export default LeftMenu;
