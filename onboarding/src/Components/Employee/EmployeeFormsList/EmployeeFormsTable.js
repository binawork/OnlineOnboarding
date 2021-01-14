import React from "react";
//import { employePageCopy } from "./EmployePageFillData";
import EmployeeFormsRow from "./EmployeeFormsRow";
import { SingleEmployeeForms } from "../../hooks/EmployeeForms";


function EmployeeFormsTable(props) {
    let employeePageCopylist= [], employeeForms = SingleEmployeeForms({count: 0});

    //console.log(employeeForms);
    /*if (employePageCopy) {
        employePageCopy.forEach(function (element, i) {
            employeePageCopylist.push(<EmployeeFormsRow key={ i } row={element} switchToForm={ props.switchToForm } />)
        });
    }*/

    employeeForms.forEach(function(element, i){
        employeePageCopylist.push(<EmployeeFormsRow key={ i } row={element} switchToFormPages={ props.switchToFormPages }
                                                    setPageTitle={props.setPageTitle} loggedUser={ props.loggedUser } />);
    });


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
                        { employeePageCopylist }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default EmployeeFormsTable;

