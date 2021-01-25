import React, { useEffect } from "react";
import UsersList from "./UsersList";
import PageAddressBar from "../PageAddressBar";

function UserListPage({ loggedUser }) {
		document.title= "Onboarding: lista pracowników";

    return(
			<main className="app-main">
				<div className="wrapper"><div className="page">
					<div className="page-inner">
						<PageAddressBar page = { "Konta" } />
						<UsersList loggedUser={ loggedUser } />
					</div>
				</div></div>
			</main>
    )
}

export default UserListPage;

