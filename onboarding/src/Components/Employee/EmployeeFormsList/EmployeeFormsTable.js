import React, { useState, useEffect } from "react";
//import { employePageCopy } from "./EmployePageFillData";
import EmployeeFormsRow from "./EmployeeFormsRow";
import { getProgress } from "../../hooks/EmployeeForms";


/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function EmployeeFormsTable(props) {
    const [employeeForms, setEmployeeForms] = useState([]);
    const [message, setMessage] = useState("Ładowanie...");


    const progressCallback = (result, msg) => {
        if( !props.employeeForms.hasOwnProperty("packages") )
            return;
        if(typeof msg === 'string' && msg.length > 0){
            setMessage(msg);
    		return;
        }

        let employeeFormsCp, i, packageId;
        employeeFormsCp = props.employeeForms.packages;

        for(i = employeeFormsCp.length - 1; i >= 0; i--){
            packageId = parseInt(employeeFormsCp[i].key, 10);

            if( !result.hasOwnProperty(packageId) ){
                employeeFormsCp[i].progress = "0" + employeeFormsCp[i].progress.substring(1);// "0/" + employeeFormsCp[i].pagesCount;
                continue;
            }

            employeeFormsCp[i].progress = result[packageId].finished + " " + employeeFormsCp[i].progress.substring(2);
        }

        //setEmployeeForms(employeeFormsCp);
        let employeePageCopyList = [];
        employeeFormsCp.forEach(function(element, i){
            employeePageCopyList.push(<EmployeeFormsRow key={ i } row={element} switchToFormPages={ props.switchToFormPages }
                                                        setPageTitle={props.setPageTitle} loggedUser={ props.loggedUser } />);
        });
        setEmployeeForms(employeePageCopyList);
    };


    useEffect(() => {
        if(props.employeeForms.hasOwnProperty("packages") && props.employeeForms.packages.length > 0){
            return getProgress(0, progressCallback);
        }
    }, [props.employeeForms]);


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
                        { employeeForms.length > 0 ? (
                            employeeForms
                        ) : <tr><td>{ message }</td><td /></tr> }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default EmployeeFormsTable;

