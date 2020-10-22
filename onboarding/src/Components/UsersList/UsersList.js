import React, { useState } from "react";

//import "../static/looper/stylesheets/theme.min.css";
//import "../static/looper/stylesheets/theme-dark.min.css";

import UserListRow from "./UserListRow";
import Users from "../hooks/Users";
import UserListSearch from "../UserListSearch";

function UsersList(props) {
    const [countUpdate, update] = useState(0);

    var updateUsers = function(){// simple to refresh component when anything chnages inside;
    	update(countUpdate + 1);
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
                    <Users />
                </div>
            </div>
        </div>
    )
}

export default UsersList;

