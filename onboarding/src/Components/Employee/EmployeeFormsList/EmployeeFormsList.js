import React/*, { useState, useEffect }*/ from "react";
import EmployeeFormsTable from "./EmployeeFormsTable";
import LoggedUser from "../../hooks/LoggedUser";


function EmployeeFormsList(props) {
    /*const [loggedUser, setLoggedUser] = useState({id: 0, email: "", first_name: "", last_name: "",
    							phone_number: "", location: "", team: "",
    							job_position: "",last_login: "", avatar: ""});*/
    let loggedUser;
    if(props.loggedUser){
        loggedUser = props.loggedUser;
    } else
        loggedUser = LoggedUser();


    const switchToFormPages = (packageId) => {
        props.switchPage(packageId);
    };

    return(
        <div className="page">
            <div className="page-inner">
                <EmployeeFormsTable loggedUser={ loggedUser } switchToFormPages={ switchToFormPages } setPageTitle={props.setPageTitle} />
            </div>
        </div>
    )
}

export default EmployeeFormsList;

