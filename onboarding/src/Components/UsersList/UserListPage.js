import React from "react";
import UsersList from "./UsersList";
import PageAddressBar from "../PageAddressBar";
import "../../static/css/UsersList.scss";

function UserListPage({ loggedUserId }) {
		document.title= "Onboarding: lista pracowników";

    return(
			<div className="page-inner">
				<PageAddressBar page = { "Lista pracowników" } />
				<UsersList loggedUserId={ loggedUserId } />
			</div>
    );
};

export default UserListPage;

