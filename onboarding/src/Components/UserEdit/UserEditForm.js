import React, { useState, useRef, useEffect } from "react";
import UserProfileManage from "./UserProfileManage";
import { uploadAvatar, employeeAddEdit } from "../hooks/Users";
import ModalWarning from "../ModalWarning";
import { useLocation } from "react-router-dom";
import { validateURL } from "../utils";


/**
 * Returns component containing 2 parts: block of avatar and block with form inputs;
 *
 * @param user:  object of user to be edited with keys like  "id", "avatar", "department", "email", "first_name", "last_name", "location", "position", "tel";
 * @param enableUploadAvatar:  boolean telling if avatar-image can be changed or not;
 * @param buttonTitle:  text printed on button which is clicked when one wants to submit data;
 * @param modalTitle:  text of header on modal;
 * @param editLoggedUser:  number of state of component to update a page when user edits his own data, otherwise 'undefined';
 * @param setEditLoggedUser:  function to change the number above and so the state of component;
 * @returns {JSX.Element}
 * @constructor
 */
function UserEditForm({ user, enableUploadAvatar, buttonTitle, modalTitle, editLoggedUser, setEditLoggedUser }) {
    const fileNameRef = useRef("");
    const location = useLocation();
    const [employeeModal, setModal] = useState(<></>);
    const [imageLink, updateImageLink] = useState("/onboarding/static/images/unknown-profile.jpg");

    useEffect(() => {
        user.avatar = validateURL(user.avatar, "/onboarding/static/images/unknown-profile.jpg");
        updateImageLink(user.avatar || "/onboarding/static/images/unknown-profile.jpg");
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
                <div className="fileinput-button-label">
                    Dodaj/zmień zdjęcie 
                </div>
                <img src={ imageLink } alt="avatar" />
                <input id="fileupload-avatar" type="file" name="avatar" ref={ fileNameRef } onChange={ changeAvatar } />
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
        if(out && setEditLoggedUser == null){
            let linkObj;
            location.pathname === "/my_profile"
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
    	<div className="row flex-column flex-md-row justify-content-center p-3">
    		<div className="col col-md-4">
    			<div className="card-body align-items-center text-center">
                    <div className="user-avatar user-avatar-xxl fileinput-button">
                        { imageBox }
        			</div>
    			</div>
    		</div>

    		<div className="col container-sm">
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

