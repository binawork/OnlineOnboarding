import React, { useState, useRef } from "react";

//import "../static/looper/stylesheets/theme.min.css";
//import "../static/looper/stylesheets/theme-dark.min.css";

import UserProfileManage from "./UserProfileManage";
import { uploadAvatar, employeeAddEdit } from "../hooks/EmployeeEdit";

function EmployeeEditForm(props) {
    const fileNameRef = useRef("");

    let userCp = {name: "", last_name: "", email: "", tel: "",
        position: "", department: "", localization: "", avatar: "/onboarding/static/images/unknown-profile.jpg"};
    if(props.user)
        userCp = {...props.user};

    const [imageLink, updateImageLink] = useState(userCp.avatar);

    const handleSaveEdit = user => {
    	if(fileNameRef.current.files.length > 0){
    		uploadAvatar(updateImage, fileNameRef.current.files[0]);
    	}
    	console.log(user);
    	//employeeAddEdit(function(resp){}, user);
    }

    const updateImage = function(response){
    	if(typeof response.avatar === "string")
    		updateImageLink(response.avatar);
    }

    return (
    	<div className="row">
    		<div className="col">
    			<div className="card-body align-items-center text-center">
    				<div className="user-avatar user-avatar-xl fileinput-button">
    					<div className="fileinput-button-label"> Dodaj/zmień zdjęcie </div><img src={ userCp.avatar } alt="avatar" />
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

