import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

function EmployeeAvatar(props) {
    const fileNameRef = useRef("");
    const [avatar, setAvatar] = useState(props.image.img);
		
		useEffect(() => {
				setAvatar(props.loggedUser.avatar);
		}, [props.loggedUser]);

		useEffect(() => {
			if(typeof props.image === "string")
					setAvatar(props.image);
			else if(
					typeof props.image.img.name === "string" 
					&& props.image.img.name.length > 0 
					&& props.image.img instanceof File
			)
					setAvatar(props.image.img.name);
		}, [props.image]);

    const changeAvatar = function(e){
    	if(fileNameRef.current.files.length > 0){
    	    if(FileReader){
    	        let fr = new FileReader(),
    	            url = fr.readAsDataURL(fileNameRef.current.files[0]);
    	        fr.onload = function(e){
									setAvatar(fr.result);/* uploads binary data in src of image <img /> */
    	        }
    	    }

    	    /* sends file object into parent component state, to be able to send this file to the server */
    	    props.setFile(fileNameRef.current.files[0]);
    	}
    };

    return (
			<div className="UserAccount__avatar-border user-avatar user-avatar-xxl fileinput-button" role="button">
				<div className={`UserAccount__icon-wrapper ${avatar ? "fileinput-button-label" : ""}`}>
					<i className="UserAccount__download-icon bi bi-download"></i>
				</div>
				<img
					className="UserAccount__avatar"
					src={ avatar }
					alt="avatar" />
				<input
					className="UserAccount__avatar-input"
					id="fileupload-avatar"
					type="file"
					name="avatar"
					ref={ fileNameRef }
					onChange={ changeAvatar }
				/>
			</div>
    );
}

EmployeeAvatar.propTypes = {
  loggedUser: PropTypes.object.isRequired,
	setFile: PropTypes.func.isRequired,
	image: PropTypes.object.isRequired,
};

export default EmployeeAvatar;

