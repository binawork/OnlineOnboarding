import React, { useState, useEffect } from "react";
import FormsSentTableRow from "./FormsSentTableRow";
import EmployeeForms, { remindEmployeeOfPackage, getProgress, datesOfSendingPackages } from "../hooks/EmployeeForms";


function ImplementationFormsSent(props) {
    const [numberChecked, checkedChange] = useState(0);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formTable, setSentPackages] = useState([]);
    let propsCp = {...props, specificEmployee: props.employeeId},
        form_table = EmployeeForms(propsCp, setError, setLoading), 
        forms = [];



    const showHide = (isChecked) => {
        if(isChecked)
            checkedChange(numberChecked + 1);
        else
            checkedChange(numberChecked - 1);
    };

    const sendRemind = function(packageId){
        remindEmployeeOfPackage(props.showModal, props.employeeId, packageId);
    };


    const progressCallback = (result, message) => {
    	if(typeof message === 'string' && message.length > 0)
    		return;// todo: maybe inform about error;

        let i, j, packageId, pId, isFinished;
        const notStartedMsg = "Nie rozpoczął", inProgressMsg = "W trakcie";
        for(i = form_table.length - 1; i >= 0; i--){
            packageId = parseInt(form_table[i].key, 10);
            form_table[i].finish_date = notStartedMsg;

            if( !result.hasOwnProperty(packageId) ){
                form_table[i].progress = "0" + form_table[i].progress.substring(1);// "0/" + form_table[i].pagesCount;
                continue;
            }

            form_table[i].progress = result[packageId].finished + "/" + form_table[i].progress.substring(2);
            form_table[i].finish_date = inProgressMsg;

            isFinished = true;
            for(j = form_table[i].pages.length - 1; j >= 0; j--){
                form_table[i].pages[j].finished = "";// notStartedMsg;

                pId = parseInt(form_table[i].pages[j].id, 10);
                if( result[packageId].pages.hasOwnProperty(pId) ){
                    if(result[packageId].pages[pId].finished){
                        form_table[i].pages[j].finished = result[packageId].pages[pId].date;
                    } else {
                        form_table[i].pages[j].finished = inProgressMsg;
                        isFinished = false;
                    }
                }
            }

            if(isFinished)
                form_table[i].finish_date = result[packageId].date;            
        }

        setSentPackages(form_table);
        datesOfSendingPackages(props.employeeId, sendDateCallback);
    };

    const sendDateCallback = function(result, message){
        if(!result && (typeof message === 'undefined' || typeof message !== 'string') )
            return;

        if(formTable.length > 0)
            form_table = formTable;

        let newFormTable = [];

        if(typeof message === 'string')
            newFormTable = form_table.map(function(element){
                    element.send_date = message;
                    return element;
                });
        else if(typeof result === 'object'){
            let packageId;
            newFormTable = form_table.map(function(element){
                    packageId = parseInt(element.key, 10);
                    if( result.hasOwnProperty(packageId) )
                        element.send_date = result[packageId];

                    return element;
                });
        }

        if(newFormTable.length > 0)
            setSentPackages(newFormTable);
    };

    useEffect(() => {
        if(!loading){
            let abortFun = getProgress(props.employeeId, progressCallback);
            return abortFun;
        }
    }, [loading]);


    if(form_table.length !== 0 || formTable.length>0) {
        if(formTable.length > 0) form_table = formTable;

        form_table.forEach(function (element, i) {
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
                            {/* <th scope="col">Działanie</th> */}
                        </tr></thead>
                        <tbody>
                            { forms }
                            {/* <tr style={{display: numberChecked>0 ? "" : "none"}}>
                                <td colSpan="5" style={{ textAlign: "end" }}><button className="btn btn-secondary">Przypomnienie o zaznaczonych</button></td>
                            </tr> */}
                        </tbody>
                    </table>
                )}

            </div>
        </div>
    )
}
export default ImplementationFormsSent;

