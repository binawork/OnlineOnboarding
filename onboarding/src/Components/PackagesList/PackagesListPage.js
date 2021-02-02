import React from "react";
import Navbar from "../Navbar";
import LeftMenu from "../LeftMenu";
import PageAddressBar from "../PageAddressBar";
import LoggedUser from "../hooks/LoggedUser.js";
import PackagesListTable from "./PackagesListTable";


function PackagesListPage(props) {
    const loggedUser = props.location.state?.loggedUser ?? LoggedUser();

    document.title = "Onboarding: wdrożenia";

    return(
        <div className="app">
            <header className="app-header app-header-dark">
                <Navbar loggedUser={ loggedUser } />
            </header>
            <LeftMenu loggedUser={ loggedUser } />
            <main className="app-main">
                <div className="wrapper">
                    <div className="page">
                        <div className="page-inner">
                            <PageAddressBar page = { "Twoje wdrożenia" } loggedUser={ loggedUser } />
                            <PackagesListTable loggedUser={ loggedUser } />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default PackagesListPage;

