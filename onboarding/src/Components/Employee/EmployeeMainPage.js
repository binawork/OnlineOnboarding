import React, { useState } from "react";

import NavbarEmployee from "./NavbarEmployee.js";
import ModeButton from "../ModeButton";
import LeftMenuEmployee from "./LeftMenuEmployee";
import LoggedUser from "../hooks/LoggedUser.js";
import EmployeeFormsList from "./EmployeeFormsList/EmployeeFormsList";
import EmployeeForm from "./EmployeeForm";


function EmployeeMainPage() {
//    const [component, switchComponent] = useState(<EmployeeFormsList loggedUser={ loggedUser } switchPage={ loadForm } />);
    let loggedUser = LoggedUser();

    const loadForm = () => {
        switchComponent(<EmployeeForm />);
    };

    const loadFormList = () => {
        switchComponent(<EmployeeFormsList loggedUser={ loggedUser } switchPage={ loadForm } />);
    };

    const loadEmployeePage = function(){
        switchComponent(<EmployeeFormsList loggedUser={ loggedUser } switchPage={ loadForm } />);
    };

    const [component, switchComponent] = useState(<EmployeeFormsList loggedUser={ loggedUser } switchPage={ loadForm } />);


    return(
    	<>
    		<header className="app-header app-header-dark">
    			<NavbarEmployee loggedUser={ loggedUser } switchPage={ loadFormList } />{/* placeholder; */}
    		</header>
    		<LeftMenuEmployee mainPage={ loadFormList } employeePage={ loadFormList }/>

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

