import React from "react";
import Users from "../hooks/Users";
import AddUserTableRow from "./Add_User_Table_Row";
//import UserListSearch from "../UserListSearch";
import LoggedUser from "../hooks/LoggedUser.js";
import { assignEmployeeToPackage } from "../hooks/EmployeeForms";
// import { addUserFormTableData } from "./Add_User_Table_Data";


function AddUserTable(props) {
    let loggedUser = (props.loggedUser)?props.loggedUser:LoggedUser();
    let user_table = [], users, usersInPackage = [];
    let title = "Adresaci";

    if(props.packageCurrent){
        if(props.packageCurrent.users && Array.isArray(props.packageCurrent.users) )
            usersInPackage = props.packageCurrent.users;

        if(props.packageCurrent.title)
            title += " formularza  \"" + props.packageCurrent.title + "\"";/* https://stackoverflow.com/questions/39758136/render-html-string-as-real-html-in-a-react-component */
    }

    const sendToEmployee = (e) => {
        let employeeId = e.target.value;// id of user on row of button;
        assignEmployeeToPackage(props.showModal, employeeId, props.packageId);
    };


    users = Users({loggedUser: loggedUser, count: 0});
    users.forEach(function(singleUser, i){
        if(singleUser.id && usersInPackage.indexOf(singleUser.id) >= 0)
            return;
        user_table.push(<AddUserTableRow key={ singleUser.id } row={ singleUser } handleSendPackage={ sendToEmployee } />);
    });


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
                            <th scope="col" style={{width: "20%"}}>Imie Nazwisko</th>
                            <th scope="col" style={{width: "20%"}}>Lokalizacja</th>
                            <th scope="col" style={{width: "8%"}}>Dział</th>
                            <th scope="col" style={{width: "20%"}}>Stanowisko</th>
                            <th scope="col" style={{width: "20%"}}>email</th>
                            <th scope="col" style={{width: "12%"}}>Działanie</th>
                        </tr>
                        </thead>
                        <tbody id="add_user_table_data_container">
                            { user_table }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default AddUserTable;
