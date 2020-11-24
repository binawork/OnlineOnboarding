import React, { useState } from "react";

import NavbarEmployee from "./NavbarEmployee.js";
import ModeButton from "../ModeButton";
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

    const [component, switchComponent] = useState(<EmployeeFormsList loggedUser={ loggedUser } switchPage={ loadForm } />);

    return(
    	<>
    		<header className="app-header app-header-dark">
    			<NavbarEmployee switchPage={ loadFormList } />{/* placeholder; */}
    		</header>

    		<aside className="app-aside app-aside-expand-md app-aside-light"></aside>

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

