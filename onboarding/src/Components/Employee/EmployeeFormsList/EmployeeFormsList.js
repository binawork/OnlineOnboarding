import React, { useState } from "react";
import EmployeeFormsTable from "./EmployeeFormsTable";
import { SingleEmployeeForms } from "../../hooks/EmployeeForms";
import PageAddressBar from "../../PageAddressBar";

function EmployeeFormsList({ setPackagesList }) {
    const [isError, setError] = useState(false);
    const employeeForms = SingleEmployeeForms(0, setError, function(){});

    return(
        <div className="page-inner">
            <PageAddressBar page="" />
            <EmployeeFormsTable
                employeeForms={ employeeForms }
                setPackagesList={ setPackagesList } />
        </div>
    )
}

export default EmployeeFormsList;
