import React from "react";
import ModeButton from './ModeButton'
import { Link } from 'react-router-dom';


function LeftMenu() {
    return(
        <aside className="app-aside app-aside-expand-md app-aside-light">
            <div className="aside-content">
                <header className="aside-header d-block d-md-none">

                </header>
                <div className="aside-menu overflow-hidden">
                    <nav id="stacked-menu" className="stacked-menu">

                      <ul className="menu">
                        <li className="menu-header">
                            <span className="menu-icon fas fa-home"></span> <span className="menu-text">Dashboard</span>
                        </li>

                        <li className="menu-item has-child has-active">
                            <Link to='/packages' className="menu-link"><span className="menu-icon far fa-file"></span> <span className="menu-text">Wdrożenia</span></Link>
                            <ul className="menu">
                                <li className="menu-item">
                                    <Link to="/package_page" className="menu-link">Lista formularzy</Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/form_list" className="menu-link">- Wyślij pracownikowi</Link>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <Link to='/add_user' className="menu-link"><span className="menu-icon fas fa-file"></span> <span className="menu-text">Dodaj pracownika</span></Link>
                        </li>
                        <li className="menu-item">
                            <Link to='/user_list' className="menu-link"><span className="menu-icon fas fa-file"></span> <span className="menu-text">Lista pracowników</span></Link>
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
                            <Link to="/profile/employee" className="menu-link"> EmployeProfile</Link>
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
                           <Link to="/form_list" className="menu-link"> AddUserTable </Link>
                        </li>

                        <li className="menu-item">
                            <Link to="/employe_forms_list" className="menu-link"> EmployePageFillCopy</Link>
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
    )
}
export default LeftMenu;

