import React, { useState } from "react";
import FormsToSendTableRow from "./FormsToSendTableRow";
import EmployeeForms, { assignEmployeeToPackage } from "../hooks/EmployeeForms";


function ImplementationFormsToSend(props) {
    const [idsChecked, setIdsChecked] = useState([]);
    const [numberChecked, checkedChange] = useState(0);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    let form_table = EmployeeForms(props, setError, setLoading, props.count), forms = [];

    const showHide = (isChecked, packageId) => {
        if(isChecked) {
            checkedChange(numberChecked + 1);
            setIdsChecked([...idsChecked, packageId]);
        } else {
            checkedChange(numberChecked - 1);
            setIdsChecked(idsChecked.filter(id => id !== packageId));
        }
    };
    const sendPackage = function(packageId){
        assignEmployeeToPackage(props.showModal, props.userId, packageId);
        setIdsChecked(idsChecked.filter(id => id !== packageId));
        props.setCount(props.count + 1);
    };
    
    const sendCheckedPackages = (e) => {
        assignEmployeeToPackage(props.showModal, props.userId, idsChecked);
        setIdsChecked([]);
        props.setCount(props.count + 1);
    }

    const formsToSend = form_table.filter(form => !form.users.includes(props.userId));

    if(formsToSend.length !== 0) {
        formsToSend.forEach(function (element, i){
            forms.push(<FormsToSendTableRow key={ element.key } row={ element } handleChecked={ showHide } handleSendPackage={ sendPackage } />);
        });
    } else {
        forms.push(        
            <tr key={ 0 }>
                <td colSpan="5">Brak formularzy do wysłania</td>
            </tr>
        );
    }
    
    return(
        <div className="card card-fluid">
            <div className="card-header">
                <i className="bi bi-cloud-upload mr-2" style={{ fontSize: "18px" }}></i>
                Wyślij Formularze do pracownika
            </div>
            <div className="card-body">
                { error && <p>Wystąpił błąd podczas ładowania</p> }
                { loading && <p>Ładowanie...</p> }
                { !loading && !error && (
                    <table className="table table-striped">
                        <thead><tr>
                            <th scope="col">Formularze</th>
                            <th scope="col">Liczba zadań</th>
                            <th scope="col">Utworzony</th>
                            <th scope="col">Ostatnia edycja</th>
                            <th scope="col">Działanie</th>
                        </tr></thead>
                        <tbody id="form_table_data_container">
                            { forms }
                            <tr style={{display: numberChecked>0 ? "" : "none"}}>
                                <td colSpan="5" style={{ textAlign: "end" }}><button className="btn btn-secondary" onClick={ sendCheckedPackages }>Wyślij zaznaczone</button></td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
export default ImplementationFormsToSend;

