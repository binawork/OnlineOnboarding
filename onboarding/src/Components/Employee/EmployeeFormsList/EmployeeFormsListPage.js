import React/*, { useState, useEffect }*/ from "react";
import NavbarEmployee from "../NavbarEmployee";
import EmployeeFormsTable from "./EmployeeFormsTable";
import LoggedUser from "../../hooks/LoggedUser";
import ModeButton from "../../ModeButton";


function EmployeeFormsListPage(props) {
    /*const [loggedUser, setLoggedUser] = useState({id: 0, email: "", first_name: "", last_name: "",
    							phone_number: "", location: "", team: "",
    							job_position: "",last_login: "", avatar: ""});*/
    let loggedUser;
    if(props.location.state){
        loggedUser = (props.location.state.loggedUser)?props.location.state.loggedUser:LoggedUser();
    } else
        loggedUser = LoggedUser();

    return(
        <>
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
            <div style={{ position:"fixed", bottom:"0px", left:"0px" }}>
                <ModeButton />
            </div>
        </>
    )
}
export default EmployeeFormsListPage;

