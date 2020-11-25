import React, { useState, useRef } from "react";
import { uploadAvatar, employeeAddEdit } from "../../hooks/Users";


function EmployeeAvatar(props) {
    const fileNameRef = useRef("");

    let userCp = props.loggedUser;

    /*const [imageLink, updateImageLink] = useState(userCp.avatar);

    const handleSaveEdit = user => {
        if(fileNameRef.current.files.length > 0){
            console.log("EEF - av");
            uploadAvatar(updateImage, fileNameRef.current.files[0], user);
        }

        employeeAddEdit(showModal, user);
    }

    const updateImage = function(response){
        if(typeof response.avatar === "string")
            updateImageLink(response.avatar);
    }*/


    return (
    	<div className="col">
    		<div className="card-body align-items-center text-center">
    			<div className="user-avatar user-avatar-xl fileinput-button">
    				<div className="fileinput-button-label"> Dodaj/zmień zdjęcie </div><img src={ userCp.avatar } alt="avatar" />
    				<input id="fileupload-avatar" type="file" name="avatar" ref={ fileNameRef } />
    			</div>
    		</div>
    	</div>
    );
}

export default EmployeeAvatar;

