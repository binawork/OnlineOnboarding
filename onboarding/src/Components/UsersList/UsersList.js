import React, { useState } from "react";

//import "../static/looper/stylesheets/theme.min.css";
//import "../static/looper/stylesheets/theme-dark.min.css";

import UserListSearch from "../UserListSearch";
import Users, { employeeRemove } from "../hooks/Users";
import LoggedUser from "../hooks/LoggedUser.js";
import ModalWarning from "../ModalWarning";
import UserListRow from "./UserListRow";


function UsersList(props) {
    const [countUpdate, update] = useState(0);
    const [employeeIdModal, setIdModal ] = useState({id: 0, modal: <></>});

    let loggedUser = (props.loggedUser)?props.loggedUser:LoggedUser();
    //const [loggedUser, setLoggedUser ] = useState(loggedUserCp);

    var updateUsers = function(){// simple to refresh component when anything chnages inside;
    	update(countUpdate + 1);
    }

    var removeAsk = (e) => {
        setIdModal({id: e.target.value,
            modal: <ModalWarning handleAccept={ removeUser } handleCancel={ hideModal }
            					title={ "Usunięcie pracownika" }
            					message={ "Czy na pewno chcesz usunąć pracownika" }
            					show={ true }
            					id={ e.target.value } />
        });
    }

    const hideModal = function(){
        setIdModal({id: 0, modal: <></>});
    }

    const removeUser = (id) => {
        hideModal();
        employeeRemove(popUpRemoveModal, id);
    }

    const popUpRemoveModal = (message) => {
        setIdModal({id: 0,
            modal: <ModalWarning handleAccept={ idle } title={ "Usunięcie pracownika" } message={ message } id={ 0 } show={ true } acceptText={ "Ok" } />
        });
    }
    const idle = () => {
        hideModal();
        update(countUpdate + 1);
    };

    let packageId = 0;
    if(props.packageId)
        packageId = props.packageId;

    let users = Users({loggedUser: loggedUser, count: countUpdate}), usersRows = [];
    users.forEach((singleUser, i) => {
        usersRows.push(<UserListRow user={ singleUser } key={ i } handleRemove={ removeAsk } packageId={ packageId } loggedUser={ loggedUser } />);
    });	


    return(
        <div className="page-section">
            <div className="card card-fluid">
                <div className="card-header">
                 Lista pracowników
                </div>
                <div className="card-body">
                    <UserListSearch />
                </div>
                <div className="card-body">
                    { usersRows }
                </div>

                { employeeIdModal.modal }
            </div>
        </div>
    )
}

export default UsersList;

