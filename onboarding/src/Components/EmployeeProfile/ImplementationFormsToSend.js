import React, { useState } from "react";
import FormsToSendTableRow from "./FormsToSendTableRow";
import EmployeeForms, { assignEmployeeToPackage } from "../hooks/EmployeeForms";


function ImplementationFormsToSend(props) {
    const [numberChecked, checkedChange] = useState(0);
    let form_table = EmployeeForms(props, props.count), forms = [];

    const showHide = (isChecked) => {
        if(isChecked)
            checkedChange(numberChecked + 1);
        else
            checkedChange(numberChecked - 1);
    };

    const sendPackage = function(packageId){
        assignEmployeeToPackage(props.showModal, props.userId, packageId);
        props.setCount(props.count + 1);
    };

    const formsToSend = form_table.filter(form => !form.users.includes(props.userId));
    if(formsToSend.length !== 0) {
        formsToSend.forEach(function (element, i){
            forms.push(<FormsToSendTableRow key={ element.key } row={ element } handleChecked={ showHide } handleSendPackage={ sendPackage } />);
        });
    } else {
        forms.push(        
            <tr key={ 0 }>
                <td style={{ columnSpan: 7 }}>Brak formularzy do wysłania</td>
            </tr>
        );
    }
    /*console.log(forms)
    console.log(form_table)*/

    return(
        <div className="card card-fluid">
            <div className="card-header">
                <i className="bi bi-cloud-upload mr-2" style={{ fontSize: "18px" }}></i>
                Wyślij Formularze do pracownika
            </div>
            <div className="card-body">
                <table className="table table-striped">
                    <thead><tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col">Formularze</th>
                        <th scope="col">Liczba zadań</th>
                        <th scope="col">Utworzony</th>
                        <th scope="col">Ostatnia edycja</th>
                        <th scope="col">Działanie</th>
                    </tr></thead>
                    <tbody id="form_table_data_container">
                        { forms }
                        <tr style={{display: numberChecked>0 ? "" : "none"}}>
                            <td></td>
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

