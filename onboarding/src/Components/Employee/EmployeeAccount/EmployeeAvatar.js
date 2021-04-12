import React, { useState, useRef } from "react";


function EmployeeAvatar(props) {
    const fileNameRef = useRef("");

    let userCp = props.loggedUser, avatar = "";
    if(userCp.avatar)
        avatar = userCp.avatar;


    if(props.image){
        if(typeof props.image === "string")
            avatar = props.image;
        else if(typeof props.image.name === "string" && props.image.name.length > 0 && props.image instanceof File)
            avatar = props.image.name

    }


    const [imgSrc, setImage] = useState(avatar);


    const changeAvatar = function(e){
    	if(fileNameRef.current.files.length > 0){
    	    if(FileReader){
    	        let fr = new FileReader(),
    	            url = fr.readAsDataURL(fileNameRef.current.files[0]);
    	        fr.onload = function(e){
    	            setImage(fr.result);/* uploads binary data in src of image <img /> */
    	        }
    	    }

    	    /* sends file object into parent component state, to be able to send this file to the server */
    	    props.setFile(fileNameRef.current.files[0]);
    	}
    };


    return (
    	<div className="col col-md-4">
    		<div className="card-body align-items-center text-center">
    			<div className="user-avatar user-avatar-xxl fileinput-button" role="button">
    				<div className="fileinput-button-label">
							Dodaj/zmień zdjęcie
						</div>
						<img src={ imgSrc } alt="avatar" />
    				<input
							id="fileupload-avatar"
							type="file"
							name="avatar"
							ref={ fileNameRef }
							onChange={ changeAvatar }
						/>
    			</div>
    		</div>
    	</div>
    );
}

export default EmployeeAvatar;

