import React, { useState } from "react";
import FormsToSendTableRow from "./FormsToSendTableRow";
import { assignEmployeeToPackage } from "../hooks/EmployeeForms";
import cloudIcon from "../../static/icons/cloud-arrow-up.svg";

function ImplementationFormsToSend(props) {
    const [idsChecked, setIdsChecked] = useState([]);
    const [numberChecked, checkedChange] = useState(0);
    let forms = [];//, form_table = props.packages;

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
            forms.push(<FormsToSendTableRow key={ element.id } row={ element } handleChecked={ showHide } handleSendPackage={ sendPackage } />);
        });
    } else {
        forms.push(        
            <tr key={ 0 }>
                <td colSpan="5">Brak katalogów do wysłania</td>
            </tr>
        );
    }


    return(
        <section className="EmployeeProfileTable__section">
            <header className="EmployeeProfileTable__header">
                <img src={ cloudIcon } alt="#" />
                <h2 className="EmployeeProfileTable__title">Wyślij katalog do pracownika</h2>
            </header>
            { props.isError && <p>Wystąpił błąd podczas ładowania</p> }
            { props.isLoading && <p>Ładowanie...</p> }
            { !props.isLoading && !props.isError && (
                <div className="EmployeeProfileTable__wrapper table-responsive">
                    <table className="EmployeeProfileTable table table-striped table-hover">
                        <thead><tr>
                            <th className="EmployeeProfileTable__head" scope="col"></th>
                            <th className="EmployeeProfileTable__head" scope="col"></th>
                            <th className="EmployeeProfileTable__head" scope="col"></th>
                            <th className="EmployeeProfileTable__head" scope="col"></th>
                            <th className="EmployeeProfileTable__head" scope="col">Utworzony</th>
                            <th className="EmployeeProfileTable__head" scope="col">Liczba zadań</th>
                            <th className="EmployeeProfileTable__head" scope="col">Ostatnia edycja</th>
                            <th className="EmployeeProfileTable__head" scope="col"></th>
                        </tr></thead>
                        <tbody id="form_table_data_container">
                            { forms }
                        </tbody>
                    </table>
                </div>
            )}
            <div className="EmployeeProfileTable__button-wrapper" style={{display: numberChecked > 0 ? "" : "none"}}>
                <button className="EmployeeProfileTable__button btn" onClick={ sendCheckedPackages }>Wyślij zaznaczone</button>
            </div>
        </section>
    )
}
export default ImplementationFormsToSend;

