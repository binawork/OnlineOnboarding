import React, { useState, useEffect } from "react";
import Users from "../hooks/Users";
import AddUserTableRow from "./AddUserTableRow";
//import UserListSearch from "../UserListSearch";
import { assignEmployeeToPackage } from "../hooks/EmployeeForms";
import UserListSearch from "../UserListSearch";
import ProgressStats, { joinProgressToUsers } from "../hooks/ProgressStats";

function AddUserTable(props) {
    const [error, showError] = useState(false);
    const [loaded, isLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    const [usersInPackage, setUsersInPackage] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [userTable, setUserTable] = useState([]);
    const progressStats = ProgressStats({count: users.length});
    
    if(users.length > 0 && Object.keys(progressStats).length > 0){
        joinProgressToUsers(users, progressStats);
    }

    useEffect(() => {
      if(props.packageCurrent) {
        if(props.packageCurrent.users && Array.isArray(props.packageCurrent.users) )
          setUsersInPackage(props.packageCurrent.users);
      }
    }, [props.packageCurrent]);

    useEffect(() => {
      if(props.loggedUserId !== 0) {
        Users(props.loggedUserId, setUsers, setSearchResult, isLoaded, showError);
      }
    }, [props.loggedUserId]);


    useEffect(() => {
      const usersWithoutPackage = users.filter(singleUser =>
        singleUser.id && usersInPackage.indexOf(singleUser.id) < 0
      );
      setUserTable(usersWithoutPackage);
    }, [usersInPackage, users]);

    const updateUsersInPackage = function(employeeId){
        let newUsersInPackage = [...usersInPackage];
        newUsersInPackage.push(parseInt(employeeId, 10));// without parseInt()  indexOf()  makes wrong filtering;

        setUsersInPackage(newUsersInPackage);
    };

    const sendToEmployee = (e) => {
      let employeeId = e.target.value; // id of user on row of button;
      assignEmployeeToPackage(props.showModal, employeeId, props.packageId, updateUsersInPackage);
    };

    return (
      <div className="page-section">
        <UserListSearch users={ userTable } setSearchResult={ setSearchResult }/>
        <header className="mb-4">
          <b>{ `Wyślij wdrożenie ${props.packageCurrent ? `"${props.packageCurrent.title}"` : ""} do pracownika:` }</b>
        </header>
        {error
          ? <p>Wystąpił błąd podczas ładowania danych</p>
          : loaded
            ? searchResult.length !== 0
                ? searchResult.map((singleUser) => (
                  <AddUserTableRow
                    key={ singleUser.id }
                    row={ singleUser }
                    handleSendPackage={ sendToEmployee }
                  />
                )) : <p>Brak wyników</p>
            : <p>Ładowanie...</p>
        }
      </div>
    );
}
export default AddUserTable;
