import React, { useRef } from "react";
import LoggedUser from "../hooks/LoggedUser.js";
import Navbar from "../Navbar";
import PageAddressBar from "../PageAddressBar";
import LeftMenu from "../LeftMenu";
import EmployeeAnswers from "./EmployeeAnswers";
import EmployeeProfileUser from "../EmployeeProfile/EmployeeProfileUser";
import PageCard from "./PageCard";


/**
 * Loads page with answers for a page answered by employee
 * @param props - location.state: {packageId: number, loggedUser: Object, page: Object, employee: Object}
 * @returns {JSX.Element}
 * @constructor
 */
function EmployeeAnswersViewPage(props){
    document.title = "Onboarding: odpowiedzi pracownika";
    const packageIdRef = useRef(0);
    let loggedUser, employeeId = -1, pageId = -1,
        employeeComponent = <></>, pageComponent = <></>;


    if(props.match.params.page_id)
        pageId = parseInt(props.match.params.page_id, 10);

    if(props.location.state){
        packageIdRef.current = props.location.state.packageId;
        loggedUser = (props.location.state.loggedUser)?props.location.state.loggedUser:LoggedUser();

        if(props.location.state.employee){
            employeeComponent = <EmployeeProfileUser user={ props.location.state.employee } loggedUser={ loggedUser } packageId={ packageIdRef.current } />;
            if(props.location.state.employee.id)
                employeeId = props.location.state.employee.id;
        }
        if(props.location.state.page){
            pageComponent = <PageCard page={ props.location.state.page } />
        }
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
                    <div className="page">
                        <div className="page-inner">
                            <PageAddressBar page = { "Podgląd odpowiedzi pracownika" } loggedUser={ loggedUser } />
                            <div className="page-section">
                                { employeeComponent }
                                { pageComponent }
                                <EmployeeAnswers pageId={ pageId } employeeId={ employeeId }/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default EmployeeAnswersViewPage;

