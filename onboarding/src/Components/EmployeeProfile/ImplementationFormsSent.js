import React, { useState } from "react";
import FormsSentTableRow from "./FormsSentTableRow";
import { remindEmployeeOfPackage } from "../hooks/EmployeeForms";


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
            forms.push(<FormsSentTableRow key={ element.id } row={ element }
                setAnswersPage={ props.setAnswersPage }
                                        employeeId={ props.employeeId }
                                        handleChecked={ showHide } handleRemind={ sendRemind } withholdPackage={ props.askForWithholdPackage } />)
        });
    } else {
        forms.push(
            <tr key={ 0 }>
                <td colSpan="5">Brak wysłanych katalogów</td>
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
                { props.isLoading && <p>Ładowanie...</p> }
                { !props.isLoading && !props.isError && (
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
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
                    </div>
                )}

            </div>
        </div>
    )
}
export default ImplementationFormsSent;

