import React, { useState, useEffect } from "react";
import Users from "../hooks/Users";
import AddUserTableRow from "./Add_User_Table_Row";
//import UserListSearch from "../UserListSearch";
import LoggedUser from "../hooks/LoggedUser.js";
import { assignEmployeeToPackage } from "../hooks/EmployeeForms";
// import { addUserFormTableData } from "./Add_User_Table_Data";


function AddUserTable(props) {
    const [countUpdate, update] = useState(0);
    const [error, showError] = useState(null);
    const [loaded, isLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    const [userTable, setUserTable] = useState([]);
    const [usersInPackage, setUsersInPackage] = useState([]);

    let loggedUser = (props.loggedUser)?props.loggedUser:LoggedUser();
    let title = "Adresaci";

    useEffect(() => {
        if(props.packageCurrent){
            if(props.packageCurrent.users && Array.isArray(props.packageCurrent.users) )
            setUsersInPackage(props.packageCurrent.users);
            if(props.packageCurrent.title)
                title += " formularza  \"" + props.packageCurrent.title + "\"";/* https://stackoverflow.com/questions/39758136/render-html-string-as-real-html-in-a-react-component */
        }
    }, [props.packageCurrent])

    useEffect(() => {
        if(loggedUser.id !== 0) {
            Users( loggedUser, setUsers, isLoaded, showError);
        }
    }, [loggedUser]);

    useEffect(() => {
        const usersTable = users
            .filter(
                (singleUser) =>
                    singleUser.id && !usersInPackage.includes(singleUser.id)
            )
            .map((singleUser) => {
                return { id: singleUser.id, row: singleUser };
            });

        setUserTable(usersTable);
    }, [usersInPackage]);

    const sendToEmployee = (e) => {
        let employeeId = e.target.value;// id of user on row of button;
        assignEmployeeToPackage(props.showModal, employeeId, props.packageId);
    };

    return(
      <div className="page-section">
        <div className="card card-fluid">
          <div className="card-header">
            Szukaj pracownika
          </div>
          <div className="card-body">
              {/*<UserListSearch />*/}
          </div>
        </div>
        <div className="card card-fluid">
          <div className="card-header">
            { title }
          </div>
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
                {userTable.map((singleUser) => (
                  <AddUserTableRow
                    key={singleUser.id}
                    row={singleUser.row}
                    handleSendPackage={sendToEmployee}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}
export default AddUserTable;
