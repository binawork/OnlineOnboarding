import React, { useState } from "react";

import EmployeeAvatar from "./EmployeeAvatar";
import EmployeeProfile from "./EmployeeProfile";
import LoggedUser from "../../hooks/LoggedUser.js";
import { uploadAvatar, employeeAddEdit } from "../../hooks/Users";
import ModalWarning from "../../ModalWarning";


function EmployeeAccount(props){
    const [employeeModal, setModal ] = useState(<></>);

    let loggedUser;
    if(props.loggedUser){
        loggedUser = props.loggedUser;
    } else
        loggedUser = LoggedUser();

    let editedUser = {...loggedUser};

    if(typeof editedUser.phone_number !== "string" || editedUser.phone_number.length < 1)
        editedUser.phone_number = "";
    if(typeof editedUser.job_position !== "string" || editedUser.job_position.length < 1)/* "'value' prop on 'input' should not be null"; */
        editedUser.job_position = "-";
    if(typeof editedUser.team !== "string" || editedUser.team.length < 1)
        editedUser.team = "-";
    if(typeof editedUser.location !== "string" || editedUser.location.length < 1)
        editedUser.location = "-";
    if(typeof editedUser.avatar !== "string" || editedUser.avatar.length < 1)
        editedUser.avatar = "/onboarding/static/images/unknown-profile.jpg";

    const [imageFile, setImageFile] = useState({localChanged: false, img: editedUser.avatar});


    const handleEdit = function(user){
        if(imageFile.localChanged){
            console.log("EAc - av");
            uploadAvatar(updateImage, imageFile.img, user);
        }

        user.name = user.first_name;
        employeeAddEdit(showModal, user);
    };

    const changeImage = (file) => {
        setImageFile({localChanged: true, img: file});
    };

    const updateImage = function(response){
        if(typeof response.avatar === "string")
            setImageFile({localChanged: false, img: response.avatar});
    };


    const showModal = (message) => {
        setModal(<ModalWarning handleAccept={ hideModal } title={ "Twój profil" } message={ message } id={ 0 } show={ true } acceptText={ "Ok" } />);
    };
    const hideModal = function(){
        setModal(<></>);
    };


    return (
    	<div className="page">
    		<div className="page-inner">
    			<div className="page-section">
    				<div className="card card-fluid">
    					<div className="card-header">Pracownik</div>
    					<div className="row">
    						<EmployeeAvatar loggedUser={ editedUser } setFile={ changeImage } image={ imageFile } />
    						<div className="col">
    							<EmployeeProfile loggedUser={ editedUser } handleEdit={ handleEdit } showMessage={ showModal } />
    						</div>
    						{ employeeModal }
    					</div>
    				</div>
    			</div>
    		</div>
    	</div>
    );
}

export default EmployeeAccount;

