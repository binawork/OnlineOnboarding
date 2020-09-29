import React from "react";
import Navbar from "../Navbar";
import LeftMenu from "../LeftMenu";
import PageAddressBar from "../PageAddressBar";
import EmployeProfileTable from "./EmployeProfileTable";

function EmployeProfilePage() {

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
                            <EmployeProfileTable />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default EmployeProfilePage;

