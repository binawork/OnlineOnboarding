import React, { useState } from "react";

import NavbarEmployee from "./NavbarEmployee.js";
import ModeButton from "../ModeButton";
import LeftMenuEmployee from "./LeftMenuEmployee";
import LoggedUser from "../hooks/LoggedUser.js";
import EmployeeAccount from "./EmployeeAccount/EmployeeAccount.js";
import EmployeeFormsList from "./EmployeeFormsList/EmployeeFormsList";
import EmployeeFormPages from "./EmployeeFormPages/EmployeeFormPages";
import EmployeeSingleFormPage from "./EmployeeFormPages/EmployeeSingleFormPage";
// import EmployeeForm from "./EmployeeForm";
import QnAList from "./QnA/QnAList";


function EmployeeMainPage() {
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
        switchComponent(<EmployeeFormsList loggedUser={ loggedUser } switchPage={ loadFormPages } />);
    };

    const loadEmployeePage = function(){
        document.title = "Onboarding: konto";
        switchComponent(<EmployeeAccount loggedUser={ loggedUser } />);
    };

    const loadQnA = function(){
        document.title = "Onboarding: pytania i odpowiedzi";
        switchComponent(<QnAList />);
    };

    const [component, switchComponent] = useState(<EmployeeFormsList loggedUser={ loggedUser } switchPage={ loadFormPages } />);


    return(
    	<>
    		<header className="app-header app-header-dark">
    			<NavbarEmployee loggedUser={ loggedUser } switchPage={ loadFormList } />{/* placeholder; */}
    		</header>
    		<LeftMenuEmployee mainPage={ loadFormList } employeePage={ loadEmployeePage } q_n_aPage={ loadQnA } />

    		<main className="app-main">
    			<div className="wrapper">
    			    { component }
    			</div>
    		</main>
    		<div style={{ position:"fixed", bottom:"0px", left:"0px" }}>
                <ModeButton />
            </div>
    	</>
    )
}

export default EmployeeMainPage;

