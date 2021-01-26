import React from "react";
import PageAddressBar from "../PageAddressBar";
import PackagesListTable from "./PackagesListTable";


function PackagesListPage() {
    document.title = "Onboarding: wdrożenia";

    return(
        <div className="page-inner">
            <PageAddressBar page = { "Twoje wdrożenia" } />
            <PackagesListTable />
        </div>
    )
}
export default PackagesListPage;

