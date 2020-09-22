import React from "react";
import { addUserFormTableData } from "./Add_User_Table_Data";
import AddUserTableRow from "./Add_User_Table_Row";
import UserListSearch from "../UserListSearch";

function AddUserTable() {
    let user_table = [];
    if (addUserFormTableData) {
        addUserFormTableData.forEach(function (element) {
            user_table.push(<AddUserTableRow row={element}/>)
        });
    }

    return(
        <div className="page-section">
            <div className="card card-fluid">
                <div className="card-header">
                    Lorem Ipsum
                </div>
                <div className="card-body">
                    <UserListSearch />
                </div>
            </div>
            <div className="card card-fluid">
                <div className="card-header">
                    Lista Formularzy
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
