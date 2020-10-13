import React, { useRef } from "react";

//import "../../static/looper/stylesheets/theme.min.css";
//import "../static/looper/stylesheets/theme-dark.min.css";

import Navbar from "../Navbar";
import UsersList from "./UsersList"
import LeftMenu from "../LeftMenu";
import PageAddressBar from "../PageAddressBar"

function UserListPage(props) {
    const packageIdRef = useRef(0);
    if(props.location.state)
        packageIdRef.current = props.location.state.packageId;

    const singleUser = {name: "Craig Hansen", email: "chansen@example.com", position: "Software Developer", department: "Foo Bar", localization: "Lorem Ipsum", sent: 4, finished: 2};
    var allUsers = [], i;
    for(i = 0; i < 5; i++){
        allUsers.push(singleUser);
    }

    return(
    	<div className="app">
    		<header className="app-header app-header-dark">
    			<Navbar />
    		</header>
			<LeftMenu packageId = { packageIdRef.current } />
			<main className="app-main">
				<div className="wrapper"><div className="page">
					<div className="page-inner">
						<PageAddressBar page = { "Konta" } />

						<UsersList users = { allUsers } />
					</div>
				</div></div>
		    </main>
        </div>
    )
}

export default UserListPage;

