import React, { useState } from "react";

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
    const loggedUser = LoggedUser();

    const loadSinglePage = (page) => {
      switchComponent(
        <EmployeeSingleFormPage
          page={page}
        />
      );
    };


    const loadFormPages = (packageId) => {
      switchComponent(
        <EmployeeFormPages
          switchPage={loadSinglePage}
          actualPackageId={packageId}
        />
      );
    };

    const loadFormList = () => {
        setPageTitle("");
        switchComponent(<EmployeeFormsList loggedUser={ loggedUser } switchPage={ loadFormPages } setPageTitle={setPageTitle} />);
    };

    const loadEmployeePage = function(){
        document.title = "Onboarding: konto";
        setPageTitle("Mój profil");
        switchComponent(<EmployeeAccount loggedUser={ loggedUser } />);
    };

    const loadQnA = function(){
        document.title = "Onboarding: pytania i odpowiedzi";
        setPageTitle("Q&A");
        switchComponent(<QnAList />);
    };

    const loadCompanyInfo = () => {
        document.title = "Onboarding: informacje o firmie";
        setPageTitle("O firmie");
        switchComponent(<CompanyInfoPage loggedUser={loggedUser} />);
    }

    const [component, switchComponent] = useState(<EmployeeFormsList loggedUser={ loggedUser } switchPage={ loadFormPages } setPageTitle={setPageTitle} />);

    return(
        <>
            {welcomeView ? (
                <WelcomePage setWelcomeView={setWelcomeView} />
            ) : (
                <>
                    <header className="app-header app-header-dark">
                        <NavbarEmployee loggedUser={ loggedUser } switchPage={ loadFormList } showAside={ showAside } setToggleAside={ setToggleAside } pageTitle={ pageTitle } />{/* placeholder; */}
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
            )}
        </>
    );
}

export default EmployeeMainPage;
