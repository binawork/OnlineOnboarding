import React, { useState } from "react";

import NavbarEmployee from "./NavbarEmployee.js";
import ModeButton from "../ModeButton";
import LeftMenuEmployee from "./LeftMenuEmployee";
import LoggedUser from "../hooks/LoggedUser.js";
import EmployeeAccount from "./EmployeeAccount/EmployeeAccount.js";
import EmployeeFormsList from "./EmployeeFormsList/EmployeeFormsList";
import EmployeeFormPages from "./EmployeeFormPages/EmployeeFormPages";
import EmployeeForm from "./EmployeeForm";


function EmployeeMainPage() {
    const loggedUser = LoggedUser();
 
    const loadForm = (pageId) => {
      switchComponent(
        <EmployeeForm
        //   loggedUser={loggedUser}
        //   switchPage={loadForm}
          actualPage={pageId}
        />
      );
    };

    const loadPages = (packageId) => {
      switchComponent(
        <EmployeeFormPages
          switchPage={loadForm}
          actualPackage={packageId}
        />
      );
    };

    const loadFormList = () => {
        switchComponent(<EmployeeFormsList loggedUser={ loggedUser } switchPage={ loadPages } />);
    };

    const loadEmployeePage = function(){
        document.title = "Onboarding: konto";
        switchComponent(<EmployeeAccount loggedUser={ loggedUser } />);
    };

    const [component, switchComponent] = useState(<EmployeeFormsList loggedUser={ loggedUser } switchPage={ loadPages } />);
    
    return(
    	<>
    		<header className="app-header app-header-dark">
    			<NavbarEmployee loggedUser={ loggedUser } switchPage={ loadFormList } />{/* placeholder; */}
    		</header>
    		<LeftMenuEmployee mainPage={ loadFormList } employeePage={ loadEmployeePage }/>

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

