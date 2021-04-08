import React, { useState, useEffect } from "react";
import Users from "../hooks/Users";
import AddUserTableRow from "./Add_User_Table_Row";
//import UserListSearch from "../UserListSearch";
import { assignEmployeeToPackage } from "../hooks/EmployeeForms";
import UserListSearch from "../UserListSearch";

function AddUserTable(props) {
    const [error, showError] = useState(false);
    const [loaded, isLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    const [usersInPackage, setUsersInPackage] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [userTable, setUserTable] = useState([]);

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

    const sendToEmployee = (e) => {
      let employeeId = e.target.value; // id of user on row of button;
      assignEmployeeToPackage(props.showModal, employeeId, props.packageId, setUsersInPackage);
    };

    return (
      <div className="page-section">
        <div className="card card-fluid">
          <div className="card-header">Szukaj pracownika</div>
          <div className="card-body"><UserListSearch users={ userTable } setSearchResult={ setSearchResult }/></div>
        </div>
        <div className="card card-fluid">
          <div className="card-header">{ `Wyślij katalog ${props.packageCurrent ? `"${props.packageCurrent.title}"` : ""} do pracownika:` }</div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "20%" }}>
                      Imie Nazwisko
                    </th>
                    <th scope="col" style={{ width: "20%" }}>
                      Lokalizacja
                    </th>
                    <th scope="col" style={{ width: "8%" }}>
                      Dział
                    </th>
                    <th scope="col" style={{ width: "20%" }}>
                      Stanowisko
                    </th>
                    <th scope="col" style={{ width: "20%" }}>
                      email
                    </th>
                    <th scope="col" style={{ width: "12%" }}>
                      Działanie
                    </th>
                  </tr>
                </thead>
                <tbody id="add_user_table_data_container">
                  {error
                    ? <tr><td><div className="p-3">Wystąpił błąd podczas ładowania danych</div></td></tr>
                    : loaded
                      ? searchResult.length !== 0
                          ? searchResult.map((singleUser) => (
                            <AddUserTableRow
                              key={ singleUser.id }
                              row={ singleUser }
                              handleSendPackage={ sendToEmployee }
                            />
                          )) : <tr><td><div className="p-3">Brak wyników</div></td></tr>
                      : <tr><td><div className="p-3">Ładowanie...</div></td></tr>
                  }
                </tbody>
              </table>
            </div>
            { error ? <div className="p-3">Wystąpił błąd podczas ładowania pracowników</div> : null }
          </div>
        </div>
      </div>
    );
}
export default AddUserTable;
