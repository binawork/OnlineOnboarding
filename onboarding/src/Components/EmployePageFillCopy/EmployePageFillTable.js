import React from "react";
import { employePageCopy } from "./EmployePageFillData";
import EmployePageFillRow from "./EmployePageFillRow";

function EmployePageFillTable() {
    let employePageCopylist= [];
    if (employePageCopy) {
        employePageCopy.forEach(function (element) {
            employePageCopylist.push(<EmployePageFillRow row={element}/>)
        });
    }
    return(
        <div className="page-section">
            <div className="card card-fluid">
                <div className="card-header">
                    Lista Formularzy
                </div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col" style={{width: "80%"}}>List Formularzy</th>
                            <th scope="col" style={{width: "20%"}}>Progress</th>
                        </tr>
                        </thead>
                        <tbody id="form_table_data_container">
                        { employePageCopylist }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default EmployePageFillTable;