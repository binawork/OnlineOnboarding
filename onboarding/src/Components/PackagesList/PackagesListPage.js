import React from "react";
import PageAddressBar from "../PageAddressBar";
import PackagesListTable from "./PackagesListTable";


function PackagesListPage({ loggedUser }) {
    document.title = "Onboarding: wdrożenia";

    return(
        <main className="app-main">
            <div className="wrapper">
                <div className="page">
                    <div className="page-inner">
                        <PageAddressBar page = { "Twoje wdrożenia" } />
                        <PackagesListTable loggedUser={ loggedUser } />
                    </div>
                </div>
            </div>
        </main>
    )
}
export default PackagesListPage;

