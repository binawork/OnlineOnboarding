import React from "react";

//import "../static/looper/stylesheets/theme.min.css";
//import "../static/looper/stylesheets/theme-dark.min.css";

import UserListRow from "./UserListRow";
import UserListSearch from "../UserListSearch";

function UsersList(props) {
    var usersList = [];
    if(props.users){
        //usersList = props.users.map((single, i) => (<UserListRow user = { single } key = { i } />));
        var i, n = props.users.length;
        for(i = 0; i < n; i++){
            usersList.push(<UserListRow user = { props.users[i] } key = { i } />);
        }
    }

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
                    { usersList }
                </div>
            </div>
        </div>
    )
}

export default UsersList;

