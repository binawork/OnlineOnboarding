import React, { useRef } from "react";

//import "../../static/looper/stylesheets/theme.min.css";
//import "../static/looper/stylesheets/theme-dark.min.css";

import Navbar from "../Navbar";
import UsersList from "./UsersList";
import LeftMenu from "../LeftMenu";
import PageAddressBar from "../PageAddressBar";
import LoggedUser from "../hooks/LoggedUser";

function UserListPage(props) {
		const loggedUser = props.location.state?.loggedUser ?? LoggedUser();
    const packageIdRef = useRef(0);
    if(props.location.state){
				packageIdRef.current = props.location.state.packageId;
		};

    document.title= "Onboarding: lista pracowników";

    return(
    	<div className="app">
    		<header className="app-header app-header-dark">
    			<Navbar loggedUser={ loggedUser } />
    		</header>
				<LeftMenu packageId = { packageIdRef.current } loggedUser={ loggedUser } />
				<main className="app-main">
					<div className="wrapper"><div className="page">
						<div className="page-inner">
							<PageAddressBar page = { "Konta" } loggedUser={ loggedUser } />
							<UsersList packageId={ packageIdRef.current } loggedUser={ loggedUser } />
						</div>
					</div></div>
				</main>
			</div>
    )
}

export default UserListPage;

