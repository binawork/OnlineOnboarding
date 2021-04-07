import React, { useState } from "react";
import EmployeeFormsTable from "./EmployeeFormsTable";
import LoggedUser from "../../hooks/LoggedUser";
import { SingleEmployeeForms } from "../../hooks/EmployeeForms";


function EmployeeFormsList(props) {
    const [isError, setError] = useState(false);
    /*const [loggedUser, setLoggedUser] = useState({id: 0, email: "", first_name: "", last_name: "",
    							phone_number: "", location: "", team: "",
    							job_position: "",last_login: "", avatar: ""});*/
    const employeeForms = SingleEmployeeForms(0, setError, function(){});
    let loggedUser;
    if(props.loggedUser){
        loggedUser = props.loggedUser;
    } else
        loggedUser = LoggedUser();


    const switchToFormPages = (packageId) => {
        props.switchPage(packageId, loggedUser.id);
    };

    return(
        <div className="page">
            <div className="page-inner">
                <EmployeeFormsTable loggedUser={ loggedUser } employeeForms={ employeeForms }
                                    switchToFormPages={ switchToFormPages } setPageTitle={props.setPageTitle} />
            </div>
        </div>
    )
}

export default EmployeeFormsList;

