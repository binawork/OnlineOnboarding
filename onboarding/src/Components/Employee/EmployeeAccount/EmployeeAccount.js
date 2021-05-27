import React, { useState } from "react";
import PropTypes from "prop-types";
import EmployeeAvatar from "./EmployeeAvatar";
import EmployeeProfile from "./EmployeeProfile";
import ModalWarning from "../../ModalWarning";
import PageAddressBar from "../../PageAddressBar";
import { uploadAvatarSync, employeeSelfEdit } from "../../hooks/Users";
import "../../../static/css/UserAccount.scss";

function EmployeeAccount({ loggedUser, countUpdate, updateUser }){
    const [employeeModal, setModal ] = useState(<></>);
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

    const [imageFile, setImageFile] = useState({localChanged: false, img: editedUser.avatar, msg: ""});

    const handleEdit = function(user){
        uploadAvatarSync(imageFile, user).then(function(result){
            if(typeof result.avatarData === "string"){
                setImageFile({localChanged: false, img: result.avatarData, msg: result.avatarMsg?result.avatarMsg:""});
            }

            return result;
        }).then((result) => {
            let user = {...result};
            if(user.avatarData)
                delete user.avatarData;
            employeeSelfEdit(showModal, user);
        });
    };

    const changeImage = (file) => {
        setImageFile({localChanged: true, img: file, msg: ""});
    };

    /*const updateImage = function(response){
        if(typeof response.avatar === "string")
            setImageFile({localChanged: false, img: response.avatar, msg: ""});
    };*/

    const showModal = (message) => {
        setModal(
            <ModalWarning
                handleAccept={ hideModal }
                title={ "Twój profil" }
                message={ message }
                id={ 0 }
                show={ true }
                acceptText={ "Ok" } />
        );
    };
    const hideModal = function(){
        setModal(<></>);
        updateUser(countUpdate + 1);
    };

    return (
        <div className="page-inner">
            <PageAddressBar page="Twój profil" />
            <div className="row flex-column align-items-center">
                <EmployeeAvatar
                    loggedUser={ editedUser }
                    setFile={ changeImage }
                    image={ imageFile }
                />
                <div className="UserAccount__card">
                    <EmployeeProfile
                        loggedUser={ editedUser }
                        handleEdit={ handleEdit }
                        showMessage={ showModal }
                    />
                </div>
                { employeeModal }
            </div>
        </div>
    );
}

EmployeeAccount.propTypes = {
    loggedUser: PropTypes.object.isRequired,
};

export default EmployeeAccount;

