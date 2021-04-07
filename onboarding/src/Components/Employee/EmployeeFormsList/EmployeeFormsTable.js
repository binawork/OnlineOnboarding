import React, { useState, useEffect } from "react";
//import { employePageCopy } from "./EmployePageFillData";
import EmployeeFormsRow from "./EmployeeFormsRow";
import { getProgress, SingleEmployeeForms } from "../../hooks/EmployeeForms";


function EmployeeFormsTable(props) {
    const [employeeForms, setEmployeeForms] = useState([]);
    let employeePageCopyList= [], employeeForms2 = SingleEmployeeForms(0, function(){}, function(){});


    const progressCallback = (result, message) => {
        if(typeof message === 'string' && message.length > 0)
    		return;// todo: maybe inform about error;

        let employeeFormsCp, i, packageId;
        employeeFormsCp = employeeForms.length > 0 ? employeeForms : employeeForms2;

        for(i = employeeFormsCp.length - 1; i >= 0; i--){
            packageId = parseInt(employeeFormsCp[i].key, 10);

            if( !result.hasOwnProperty(packageId) ){
                employeeFormsCp[i].progress = "0" + employeeFormsCp[i].progress.substring(1);// "0/" + employeeFormsCp[i].pagesCount;
                continue;
            }

            employeeFormsCp[i].progress = result[packageId].finished + "/" + employeeFormsCp[i].progress.substring(2);
        }

        employeeForms2 = employeeFormsCp;
        setEmployeeForms(employeeFormsCp);
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
        if(employeeForms2.length > 0){
            setEmployeeForms(employeeForms2);
            return getProgress(0, progressCallback);
        }
    }, [props.loggedUser, employeeForms2]);


    return(
        <div className="page-section">
            <div className="card card-fluid">
                <div className="card-header">
                    Do zrobienia
                </div>
                <div className="card-body">
                    <table className="table table-striped table-hover">
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

