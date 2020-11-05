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
                        <th scope="col" style={{width: "45%"}}>Formularze</th>
                        <th scope="col" style={{width: "10%"}}>Liczba zadań</th>
                        <th scope="col" style={{width: "15%"}}>Utworzony</th>
                        <th scope="col" style={{width: "15%"}}>Ostatnia edycja</th>
                        <th scope="col" style={{width: "10%"}}>Działanie</th>
                    </tr></thead>
                    <tbody id="form_table_data_container">
                        { forms }
                        <tr>
                            <td></td>
                            <td style={{width: "45%"}}></td>
                            <td style={{width: "10%"}}></td>
                            <td style={{width: "15%"}}></td>
                            <td style={{width: "15%"}}></td>
                            <td style={{width: "15%"}}><button className="btn btn-secondary">Wyślij zaznaczone</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ImplementationFormsToSend;

