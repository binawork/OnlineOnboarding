import React from "react";
//import { formsSent } from "./EmployeeProfileData";
import EmployeeProfileTableSecondRow from "./EmployeeProfileTableSecondRow";
import EmployeeForms from "../hooks/EmployeeForms";


function ImplementationFormsSent(props) {
    let user_table = EmployeeForms(props), forms = [];

    user_table.forEach(function (element, i) {
        forms.push(<EmployeeProfileTableSecondRow key={ i } row={element} />)
    });

    return(
        <div className="card card-fluid">
            <div className="card-header"> Wysłane Formularze wdrożeniowe </div>
            <div className="card-body">
                <table className="table table-striped">
                    <thead><tr>
                        <th scope="col"></th>
                        <th scope="col">Formularze</th>
                        <th scope="col">Postęp</th>
                        <th scope="col">Data wysłania</th>
                        <th scope="col">Data zakończenia</th>
                        <th scope="col">Działanie</th>
                    </tr></thead>
                    <tbody id="form_table_data_container">
                        { forms }
                        <tr>
                            <td scope="col"></td>
                            <td scope="col"></td>
                            <td scope="col"></td>
                            <td scope="col"></td>
                            <td scope="col" colSpan={2}><button className="btn btn-secondary">Przypomnienie o zaznaczonych</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ImplementationFormsSent;

