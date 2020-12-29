import React from "react";
import { Link } from 'react-router-dom';

function NavbarEmployee(props) {
    const moveToDashboard = function(e){
        e.preventDefault();
        props.switchPage();
    };

    let loggedUser = {first_name: "employee-name #login"};
    if(props.loggedUser){
        loggedUser = {...props.loggedUser};
    }


    return(
      <nav className="top-bar navbar p-0 flex-nowrap">
        <div className="top-bar-brand" style={{height: "auto"}}>
            <a className="navbar-brand" href="#" onClick={ moveToDashboard }>Online Onboarding</a>
        </div>

        <div className="top-bar-list" id="navbarSupportedContent">
            <div className="top-bar-item px-2 d-md-none d-lg-none d-xl-none">
                <button className={`hamburger hamburger-squeeze ${props.showAside ? "active" : ""}`} type="button" data-toggle="aside" aria-label="toggle menu" onClick={() => props.setToggleAside(!props.showAside)}><span className="hamburger-box"><span className="hamburger-inner"></span></span></button>
            </div>

            <div className="top-bar-item top-bar-item-full px-2">
                <ul className="navbar-nav d-flex flex-row breadcrumb my-2 my-lg-0 w-100 text-nowrap">
                    <li className="breadcrumb-item">
                        <a href="#" onClick={ moveToDashboard }>Pulpit</a>
                    </li>
                    { props.pageTitle 
                        ? <li className={`breadcrumb-item ${props.formTitle ? "" : "active"}`}>
                            { props.formTitle 
                                ? <a href="#" onClick={ () => props.loadFormPages(props.actualPackage) }>{ props.pageTitle }</a> 
                                : props.pageTitle 
                            }
                        </li> 
                        : <></>
                    }
                    { props.formTitle
                        ? <li className="breadcrumb-item active">
                            { props.formTitle }
                        </li> 
                        : <></>
                    }
                </ul>

                <div className="my-2 my-lg-0 col-6 p-0"></div>

            </div>
            <div className="top-bar-item top-bar-item-right px-0">
                <div className="dropdown d-flex">
                    <div className="form-inline my-2 my-lg-0">
                        <button className="btn-account d-md-flex" type="button" data-toggle="dropdown">
                            <span className="user-avatar user-avatar-md"><img src={ loggedUser.avatar } alt={ loggedUser.first_name + " - avatar" } /></span>
                            <span className="d-none d-sm-flex"><i>Witaj { loggedUser.first_name }</i></span>
                        </button>
                        <div className="dropdown-menu">
                            <div className="dropdown-arrow ml-3"></div>
                            <a className="dropdown-item" href={"/accounts/logout/"}><span className="dropdown-icon oi oi-account-logout"></span>Wyloguj</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </nav>
    )
}
export default NavbarEmployee;

