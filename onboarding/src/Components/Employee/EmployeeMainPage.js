import React, { useEffect, useState } from "react";

import NavbarEmployee from "./NavbarEmployee.js";
import ModeButton from "../ModeButton";
import LeftMenuEmployee from "./LeftMenuEmployee";
import LoggedUser from "../hooks/LoggedUser.js";
import EmployeeAccount from "./EmployeeAccount/EmployeeAccount.js";
import EmployeeFormsList from "./EmployeeFormsList/EmployeeFormsList";
import EmployeeForm from "./EmployeeForm";
import QnAList from "./QnA/QnAList";
import WelcomePage from "./WelcomePage";

function EmployeeMainPage() {
    const [welcomeView, setWelcomeView] = useState(null);
    let loggedUser = LoggedUser();
    
    console.log(loggedUser.id)
    console.log(loggedUser.last_login)

    useEffect(() => {
        loggedUser.id !== 0 && loggedUser.last_login != false
            ? setWelcomeView(false)
            : loggedUser.id !== 0 && !loggedUser.last_login
                ? setWelcomeView(true)
                : null
    }, [loggedUser])

    const loadForm = () => {
        switchComponent(<EmployeeForm />);
    };

    const loadFormList = () => {
        switchComponent(<EmployeeFormsList loggedUser={ loggedUser } switchPage={ loadForm } />);
    };

    const loadEmployeePage = function(){
        document.title = "Onboarding: konto";
        switchComponent(<EmployeeAccount loggedUser={ loggedUser } />);
    };

    const loadQnA = function(){
        document.title = "Onboarding: pytania i odpowiedzi";
        switchComponent(<QnAList />);
    };

    const [component, switchComponent] = useState(<EmployeeFormsList loggedUser={ loggedUser } switchPage={ loadForm } />);

    return(
        <>
            {welcomeView === true ? (
                <WelcomePage setWelcomeView={setWelcomeView} />
            ) : welcomeView === false ? (
                <>
                    <header className="app-header app-header-dark">
                        <NavbarEmployee loggedUser={ loggedUser } switchPage={ loadFormList } />{/* placeholder; */}
                    </header>
                    <LeftMenuEmployee
                        mainPage={ loadFormList }
                        employeePage={ loadEmployeePage }
                        q_n_aPage={ loadQnA }
                    />

                    <main className="app-main">
                        <div className="wrapper">
                            { component }
                        </div>
                    </main>
                    <div style={{ position: "fixed", bottom: "0px", left: "0px" }}>
                        <ModeButton />
                    </div>
                </>
            ) : <></>}
        </>
    );
}

export default EmployeeMainPage;
