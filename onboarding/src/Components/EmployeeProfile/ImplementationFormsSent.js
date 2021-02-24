import React, { useState, useEffect } from "react";
import FormsSentTableRow from "./FormsSentTableRow";
import { /*EmployeeFormsList, getProgress,*/ remindEmployeeOfPackage } from "../hooks/EmployeeForms";


function ImplementationFormsSent(props) {
    const [numberChecked, checkedChange] = useState(0);
    let forms = [];//,
        //propsCp = {...props, specificEmployee: props.employeeId};//, form_table = props.packages/*EmployeeFormsList(propsCp, setError, setLoading, props.count);


    const showHide = (isChecked) => {
        if(isChecked)
            checkedChange(numberChecked + 1);
        else
            checkedChange(numberChecked - 1);
    };

    const sendRemind = function(packageId){
        remindEmployeeOfPackage(props.showModal, props.employeeId, packageId);
    };


    if(props.packages.length !== 0 /*|| formTable.length>0*/) {
        //if(formTable.length > 0) form_table = formTable;
        props.packages.forEach(function (element, i) {
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
                <i className="bi bi-cloud-check mr-2" style={{fontSize: "18px"}}/> Wysłane katalogi wdrożeniowe
            </div>
            <div className="card-body">
                { props.isError && <p>Wystąpił błąd podczas ładowania</p> }
                { !props.isError && (
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

