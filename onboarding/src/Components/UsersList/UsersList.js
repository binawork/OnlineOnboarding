import React, { useState, useEffect } from "react";
import UserListSearch from "../UserListSearch";
import Users, { employeeRemove } from "../hooks/Users";
import { usersWithPackages } from "../hooks/Packages";
import LoggedUser from "../hooks/LoggedUser.js";
import ModalWarning from "../ModalWarning";
import UserListRow from "./UserListRow";


function UsersList(props) {
    let loggedUser = (props.loggedUser)?props.loggedUser:LoggedUser();
    let packageId = 0;
    if(props.packageId)
        packageId = props.packageId;

	const [loaded, isLoaded] = useState(false);
	const [error, showError] = useState(null);
    const [countUpdate, update] = useState(0);
    const [employeeIdModal, setIdModal] = useState({id: 0, modal: <></>});
    const [users, setUsers] = useState([]);
    const [searchResult, setSearchResult] = useState([]);

    const usersForPackages = usersWithPackages({count: 0});// [{userId: , packageIds: []}, ...];
    if(usersForPackages.length !== 0) {
        let updatedUsers = [];
        for(let i = users.length - 1; i >= 0; i--){
            for(let j = usersForPackages.length - 1; j >= 0; j--){
                if(usersForPackages[j].userId === users[i].id) {
                    users[i].sent = usersForPackages[j].packageIds.length;
                    updatedUsers.push(users[i]);
                }
            }
        }
    }

    useEffect(() => {
        if(loggedUser.id !== 0) {
            Users( loggedUser, setUsers, setSearchResult, isLoaded, showError);
        }
    }, [loggedUser, countUpdate]);

    const removeAsk = (e) => {
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

    return (
      <div className="page-section">
        <div className="card card-fluid">
          <div className="card-header">Lista pracowników</div>
          <div className="card-body">
            <UserListSearch users={users} setSearchResult={setSearchResult}/>
          </div>
          <div className="card-body">
          {error
              ? <p>Wystąpił błąd podczas ładowania danych</p>
              : loaded
                ? searchResult.length !== 0
                    ? searchResult.map((user) => (
                        <UserListRow
                            user={user}
                            key={user.id}
                            handleRemove={removeAsk}
                            packageId={packageId}
                            loggedUser={loggedUser}
                        />
                    )) : <p>Brak wyników</p>
                : <p>Ładowanie...</p>
            }
          </div>

          {employeeIdModal.modal}
        </div>
      </div>
    );
}

export default UsersList;

