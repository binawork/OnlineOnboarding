import React, { useState, useEffect } from "react";
import UserListSearch from "../UserListSearch";
import Users, { employeeRemove } from "../hooks/Users";
import { usersWithPackages } from "../hooks/ProgressStats";
import ModalWarning from "../ModalWarning";
import UserListRow from "./UserListRow";


function UsersList({ loggedUserId }) {
	const [loaded, isLoaded] = useState(false);
	const [error, showError] = useState(null);
    const [countUpdate, update] = useState(0);
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
        if(loggedUserId !== 0) {
            Users( loggedUserId, setUsers, setSearchResult, isLoaded, showError);
        }
    }, [loggedUserId, countUpdate]);

    

    return (
      <div className="page-section">
        <UserListSearch users={ users } setSearchResult={ setSearchResult }/>
        { !loaded && <p>Ładowanie...</p> }
        { error && <p>Wystąpił błąd podczas ładowania danych</p> }
        { loaded && users.length !== 0
            ? searchResult.length !== 0
                ? searchResult.map((user) => (
                    <UserListRow
                        user={ user }
                        key={ user.id }
                        countUpdate={ countUpdate } 
                        update={ update }
                    />
                )) : <p>Brak wyników</p>
            : null
        }
      </div>
    );
}

export default UsersList;

