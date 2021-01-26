import React from "react";
import { NavLink } from "react-router-dom";
import ModeButton from "./ModeButton";

const LeftMenu = () => {
  // const loggedUser = JSON.parse(sessionStorage.getItem("logged_user"));
  // const [packageId, setPackageId] = useState(sessionStorage.getItem("package_id"));
  // useEffect(() => {
  //   setPackageId(sessionStorage.getItem("package_id"))
  // })


  // const packageIdRef = useRef(0);

  // if (props.packageId && isFinite(String(props.packageId))) {
  //   packageIdRef.current = props.packageId;
  // }

  return (
    <aside className="app-aside app-aside-expand-md app-aside-light">
      <div className="aside-content">
        <header className="aside-header d-block d-md-none"></header>
        <div className="aside-menu overflow-hidden">
          <nav id="stacked-menu" className="stacked-menu">
            <ul className="menu pl-3">
              <li className="menu-header px-0">
                <NavLink 
                  exact to="/"
                  className="menu-link p-0"
                  activeStyle={{color: "#346CB0"}}
                >
                    <span className="menu-icon fas fa-home"></span>{" "}
                    <span className="menu-text">Dashboard</span>
                </NavLink>
              </li>

              <li className="menu-item has-child has-active">
                <NavLink 
                  to="/packages" 
                  className="menu-link"
                  activeStyle={{color: "#346CB0"}}
                >
                  <i className="bi bi-diagram-2 mr-2" style={{ fontSize: "18px"}}></i>
                  <span className="menu-text"> Wdrożenia</span>
                </NavLink>
                {/* { packageId > 0 && (
                  <ul className="menu">
                    <li className="menu-item">
                      <NavLink
                        to={ "/package/" + packageId }
                        className="menu-link"
                        activeStyle={{color: "#346CB0"}}
                        style={{ whiteSpace: "normal"}}
                      >
                        Lista formularzy w katalogu
                      </NavLink>
                    </li> */}
                    {/* <li className="menu-item">
                      <NavLink to="/user_forms"
                      className="menu-link"
                      activeStyle={{color: "#346CB0"}}
                    >
                        - Wyślij pracownikowi
                      </NavLink>
                    </li> */}
                  {/* </ul>
                )} */}
              </li>
              <li className="menu-item">
                <NavLink
                  to="/add_user"
                  className="menu-link"
                  activeStyle={{color: "#346CB0"}}
                >
                  <i className="bi bi-plus-circle mr-2" style={{ fontSize: "18px"}}></i>
                  <span className="menu-text"> Dodaj pracownika</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  to="/user_list"
                  className="menu-link"
                  activeStyle={{color: "#346CB0"}}
                >
                  <i className="bi bi-people mr-2" style={{ fontSize: "18px"}}></i>
                  <span className="menu-text"> Lista pracowników</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink 
                  to="/company"
                  className="menu-link"
                  activeStyle={{color: "#346CB0"}}
                >
                  <i className="bi bi-building mr-2" style={{ fontSize: "18px"}}></i>
                  <span className="menu-text"> O firmie</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink 
                  to="/q_and_a"
                  className="menu-link"
                  activeStyle={{color: "#346CB0"}}
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
    </aside>
  );
}
export default LeftMenu;
