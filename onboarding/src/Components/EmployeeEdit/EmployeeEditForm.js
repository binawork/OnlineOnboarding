import React, { useRef } from "react";

//import "../static/looper/stylesheets/theme.min.css";
//import "../static/looper/stylesheets/theme-dark.min.css";

import UserProfileManage from "./UserProfileManage";
import Navbar from "../Navbar";
import LeftMenu from "../LeftMenu";
import PageAddressBar from "../PageAddressBar"

function EmployeeEditForm(props) {
    const fileNameRef = useRef("");
    let userCp = {name: "", last_name: "", email: "", tel: "", department: "", localization: "", position: ""};
    if(props.user)
        userCp = {...props.user};

    const handleSaveEdit = user => {
    	console.log(fileNameRef.current.files[0].name);
    	console.log(user);
    }

    return (
    	<div className="row">
    		<div className="col">
    			<div className="card-body align-items-center text-center">
    				<div className="user-avatar user-avatar-xl fileinput-button">
    					<div className="fileinput-button-label"> Dodaj/zmień zdjęcie </div><img src="/onboarding/static/images/unknown-profile.jpg" alt="" />
    					<input id="fileupload-avatar" type="file" name="avatar" ref={ fileNameRef } />
    				</div>
    			</div>
    		</div>

    		<div className="col">
    			<UserProfileManage user={ userCp } handleSaveEdit={ handleSaveEdit } />
    		</div>
    	</div>
    );
}

export default EmployeeEditForm;

