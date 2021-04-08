import React, { useState } from "react";
import FormsToSendTableRow from "./FormsToSendTableRow";
import { assignEmployeeToPackage/*, EmployeeFormsList*/ } from "../hooks/EmployeeForms";


function ImplementationFormsToSend(props) {
    const [idsChecked, setIdsChecked] = useState([]);
    const [numberChecked, checkedChange] = useState(0);
    let forms = [];//, form_table = props.packages/ /EmployeeFormsList(props, setError, setLoading, props.count);

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
        assignEmployeeToPackage(props.showModal, props.employeeId, packageId);
        setIdsChecked(idsChecked.filter(id => id !== packageId));
        props.setCount(props.count + 1);
    };
    
    const sendCheckedPackages = (e) => {
        assignEmployeeToPackage(props.showModal, props.employeeId, idsChecked);
        setIdsChecked([]);
        checkedChange(0);
        props.setCount(props.count + 1);
    }

    const formsToSend = props.packages;//.filter(form => !form.users.includes(props.employeeId));

    if(formsToSend.length !== 0) {
        formsToSend.forEach(function (element, i){
            forms.push(<FormsToSendTableRow key={ element.key } row={ element } handleChecked={ showHide } handleSendPackage={ sendPackage } />);
        });
    } else {
        forms.push(        
            <tr key={ 0 }>
                <td colSpan="5">Brak katalogów do wysłania</td>
            </tr>
        );
    }


    return(
        <div className="card card-fluid">
            <div className="card-header">
                <i className="bi bi-cloud-upload mr-2" style={{fontSize: "18px"}}/>
                Wyślij katalog do pracownika
            </div>
            <div className="card-body">
                { props.isError && <p>Wystąpił błąd podczas ładowania</p> }
                { props.isLoading && <p>Ładowanie...</p> }
                { !props.isLoading && !props.isError && (
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead><tr>
                                <th scope="col">Katalog</th>
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
                    </div>
                )}
            </div>
        </div>
    )
}
export default ImplementationFormsToSend;

