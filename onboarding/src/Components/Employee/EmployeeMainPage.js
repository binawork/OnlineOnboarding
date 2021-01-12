import React, { useEffect, useState } from "react";

import NavbarEmployee from "./NavbarEmployee.js";
import ModeButton from "../ModeButton";
import LeftMenuEmployee from "./LeftMenuEmployee";
import LoggedUser from "../hooks/LoggedUser.js";
import EmployeeAccount from "./EmployeeAccount/EmployeeAccount.js";
import EmployeeFormsList from "./EmployeeFormsList/EmployeeFormsList";
import EmployeeFormPages from "./EmployeeFormPages/EmployeeFormPages";
import EmployeeSingleFormPage from "./EmployeeFormPages/EmployeeSingleFormPage";
import QnAList from "./QnA/QnAList";
import CompanyInfoPage from "./CompanyInfoPage";
import WelcomePage from "./WelcomePage";

function EmployeeMainPage() {
    const [welcomeView, setWelcomeView] = useState(true);
    const [showAside, setToggleAside] = useState(false);
    const [pageTitle, setPageTitle] = useState("");
    const [formTitle, setFormTitle] = useState("");
    const [actualPackage, setActualPackage] = useState("");
    const loggedUser = LoggedUser();
    
    console.log(loggedUser.id)
    console.log(loggedUser.last_login)

    useEffect(() => {
        loggedUser.id !== 0 && loggedUser.last_login != false
            ? setWelcomeView(false)
            : loggedUser.id !== 0 && !loggedUser.last_login
                ? setWelcomeView(true)
                : null
    }, [loggedUser])

    const loadSinglePage = (page) => {
        setFormTitle(page.title)
        switchComponent(
            <EmployeeSingleFormPage
                page={ page }
            />
        );
    };


    const loadFormPages = (packageId) => {
        setActualPackage(packageId);
        setFormTitle("");
        switchComponent(
            <EmployeeFormPages
                switchPage={ loadSinglePage }
                actualPackageId={ packageId }
            />
        );
    };

    const loadFormList = () => {
        setPageTitle("");
        setFormTitle("");
        switchComponent(<EmployeeFormsList loggedUser={ loggedUser } switchPage={ loadFormPages } setPageTitle={setPageTitle} />);
    };

    const loadEmployeePage = function(){
        document.title = "Onboarding: konto";
        setPageTitle("Mój profil");
        setFormTitle("");
        setActualPackage("");
        switchComponent(<EmployeeAccount loggedUser={ loggedUser } />);
    };

    const loadQnA = function(){
        document.title = "Onboarding: pytania i odpowiedzi";
        setPageTitle("Q&A");
        setFormTitle("");
        setActualPackage("");
        switchComponent(<QnAList />);
    };

    const loadCompanyInfo = () => {
        document.title = "Onboarding: informacje o firmie";
        setPageTitle("O firmie");
        setActualPackage("");
        setFormTitle("");
        switchComponent(<CompanyInfoPage loggedUser={loggedUser} />);
    }

    const [component, switchComponent] = useState(<EmployeeFormsList loggedUser={ loggedUser } switchPage={ loadFormPages } setPageTitle={setPageTitle} />);

    return(
        <>
            {welcomeView === true ? (
                <WelcomePage setWelcomeView={setWelcomeView} />
            ) : welcomeView === false ? (
                <>
                    <header className="app-header app-header-dark">
                        <NavbarEmployee loggedUser={ loggedUser } switchPage={ loadFormList } showAside={ showAside } setToggleAside={ setToggleAside } pageTitle={ pageTitle } formTitle={ formTitle } actualPackage={ actualPackage } loadFormPages={ loadFormPages }/>{/* placeholder; */}
                    </header>
                    <LeftMenuEmployee
                        mainPage={ loadFormList }
                        employeePage={ loadEmployeePage }
                        q_n_aPage={ loadQnA }
                        aboutCompanyPage={ loadCompanyInfo }
                        showAside={ showAside }
                        setToggleAside={ setToggleAside }
                    />

                    <main className="app-main">
                        <div className="wrapper">
                            { component }
                        </div>
                    </main>
                    <div style={{ position: "fixed", bottom: "0px", left: "0px" }}>
                        {/* <ModeButton /> */}
                    </div>
                </>
            ) : <></>}
        </>
    );
}

export default EmployeeMainPage;
