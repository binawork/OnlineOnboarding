import React, { useState, useRef, useEffect } from "react";
import UserProfileManage from "./UserProfileManage";
import { uploadAvatar, employeeAddEdit } from "../hooks/Users";
import ModalWarning from "../ModalWarning";
import { useLocation } from "react-router-dom";
import { validateURL } from "../utils";


function UserEditForm({ user, enableUploadAvatar, buttonTitle, modalTitle, editLoggedUser, setEditLoggedUser }) {
    const fileNameRef = useRef("");
    const location = useLocation();
    const [employeeModal, setModal] = useState(<></>);
    const [imageLink, updateImageLink] = useState("");

    useEffect(() => {
        user.avatar = validateURL(user.avatar, "/onboarding/static/images/unknown-profile.jpg");
        updateImageLink(user.avatar || "");
    },[user.avatar]);
    
    const changeAvatar = function(e){
    	if(fileNameRef.current.files.length > 0){
    	    if(FileReader){
                let fr = new FileReader();
                fr.readAsDataURL(fileNameRef.current.files[0]);
                fr.onload = function(e){
                    updateImageLink(fr.result);/* uploads binary data in src of image <img /> */
    	        }
    	    }
    	}
    };
    
    let imageBox = <img src={ user.avatar || "/onboarding/static/images/unknown-profile.jpg" } alt="avatar" />;
    if(enableUploadAvatar){
        imageBox = (
            <>
                <div className={`UserAccount__icon-wrapper ${imageLink ? "fileinput-button-label" : ""}`}>
                    <i className="UserAccount__download-icon bi bi-download"></i>
                </div>
                { imageLink && (
                    <img
                        className="UserAccount__avatar"
                        src={ imageLink }
                        alt="avatar" /> 
                )}
                <input
                    className="UserAccount__avatar-input"
                    id="fileupload-avatar"
                    type="file"
                    name="avatar"
                    ref={ fileNameRef }
                    onChange={ changeAvatar } />
            </>
        );
    }

    const updateImage = function(response){
        if(typeof response.avatar === "string")
            updateImageLink(response.avatar);
    }
    const updateData = () => {
        if(setEditLoggedUser) {
            setEditLoggedUser(editLoggedUser + 1);
        };
    }

    const handleSaveEdit = user => {
        if(typeof fileNameRef.current.files !== 'undefined' && fileNameRef.current.files.length > 0){
            // console.log("EEF - av");
            uploadAvatar(updateImage, fileNameRef.current.files[0], user, showModal, updateData);
        } else {
            employeeAddEdit(showModal, user, updateData);
        }
    }


    const showModal = (message, out) => {
        if(out){
            let linkObj;
            location.pathname === "/profile/manager"
                ? linkObj = {to: "/"}
                : linkObj = {to: "/users_list"}
            setModal(<ModalWarning handleAccept={ function(){} } title={ modalTitle } message={ message } id={ 0 } show={ true } acceptText={ "Ok" } link={ linkObj } />);
        } else
            setModal(<ModalWarning handleAccept={ hideModal } title={ modalTitle } message={ message } id={ 0 } show={ true } acceptText={ "Ok" } />);
    };
    
    const hideModal = function(){
        setModal(<></>);
    };

    return (
    	<div className="row flex-column align-items-center">
            <div className="UserAccount__avatar-border user-avatar user-avatar-xxl fileinput-button">
                { imageBox }
            </div>
    		<div className="UserAccount__card">
    			<UserProfileManage
                    user={ user }
                    handleSaveEdit={ handleSaveEdit }
                    showMessage={ showModal }
                    buttonTitle={ buttonTitle } />
    		</div>
    		{ employeeModal }
    	</div>
    );
}

export default UserEditForm;

