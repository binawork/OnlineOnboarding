import React from "react";
//import { employeeFormDataList } from "./EmployeeProfileData";
import FormsToSendTableRow from "./FormsToSendTableRow";
import EmployeeForms from "../hooks/EmployeeForms";


function ImplementationFormsToSend(props) {
    let form_table = EmployeeForms(props), forms = [];

    form_table.forEach(function (element, i) {
        forms.push(<FormsToSendTableRow key={ i } row={element} />)
    });

    return(
        <div className="card card-fluid">
            <div className="card-header">
                Wyślij Formularze do pracownika
            </div>
            <div className="card-body">
                <table className="table table-striped">
                    <thead><tr>
                        <th scope="col"></th>
                        <th scope="col">Formularze</th>
                        <th scope="col">Liczba zadań</th>
                        <th scope="col">Utworzony</th>
                        <th scope="col">Ostatnia edycja</th>
                        <th scope="col">Działanie</th>
                    </tr></thead>
                    <tbody id="form_table_data_container">
                        { forms }
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><button className="btn btn-secondary">Wyślij zaznaczone</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ImplementationFormsToSend;

