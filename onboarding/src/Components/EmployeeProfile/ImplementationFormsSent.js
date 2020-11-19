import React, { useState } from "react";
import FormsSentTableRow from "./FormsSentTableRow";
import EmployeeForms, { remindEmployeeOfPackage } from "../hooks/EmployeeForms";


function ImplementationFormsSent(props) {
    const [numberChecked, checkedChange] = useState(0);
    let user_table = EmployeeForms(props), forms = [];

    const showHide = (isChecked) => {
        if(isChecked)
            checkedChange(numberChecked + 1);
        else
            checkedChange(numberChecked - 1);
    };

	const sendRemind = function(packageId){
		remindEmployeeOfPackage(props.showModal, props.userId, packageId);
	};

    user_table.forEach(function (element, i) {
        forms.push(<FormsSentTableRow key={ i } row={element} handleChecked={ showHide } handleRemind={ sendRemind } />)
    });

    return(
        <div className="card card-fluid">
            <div className="card-header"> Wysłane Formularze wdrożeniowe </div>
            <div className="card-body">
                <table className="table table-striped">
                    <thead><tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col">Formularze</th>
                        <th scope="col">Postęp</th>
                        <th scope="col">Data wysłania</th>
                        <th scope="col">Data zakończenia</th>
                        <th scope="col">Działanie</th>
                    </tr></thead>
                    <tbody>
                        { forms }
                        <tr style={{display: numberChecked>0 ? "" : "none"}}>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td colSpan={2}><button className="btn btn-secondary">Przypomnienie o zaznaczonych</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ImplementationFormsSent;

