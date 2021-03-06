import React from "react";
import { employeFormDataList } from "./EmployeProfileData";
import { formsSent } from "./EmployeProfileData";
import EmployeProfileUser from "./EmployeProfileUser";
import EmployeProfileTableFirstRow from "./EmployeProfileTableFirstRow";
import EmployeProfileTableSecondRow from "./EmployeProfileTableSecondRow";

function EmployeProfileTable() {
    let form_table= [];
    if (employeFormDataList) {
        employeFormDataList.forEach(function (element) {
            form_table.push(<EmployeProfileTableFirstRow row={element}/>)
        });
    }
    let user_table =[];
    if (formsSent) {
        formsSent.forEach(function (element) {
            user_table.push(<EmployeProfileTableSecondRow row={element}/>)
        });
    }
    let employeProfile = {name: "Craig Hansen", email: "chansen@example.com", number: "624056846", position: "Software Developer", department: "Foo Bar", localization: "Lorem Ipsum", sent: 4, finished: 2}
    return(
        <div className="page-section">
            <div className="card card-fluid">
                <div className="card-header">
                    Status procesu
                </div>
                <div className="card-body">
                    <EmployeProfileUser user = { employeProfile }/>
                </div>
            </div>
            <div className="card card-fluid">
                <div className="card-header">
                    Wysłane Formularze wdrożeniowe
                </div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col" style={{width: "50%"}}>Formularze</th>
                            <th scope="col" style={{width: "10%"}}>Postęp</th>
                            <th scope="col" style={{width: "15%"}}>Data wysłania</th>
                            <th scope="col" style={{width: "15%"}}>Data zakończenia</th>
                            <th scope="col" style={{width: "15%"}}>Działanie</th>
                        </tr>
                        </thead>
                        <tbody id="form_table_data_container">
                        { user_table }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card card-fluid">
                <div className="card-header">
                    Wyślij Formularze do pracownika
                </div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col" style={{width: "50%"}}>Formularze</th>
                            <th scope="col" style={{width: "10%"}}>Liczba zadań</th>
                            <th scope="col" style={{width: "15%"}}>Utworzony</th>
                            <th scope="col" style={{width: "15%"}}>Ostatnia edycja</th>
                            <th scope="col" style={{width: "10%"}}>Działanie</th>
                        </tr>
                        </thead>
                        <tbody id="form_table_data_container">
                        { form_table }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default EmployeProfileTable;

