import React, { useState, useEffect } from "react";
//import { employePageCopy } from "./EmployePageFillData";
import EmployeeFormsRow from "./EmployeeFormsRow";
import { getProgress, SingleEmployeeForms } from "../../hooks/EmployeeForms";


function EmployeeFormsTable(props) {
    const [employeeForms, setEmployeeForms] = useState([]);
    let employeePageCopyList= [], employeeForms2 = SingleEmployeeForms(0, function(){}, function(){});


    const progressCallback = (result, message) => {

    };

    if(employeeForms.length > 0){
        employeeForms.forEach(function(element, i){
            employeePageCopyList.push(<EmployeeFormsRow key={ i } row={element} switchToFormPages={ props.switchToFormPages }
                                                        setPageTitle={props.setPageTitle} loggedUser={ props.loggedUser } />);
        });
    } else {
        employeeForms2.forEach(function(element, i){
            employeePageCopyList.push(<EmployeeFormsRow key={ i } row={element} switchToFormPages={ props.switchToFormPages }
                                                        setPageTitle={props.setPageTitle} loggedUser={ props.loggedUser } />);
        });
    }

    useEffect(() => {
        if(employeeForms2.length > 0 && props.loggedUser.id > 0){
            setEmployeeForms(employeeForms2);
            return getProgress(props.loggedUser.id, progressCallback);
        }
    }, [props.loggedUser, employeeForms2]);


    return(
        <div className="page-section">
            <div className="card card-fluid">
                <div className="card-header">
                    Do zrobienia
                </div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col" style={{width: "80%"}}>Lista zadań</th>
                            <th scope="col" style={{width: "20%"}}>Postęp</th>
                        </tr>
                        </thead>
                        <tbody id="form_table_data_container">
                        { employeePageCopyList }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default EmployeeFormsTable;

