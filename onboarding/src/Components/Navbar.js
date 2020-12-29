import React from "react";
import { Link } from 'react-router-dom';
import { getPath } from "./utils.js";

function Navbar(props) {
    let path = getPath();

    let loggedUser = {id: 0, avatar: "/onboarding/static/images/unknown-profile.jpg", email: "",
    	first_name: "username", last_name: "", phone_number: "", location: "", team: "", job_position: "", last_login: ""};

    if(props.loggedUser){
        loggedUser = {...props.loggedUser};

        if(typeof props.loggedUser.avatar !== "string" ||
        	(typeof props.loggedUser.avatar === "string" && props.loggedUser.avatar.length < 2) ){
            loggedUser.avatar = "/onboarding/static/images/unknown-profile.jpg";
        }
    }


    const dropDownSwitch = () => {
        let dropDownList = document.getElementById("userDropDown");
        if(dropDownList.style.display=="block")
            dropDownList.style.display="none";
        else
            dropDownList.style.display="block";
    }

    return(
        // <nav className="top-bar navbar navbar-expand-lg navbar-dark">
       <nav className="top-bar navbar p-0 flex-nowrap">
            <div className="top-bar-brand pr-5" style={{height: "auto"}}>
                <Link exact to="/" className="navbar-brand">Online Onboarding</Link>
            </div>

            <div className="pl-3 d-flex justify-content-center w-100">
                {/* <div className="top-bar-item px-2 d-md-none d-lg-none d-xl-none">
                    <button 
                        className={`hamburger hamburger-squeeze ${props.showAside ? "active" : ""}`} 
                        type="button" 
                        data-toggle="aside" 
                        aria-label="toggle menu" 
                        // onClick={() => props.setToggleAside(!props.showAside)}
                    >
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                    </button>
                </div> */}
                {/* <form className="form-inline w-100">
                    <input className="form-control col-6 mr-2" type="search" placeholder="Szukaj" aria-label="Szukaj"/>
                    <button className="btn btn-success col-auto" type="submit">Szukaj</button>
                </form> */}
            </div>
            
            <div className="top-bar-item px-0">
                <div className="dropdown d-flex">
                    <div className="form-inline my-2 my-lg-0">
                        <button className="btn-account d-flex" type="button" data-toggle="dropdown" onClick={ dropDownSwitch }>
                            <span className="user-avatar user-avatar-md"><img src={ loggedUser.avatar } alt={ loggedUser.first_name + " - avatar" } /></span>
                            <span className="account-summary pr-lg-4 d-none d-lg-block">Witaj <span className="account-name">{ loggedUser.first_name }</span></span>
                        </button>
                        <div className="dropdown-menu" id="userDropDown">
                            <div className="dropdown-arrow ml-3"></div>
                            {/*<h6 className="dropdown-header d-none d-md-block d-lg-none">  user username</h6>
                            <a className="dropdown-item" href="#"><span className="dropdown-icon oi oi-person"></span> Profil</a> */}
                            <Link to={{ pathname: "/add_user", state: { user: loggedUser, packageId: 0, loggedUser: loggedUser, enableUploadAvatar: true } }}
                        				className="dropdown-item" data-toggle="tooltip"><span className="dropdown-icon oi oi-person"></span> Profil</Link>
                            <a className="dropdown-item" href={"/accounts/logout/"}><span className="dropdown-icon oi oi-account-logout"></span> Wyloguj</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;

