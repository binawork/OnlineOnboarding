import React, { useState, useEffect } from "react";
import Users from "../hooks/Users";
import AddUserTableRow from "./Add_User_Table_Row";
//import UserListSearch from "../UserListSearch";
import LoggedUser from "../hooks/LoggedUser.js";
import { assignEmployeeToPackage } from "../hooks/EmployeeForms";

function AddUserTable(props) {
    let loggedUser = (props.loggedUser) ? props.loggedUser : LoggedUser();
    let title = "Adresaci";

    const [error, showError] = useState(false);
    const [loaded, isLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    const [usersInPackage, setUsersInPackage] = useState([]);
    let user_table = [];

    useEffect(() => {
      if(props.packageCurrent) {
        if(props.packageCurrent.users && Array.isArray(props.packageCurrent.users) )
          setUsersInPackage(props.packageCurrent.users);
        if(props.packageCurrent.title)
          title += ` formularza "${props.packageCurrent.title}"`; /* https://stackoverflow.com/questions/39758136/render-html-string-as-real-html-in-a-react-component */
      }
    }, [props.packageCurrent]);

    useEffect(() => {
      if(loggedUser.id !== 0) {
        Users(loggedUser, setUsers, null, isLoaded, showError);
      }
    }, [loggedUser]);

    const sendToEmployee = (e) => {
      let employeeId = e.target.value; // id of user on row of button;
      assignEmployeeToPackage(props.showModal, employeeId, props.packageId, setUsersInPackage);
    };

    users.forEach(function (singleUser) {
      if(singleUser.id && usersInPackage.indexOf(singleUser.id) >= 0) return;
      user_table.push(
        <AddUserTableRow
          key={ singleUser.id }
          row={ singleUser }
          handleSendPackage={ sendToEmployee }
        />
      );
    });

    return (
      <div className="page-section">
        <div className="card card-fluid">
          <div className="card-header">Szukaj pracownika</div>
          <div className="card-body">{/*<UserListSearch />*/}</div>
        </div>
        <div className="card card-fluid">
          <div className="card-header">{ title }</div>
          <div className="card-body">
            <table className="table table-striped">
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
                { !loaded ? <tr><td><div className="p-3">Ładowanie...</div></td></tr> : null }
                { error ? null : user_table }
              </tbody>
            </table>
            { error ? <div className="p-3">Wystąpił błąd podczas ładowania pracowników</div> : null }
          </div>
        </div>
      </div>
    );
}
export default AddUserTable;
