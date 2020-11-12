import React from "react";
import NavbarEmployee from "../NavbarEmployee";
import EmployeeFormsTable from "./EmployeeFormsTable";
import LoggedUser from "../hooks/LoggedUser.js";

function EmployeeFormsListPage(props) {
    let loggedUser;
    if(props.location.state){
        loggedUser = (props.location.state.loggedUser)?props.location.state.loggedUser:LoggedUser();
    } else
        loggedUser = LoggedUser();

    return(
        <div className="app">
            <header className="app-header app-header-dark">
                <NavbarEmployee loggedUser={ loggedUser } />
            </header>
            <main className="app-main">
                <div className="wrapper">
                    <div className="page">
                        <div className="page-inner">
                            <EmployeeFormsTable loggedUser={ loggedUser } />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default EmployeeFormsListPage;

