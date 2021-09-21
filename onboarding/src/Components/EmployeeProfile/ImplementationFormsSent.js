import React, { useState } from "react";
import FormsSentTableRow from "./FormsSentTableRow";
import { remindEmployeeOfPackage } from "../hooks/EmployeeForms";
import cloudIcon from "../../static/icons/cloud-checkmark.svg";

/**
 * Shows table of packages sent to employee.
 * @param props: React argument of component with properties like
 *        employeeId - an id of employee who received packages listed in this component;
 *        packages - list of packages sent to employee which are received from "api/package_pages/" together with info about progress;
 *        setAnswersPage - setter to set a page in a state of parent-parent component, when it is set then answers of page are displayed;
 *        isLoading - boolean to make this component displaying information that table is loading;
 *        isError - boolean to make this component displaying error message;
 *        showModal={ popUpConfirmationModal }
 *        askForWithholdPackage - function to show modal asking if user really wants to remove package from those sent to employee;
 *        count - number to update the state of component to display modal;
 * @returns {JSX.Element}
 * @constructor
 */
function ImplementationFormsSent(props) {
    const [numberChecked, checkedChange] = useState(0);
    let forms = [];//,
        //propsCp = {...props, specificEmployee: props.employeeId};//, form_table = props.packages;


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
            forms.push(
                <FormsSentTableRow key={ element.id } row={ element }
                    setAnswersPage={ props.setAnswersPage }
                    employeeId={ props.employeeId }
                    handleChecked={ showHide } 
                    handleRemind={ sendRemind } 
                    withholdPackage={ props.askForWithholdPackage } />)
        });
    } else {
        forms.push(
            <tr key={ 0 }>
                <td colSpan="5">Brak wysłanych katalogów</td>
            </tr>
        );
    }


    return(
        <section className="EmployeeProfileTable__section">
            <header className="EmployeeProfileTable__header">
                <img src={ cloudIcon } alt="#" />
                <h2 className="EmployeeProfileTable__title">Wysłane katalogi wdrożeniowe</h2>
            </header>
            { props.isError && <p>Wystąpił błąd podczas ładowania</p> }
            { props.isLoading && <p>Ładowanie...</p> }
            { !props.isLoading && !props.isError && (
                <div className="EmployeeProfileTable__wrapper table-responsive">
                    <table className="EmployeeProfileTable table table-striped table-hover">
                        <thead><tr>
                            <th  className="EmployeeProfileTable__head" scope="col"></th>
                            <th  className="EmployeeProfileTable__head" scope="col"></th>
                            <th  className="EmployeeProfileTable__head" scope="col"></th>
                            <th  className="EmployeeProfileTable__head" scope="col"></th>
                            <th  className="EmployeeProfileTable__head" scope="col">Wysłane</th>
                            <th  className="EmployeeProfileTable__head" scope="col">Postęp</th>
                            <th  className="EmployeeProfileTable__head" scope="col">Ukończone</th>
                            <th  className="EmployeeProfileTable__head" scope="col"></th>
                        </tr></thead>
                        <tbody>
                            { forms }
                        </tbody>
                    </table>
                </div>
            )}
            <div className="EmployeeProfileTable__button-wrapper" style={{display: numberChecked > 0 ? "" : "none"}}>
                <button className="EmployeeProfileTable__button btn">Przypomnienie o zaznaczonych</button>
            </div>
        </section>
    )
}
export default ImplementationFormsSent;

