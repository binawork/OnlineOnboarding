import React from "react";
import NavbarEmployee from "../NavbarEmployee";
import EmployeeFormsTable from "./EmployeeFormsTable";

function EmployeeFormsListPage() {

    return(
        <div className="app">
            <header className="app-header app-header-dark">
                <NavbarEmployee />
            </header>
            <main className="app-main">
                <div className="wrapper">
                    <div className="page">
                        <div className="page-inner">
                            <EmployeeFormsTable />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default EmployeeFormsListPage;

