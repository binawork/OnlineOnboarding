import React, { useState, useEffect } from "react";
import EmployeeFormsRow from "./EmployeeFormsRow";
import { getProgress } from "../../hooks/EmployeeForms";
import "../../../static/css/PackagesList.scss";
import "../../../static/css/utilities/icons.scss";

/**
 *  Prints header and table with listed packages for employee;
 * @param props - {employeeForms: Object := {packages: Array, msg: String},
 *                  switchToFormPages: function,
 *                  setPageTitle: function}
 * @returns {JSX.Element}
 * @constructor
 */
function EmployeeFormsTable({ employeeForms, setPackagesList }) {
    const [employeeFormsList, setEmployeeForms] = useState([]);
    const [message, setMessage] = useState("Ładowanie...");

    const progressCallback = (result, msg) => {
        if( !employeeForms.hasOwnProperty("packages") )
            return;
        if(typeof msg === 'string' && msg.length > 0){
            setMessage(msg);
            return;
        }

        let employeeFormsCp, i, packageId;
        employeeFormsCp = employeeForms.packages;

        for(i = employeeFormsCp.length - 1; i >= 0; i--){
            packageId = parseInt(employeeFormsCp[i].id, 10);

            if( !result.hasOwnProperty(packageId) ){
                employeeFormsCp[i].progress = "0" + employeeFormsCp[i].progress.substring(1);// "0/" + employeeFormsCp[i].pagesCount;
                continue;
            }

            employeeFormsCp[i].progress = result[packageId].finished + " " + employeeFormsCp[i].progress.substring(2);
        }

        //setEmployeeForms(employeeFormsCp);
        let employeePageCopyList = [];
        employeeFormsCp.forEach(function(element, i){
            employeePageCopyList.push(
                <EmployeeFormsRow
                    key={ i }
                    row={element}
                    // switchToFormPages={ props.switchToFormPages }
                    // setPageTitle={props.setPageTitle} 
                />
            );
        });

        setEmployeeForms(employeePageCopyList);
        setPackagesList(employeeForms.packages.map(element => {
            return { id: element.id, title: element.name };
        }));
    };

    useEffect(() => {
        if(employeeForms.hasOwnProperty("packages") && employeeForms.packages.length > 0){
            return getProgress(0, progressCallback);
        } else if(employeeForms.msg === "") {
            setMessage("Brak przypisanych wdrożeń.")
        }
    }, [employeeForms]);

    return(
        <div className="Packages page-section">
            <div className="Packages__list card-fluid">
                {employeeFormsList.length > 0 ? (
                    <div className="PackagesList__wrapper table-responsive">
                        <ul className="PackagesList table table-striped table-hover">
                            {employeeFormsList}
                        </ul>
                    </div>
                ) : <p>{message}</p>}
            </div>
        </div>
    )
}
export default EmployeeFormsTable;

