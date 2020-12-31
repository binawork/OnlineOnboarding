import React, { useState, useRef } from "react";
import UserProfileManage from "./UserProfileManage";
import { uploadAvatar, employeeAddEdit } from "../hooks/Users";
import ModalWarning from "../ModalWarning";


function EmployeeEditForm(props) {
    document.title = "Onboarding: dodaj pracownika";

    let userCp = {id: 0, name: "", last_name: "", email: "", tel: "",
        position: "", department: "", location: "", avatar: "/onboarding/static/images/unknown-profile.jpg"};
    if(props.user)
        userCp = {...props.user};

    const fileNameRef = useRef("");
    const [employeeModal, setModal ] = useState(<></>);
    const [imageFile, setFile] = useState("");
    const [image, setImage] = useState(userCp.avatar || "");

    const changeAvatar = function(){
        console.log(fileNameRef)
    	if(fileNameRef.current.files.length > 0){
    	    if(FileReader){
    	        const fileReader = new FileReader();
    	        fileReader.readAsDataURL(fileNameRef.current.files[0]);
    	        fileReader.onload = function(){
                    setImage(fileReader.result);
                    // userCp.avatar = fileReader.result;
    	        }
    	    }
    	    setFile(fileNameRef.current.files[0]);
    	}
    };

    const handleSaveEdit = user => {
        if(typeof fileNameRef.current.files !== 'undefined' && fileNameRef.current.files.length > 0){
            // console.log("EEF - av");
            uploadAvatar(updateImage, imageFile, user);
            // uploadAvatar(imageFile, user);
        }

        employeeAddEdit(showModal, user);
    }

    const updateImage = function(response){
        // if(typeof response.avatar === "string")
        //     updateImageLink(response.avatar);
    }


    const showModal = (message, out) => {
        if(out){
            let linkObj = {loggedUser: props.loggedUser, packageId: props.packageId, to: "/user_list"};
            setModal(<ModalWarning handleAccept={ function(id){} } title={ "Profil pracownika" } message={ message } id={ 0 } show={ true } acceptText={ "Ok" } link={ linkObj } />);
        } else
            setModal(<ModalWarning handleAccept={ hideModal } title={ "Profil pracownika" } message={ message } id={ 0 } show={ true } acceptText={ "Ok" } />);
    };
    const hideModal = function(){
        setModal(<></>);
    };


    return (
    	<div className="row">
    		<div className="col">
    			<div className="card-body align-items-center text-center">
    				<div className="user-avatar user-avatar-xl fileinput-button">
    					{/* { imageBox } */}
                        <div className="fileinput-button-label"> Dodaj/zmień zdjęcie </div>
                        <img src={ image } alt="avatar" />
                        <input id="fileupload-avatar" type="file" name="avatar" ref={ fileNameRef } onChange={ changeAvatar } />
    				</div>
    			</div>
    		</div>

    		<div className="col">
    			<UserProfileManage user={ userCp } handleSaveEdit={ handleSaveEdit } showMessage={ showModal } />
    		</div>
    		{ employeeModal }
    	</div>
    );
}

export default EmployeeEditForm;

