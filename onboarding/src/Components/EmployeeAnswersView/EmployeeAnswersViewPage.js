import React, { useRef } from "react";
import LoggedUser from "../hooks/LoggedUser.js";
import Navbar from "../Navbar";
import LeftMenu from "../LeftMenu";


/**
 * Loads page with answers for a page answered by employee
 * @param props - location.state: {packageId: number, loggedUser: Object, pageId: number, employee: Object}
 * @returns {JSX.Element}
 * @constructor
 */
function EmployeeAnswersViewPage(props){
    document.title = "Onboarding: odpowiedzi pracownika";
    const packageIdRef = useRef(0);
    let loggedUser;
    if(props.location.state){
        packageIdRef.current = props.location.state.packageId;
        loggedUser = (props.location.state.loggedUser)?props.location.state.loggedUser:LoggedUser();
    } else
        loggedUser = LoggedUser();


    return(
        <div className="app">
            <header className="app-header app-header-dark">
                <Navbar loggedUser={ loggedUser } />
            </header>
            <LeftMenu packageId = { packageIdRef.current } loggedUser={ loggedUser } />
            <main className="app-main">
                <div className="wrapper">
                </div>
            </main>
        </div>
    )
}

export default EmployeeAnswersViewPage;

