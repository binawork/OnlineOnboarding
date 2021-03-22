import React, { useState } from "react";
import { Link } from 'react-router-dom';

function Navbar({ loggedUser }) {
    const [dropDownList, setDropDownList] = useState("none");
    if(typeof loggedUser.avatar !== "string" ||
        (typeof loggedUser.avatar === "string" && loggedUser.avatar.length < 2) ){
        loggedUser.avatar = "/onboarding/static/images/unknown-profile.jpg";
    };

    const dropDownSwitch = () => {
        // let dropDownList = document.getElementById("userDropDown");
        if(dropDownList=="block")
            setDropDownList("none");
        else
            setDropDownList("block");
    }

    const handleLogout = () => {
        sessionStorage.clear();
    }

    return(
       <nav className="top-bar navbar p-0 flex-nowrap">
            <div className="top-bar-brand pr-5" style={{height: "auto"}}>
                <Link to="/" className="navbar-brand">Online Onboarding</Link>
            </div>

            <div className="pl-3 d-flex justify-content-center w-100">
            </div>
            
            <div className="top-bar-item px-0">
                <div className="dropdown d-flex">
                    <button
                        className="btn-account d-flex"
                        onClick={ dropDownSwitch }
                    >
                        <span className="user-avatar user-avatar-md">
                            <img src={ loggedUser.avatar } alt={ loggedUser.first_name + " - avatar" } />
                        </span>
                        <span className="account-summary pr-lg-4 d-none d-lg-block">
                            Witaj
                            <span className="account-name">
                                { loggedUser.first_name }
                            </span>
                        </span>
                    </button>

                    <div className="dropdown-menu" id="userDropDown" style={{ display: dropDownList, position: "absolute", top: "56px", left: "-84px" }}>
                        <div className="dropdown-arrow dropdown-arrow-right"></div>
                        {/*<h6 className="dropdown-header d-none d-md-block d-lg-none">  user username</h6>
                        <a className="dropdown-item" href="#"><span className="dropdown-icon oi oi-person"></span> Profil</a> */}
                        <Link
                            to="/profile/manager"
                            className="dropdown-item"
                            data-toggle="tooltip"
                            onClick={ dropDownSwitch }
                        >
                            <i className="bi bi-person mr-2" style={{ fontSize: "18px"}}></i>
                            Profil
                        </Link>
                        <a
                            className="dropdown-item"
                            href={"/accounts/logout/"}
                            onClick={ handleLogout }
                        >
                            <i className="bi bi-box-arrow-left mr-2" style={{ fontSize: "18px"}}></i>
                            Wyloguj
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;

