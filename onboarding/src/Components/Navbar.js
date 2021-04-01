import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "../static/css/Navbar.scss";

function Navbar({ loggedUser, showAside, setToggleAside }) {
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
       <nav className="Navbar top-bar navbar p-0 flex-nowrap">
            <div className="Navbar__brand top-bar-brand pr-5" style={{height: "auto"}}>
                <Link to="/" className="navbar-brand">Online Onboarding</Link>
            </div>
            <div className="top-bar-item px-2 d-md-none d-lg-none d-xl-none">
                <button className={`hamburger hamburger-squeeze ${showAside ? "active" : ""}`} type="button" data-toggle="aside" aria-label="toggle menu" onClick={() => setToggleAside(!showAside)}><span className="hamburger-box"><span className="hamburger-inner"></span></span></button>
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
                    <div className="Navbar__dropdown dropdown-menu" id="userDropDown" style={{ display: dropDownList }}>
                        <div className="Navbar__dropdown-arrow dropdown-arrow dropdown-arrow-right"></div>
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

