import React, { useRef } from "react";

//import "../static/looper/stylesheets/theme.min.css";
//import "../static/looper/stylesheets/theme-dark.min.css";

import EmployeeEditForm from "./EmployeeEditForm";
import Navbar from "../Navbar";
import LeftMenu from "../LeftMenu";
import PageAddressBar from "../PageAddressBar"
import LoggedUser from "../hooks/LoggedUser.js";

function UserManagerProfilePage(props) {
    document.title = "Onboarding: profil pracownika";
    const packageIdRef = useRef(0);
    const singleUser = {id: 0, name: "", last_name: "", email: "", tel: "",
        position: "", department: "", location: "", avatar: "/onboarding/static/images/unknown-profile.jpg"};


    let stateExists = false, loggedUser;
    if(props.location.state){
        packageIdRef.current = props.location.state.packageId;
        loggedUser = (props.location.state.loggedUser)?props.location.state.loggedUser:LoggedUser();

        stateExists = true;
    } else
        loggedUser = LoggedUser();

    if(stateExists && props.location.state.user){
        let user = props.location.state.user;
        if(user.id)
            singleUser.id = user.id;

        if(typeof user.first_name === "string" && user.first_name !== "-")
            singleUser.name = user.first_name;
        if(typeof user.last_name === "string" && user.last_name !== "-")
            singleUser.last_name = user.last_name;

        if(typeof user.email === "string" && user.email !== "-")
            singleUser.email = user.email;
        if(typeof user.tel === "string" && user.tel !== "-")
            singleUser.tel = user.tel;

        if(typeof user.position === "string" && user.position !== "-")
            singleUser.position = user.position;
        if(typeof user.department === "string" && user.department !== "-")
            singleUser.department = user.department;
        if(typeof user.location === "string" && user.location !== "-")
            singleUser.location = user.location;

        if(typeof user.avatar === "string" && user.avatar.length > 1)
            singleUser.avatar = user.avatar;
    }

    let enableUploadAvatar = false;
    if(stateExists && props.location.state.enableUploadAvatar)
        enableUploadAvatar = true;


    return (
    	<div className="app">
    		<header className="app-header app-header-dark">
    			<Navbar loggedUser={ loggedUser } />
    		</header>
    		<LeftMenu packageId = { packageIdRef.current } loggedUser={ loggedUser } />
    		<main className="app-main">
    			<div className="wrapper"><div className="page">
    				<div className="page-inner">
    					<PageAddressBar page = { "Profil pracownika" } loggedUser={ loggedUser } />

    					<div className="page-section">
    						<div className="card card-fluid">
    							<div className="card-header">Pracownik</div>
    							<EmployeeEditForm user={ singleUser }
    							                  loggedUser={ loggedUser }
    							                  packageId={ packageIdRef.current }
    							                  enableUploadAvatar={ enableUploadAvatar } />
    						</div>
    					</div>
    				</div>
    			</div></div>
    	    </main>
        </div>
    );
}

export default UserManagerProfilePage;

