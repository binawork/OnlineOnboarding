import React, { useRef } from "react";

//import "../static/looper/stylesheets/theme.min.css";
//import "../static/looper/stylesheets/theme-dark.min.css";

import UserProfileManage from "./UserProfileManage";
import Navbar from "./Navbar";
import LeftMenu from "./LeftMenu";
import PageAddressBar from "./PageAddressBar"

function UserManagerProfilePage(props) {
    const packageIdRef = useRef(0);
    const singleUser = {name: "", last_name: "", email: "", tel: "", position: "", department: "", localization: ""};
    let stateExists = false;

    if(props.location.state){
        packageIdRef.current = props.location.state.packageId;
        stateExists = true;
    }

    if(stateExists && props.location.state.user){
        let user = props.location.state.user;
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
        if(typeof user.localization === "string" && user.localization !== "-")
            singleUser.localization = user.localization;
    }

    return (
    	<div className="app">
    		<header className="app-header app-header-dark">
    			<Navbar />
    		</header>
    		<LeftMenu packageId = { packageIdRef.current } />
    		<main className="app-main">
    			<div className="wrapper"><div className="page">
    				<div className="page-inner">
    					<PageAddressBar page = { "Profil pracownika" } />

    					<div className="page-section">
    						<div className="card card-fluid">
    							<div className="card-header">Pracownik</div>
    							<div className="row"> {/* placeholder */}
    								<div className="col">
    									<div className="card-body align-items-center text-center">
    										<div className="user-avatar user-avatar-xl fileinput-button">
    											<div className="fileinput-button-label"> Dodaj/zmień zdjęcie </div><img src="/onboarding/static/images/unknown-profile.jpg" alt="" />
    											<input id="fileupload-avatar" type="file" name="avatar" />
    										</div>
    									</div>
    								</div>

    								<div className="col">
    									<UserProfileManage user={ singleUser } />
    								</div>
    							</div>
    						</div>
    					</div>
    				</div>
    			</div></div>
    	    </main>
        </div>
    );
}

export default UserManagerProfilePage;

