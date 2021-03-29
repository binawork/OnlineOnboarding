import React from "react";
import PageAddressBar from "../PageAddressBar";
import PackagesListTable from "./PackagesListTable";
import "../../static/css/PackagesList.scss";

function PackagesListPage({ setPackagesList }) {
    document.title = "Onboarding: wdrożenia";

    return(
        <div className="page-inner">
            <PageAddressBar page = { "Twoje wdrożenia" } />
            <PackagesListTable setPackagesList={ setPackagesList } />
        </div>
    )
}
export default PackagesListPage;

