import React, { useState } from "react";
import EmployeeFormsTable from "./EmployeeFormsTable";
import { SingleEmployeeForms } from "../../hooks/EmployeeForms";
import "../../../static/css/Dashboard.scss";

function EmployeeFormsList({ setPackagesList }) {
    const [isError, setError] = useState(false);
    const employeeForms = SingleEmployeeForms(0, setError, function(){});

    return(
        <div className="Dashboard page-inner">
            <p className="pl-2">Lista wdrożeń</p>
            <EmployeeFormsTable
                employeeForms={ employeeForms }
                setPackagesList={ setPackagesList } />
        </div>
    )
}

export default EmployeeFormsList;
