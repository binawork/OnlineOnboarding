import React, { useState, useRef } from "react";
import UserProfileManage from "./UserProfileManage";
import { uploadAvatar, employeeAddEdit } from "../hooks/Users";
import ModalWarning from "../ModalWarning";
import { useLocation } from "react-router-dom";


function UserEditForm({ user, enableUploadAvatar, buttonTitle, modalTitle, editLoggedUser, setEditLoggedUser }) {
    const fileNameRef = useRef("");
    const location = useLocation();
    const [employeeModal, setModal] = useState(<></>);

    let imageBox = <img src={ user.avatar || "/onboarding/static/images/unknown-profile.jpg" } alt="avatar" />;
    if(enableUploadAvatar){
        imageBox = (
            <>
                <div className="fileinput-button-label">
                    Dodaj/zmień zdjęcie 
                </div>
                <img src={ user.avatar || "/onboarding/static/images/unknown-profile.jpg" } alt="avatar" />
                <input id="fileupload-avatar" type="file" name="avatar" ref={ fileNameRef } />
            </>
        );
    }

    const [imageLink, updateImageLink] = useState(user.avatar || "/onboarding/static/images/unknown-profile.jpg");

    const handleSaveEdit = user => {
        if(typeof fileNameRef.current.files !== 'undefined' && fileNameRef.current.files.length > 0){
            // console.log("EEF - av");
            uploadAvatar(updateImage, fileNameRef.current.files[0], user);
        }
        
        employeeAddEdit(showModal, user);
        if(setEditLoggedUser) {
            setEditLoggedUser(editLoggedUser + 1);
        };
    }

    const updateImage = function(response){
        if(typeof response.avatar === "string")
            updateImageLink(response.avatar);
    }

    const showModal = (message, out) => {
        if(out){
            let linkObj;
            location.pathname === "/profile/manager"
                ? linkObj = {to: "/"}
                : linkObj = {to: "/user_list"}
            setModal(<ModalWarning handleAccept={ function(){} } title={ modalTitle } message={ message } id={ 0 } show={ true } acceptText={ "Ok" } link={ linkObj } />);
        } else
            setModal(<ModalWarning handleAccept={ hideModal } title={ modalTitle } message={ message } id={ 0 } show={ true } acceptText={ "Ok" } />);
    };
    
    const hideModal = function(){
        setModal(<></>);
    };

    return (
    	<div className="row">
    		<div className="col">
    			<div className="card-body align-items-center text-center">
    				<div className="user-avatar user-avatar-xxl fileinput-button">
    					{ imageBox }
    				</div>
    			</div>
    		</div>

    		<div className="col">
    			<UserProfileManage user={ user } handleSaveEdit={ handleSaveEdit } showMessage={ showModal } buttonTitle={ buttonTitle } />
    		</div>
    		{ employeeModal }
    	</div>
    );
}

export default UserEditForm;

