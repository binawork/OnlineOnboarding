import React, { useRef } from "react";
import ModeButton from './ModeButton'
import { Link } from 'react-router-dom';


function LeftMenu(props){
    const packageIdRef = useRef(0);

    if(props.packageId && isFinite(String(props.packageId) ) ){
        packageIdRef.current = props.packageId;
    }
    
    let userListUrls = [];
    if(packageIdRef.current > 0){
        userListUrls.push(<Link to={{ pathname: "/add_user", state: { packageId: packageIdRef.current } }}
        				className="menu-link"><span className="menu-icon fas fa-file"></span> <span className="menu-text">Dodaj pracownika</span></Link>);
        userListUrls.push(<Link to={{ pathname: "/user_list", state: { packageId: packageIdRef.current } }}
        				className="menu-link"><span className="menu-icon fas fa-file"></span> <span className="menu-text">Lista pracowników</span></Link>);
    } else {
        userListUrls.push(<Link to='/add_user' className="menu-link"><span className="menu-icon fas fa-file"></span> <span className="menu-text">Dodaj pracownika</span></Link>);
        userListUrls.push(<Link to='/user_list' className="menu-link"><span className="menu-icon fas fa-file"></span> <span className="menu-text">Lista pracowników</span></Link>);
    }


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
                            { packageIdRef.current > 0 &&
                            <ul className="menu">
                                <li className="menu-item">
                                    <Link to={{ pathname: "/package_page/" + packageIdRef.current, state: { packageId: packageIdRef.current } }} className="menu-link">Lista formularzy</Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/form_list" className="menu-link">- Wyślij pracownikowi</Link>
                                </li>
                            </ul>
                            }
                        </li>
                        { userListUrls.map(
                        		(link, keyProp) => (<li className="menu-item" key={ keyProp }>{ link }</li>)
                        ) }
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
                           <Link to="/form_list" className="menu-link"> AddUserTable </Link>
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
    )
}
export default LeftMenu;

