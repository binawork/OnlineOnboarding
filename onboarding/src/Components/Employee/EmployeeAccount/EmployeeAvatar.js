import React, { useState, useRef } from "react";
//import { uploadAvatar, employeeAddEdit } from "../../hooks/Users";


function EmployeeAvatar(props) {
    const fileNameRef = useRef("");

    let userCp = props.loggedUser, avatar = "";

    if(props.image){
        if(typeof props.image === "string")
            avatar = props.image;
        else if(typeof props.image.name === "string" && props.image.name.length > 0 && props.image instanceof File)
            avatar = props.image.name

    } else if(userCp.avatar)
        avatar = userCp.avatar;


    const [imgSrc, setImage] = useState(avatar);


    const changeAvatar = function(e){
    	if(fileNameRef.current.files.length > 0){
    	    if(FileReader){
    	        let fr = new FileReader(),
    	            url = fr.readAsDataURL(fileNameRef.current.files[0]);
    	        fr.onload = function(e){
    	            setImage(fr.result);
    	        }
    	    }

    	    props.setFile(fileNameRef.current.files[0]);
    	}
    };


    return (
    	<div className="col">
    		<div className="card-body align-items-center text-center">
    			<div className="user-avatar user-avatar-xl fileinput-button">
    				<div className="fileinput-button-label"> Dodaj/zmień zdjęcie </div><img src={ imgSrc } alt="avatar" />
    				<input id="fileupload-avatar" type="file" name="avatar" ref={ fileNameRef } onChange={ changeAvatar } />
    			</div>
    		</div>
    	</div>
    );
}

export default EmployeeAvatar;

