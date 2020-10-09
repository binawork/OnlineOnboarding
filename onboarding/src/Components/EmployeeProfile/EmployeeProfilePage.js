import React from "react";
import Navbar from "../Navbar";
import LeftMenu from "../LeftMenu";
import PageAddressBar from "../PageAddressBar";
import EmployeeProfileTable from "./EmployeeProfileTable";

function EmployeeProfilePage() {

    return(
        <div className="app">
            <header className="app-header app-header-dark">
                <Navbar />
            </header>
            <LeftMenu />
            <main className="app-main">
                <div className="wrapper">
                    <div className="page">
                        <div className="page-inner">
                            <PageAddressBar page = { "Podgląd procesu pracownika" } />
                            <EmployeeProfileTable />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default EmployeeProfilePage;

