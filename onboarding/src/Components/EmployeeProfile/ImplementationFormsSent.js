import React, { useState } from "react";
import FormsSentTableRow from "./FormsSentTableRow";
import EmployeeForms, { remindEmployeeOfPackage } from "../hooks/EmployeeForms";


function ImplementationFormsSent(props) {
    const [numberChecked, checkedChange] = useState(0);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    let propsCp = {...props, specificEmployee: props.employeeId},
        user_table = EmployeeForms(propsCp, setError, setLoading), forms = [];

    const showHide = (isChecked) => {
        if(isChecked)
            checkedChange(numberChecked + 1);
        else
            checkedChange(numberChecked - 1);
    };

	const sendRemind = function(packageId){
		remindEmployeeOfPackage(props.showModal, props.employeeId, packageId);
	};

    if(user_table.length !== 0) {
        user_table.forEach(function (element, i) {
            forms.push(<FormsSentTableRow key={ element.key } row={ element }
                setAnswersPage={ props.setAnswersPage }
                                        employeeId={ props.employeeId }
                                        handleChecked={ showHide } handleRemind={ sendRemind } />)
        });
    } else {
        forms.push(        
            <tr key={ 0 }>
                <td colSpan="5">Brak wysłanych formularzy</td>
            </tr>
        );
    }

    return(
        <div className="card card-fluid">
            <div className="card-header">
                <i className="bi bi-cloud-check mr-2" style={{ fontSize: "18px" }}></i> Wysłane katalogi wdrożeniowe
            </div>
            <div className="card-body">
                { error && <p>Wystąpił błąd podczas ładowania</p> }
                { loading && <p>Ładowanie...</p> }
                { !loading && !error && (
                    <table className="table table-striped">
                        <thead><tr>
                            <th scope="col">Katalog</th>
                            <th scope="col">Postęp</th>
                            <th scope="col">Data wysłania</th>
                            <th scope="col">Data zakończenia</th>
                            <th scope="col">Działanie</th>
                        </tr></thead>
                        <tbody>
                            { forms }
                            <tr style={{display: numberChecked>0 ? "" : "none"}}>
                                <td colSpan="5" style={{ textAlign: "end" }}><button className="btn btn-secondary">Przypomnienie o zaznaczonych</button></td>
                            </tr>
                        </tbody>
                    </table>
                )}

            </div>
        </div>
    )
}
export default ImplementationFormsSent;

