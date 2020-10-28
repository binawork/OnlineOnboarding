import React from "react";
import { employeeFormDataList } from "./EmployeeProfileData";
import { formsSent } from "./EmployeeProfileData";
import EmployeeProfileTableFirstRow from "./EmployeeProfileTableFirstRow";
import EmployeeProfileTableSecondRow from "./EmployeeProfileTableSecondRow";


function EmployeeProfileTable(props) {

    let form_table= [];
    if (employeeFormDataList) {
        employeeFormDataList.forEach(function (element, i) {
            form_table.push(<EmployeeProfileTableFirstRow key={ i } row={element}/>)
        });
    }
    let user_table =[];
    if (formsSent) {
        formsSent.forEach(function (element, i) {
            user_table.push(<EmployeeProfileTableSecondRow key={ i } row={element}/>)
        });
    }

    return(
            <><div className="card card-fluid">
                <div className="card-header">
                    Wysłane Formularze wdrożeniowe
                </div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col" style={{width: "45%"}}>Formularze</th>
                            <th scope="col" style={{width: "10%"}}>Postęp</th>
                            <th scope="col" style={{width: "15%"}}>Data wysłania</th>
                            <th scope="col" style={{width: "15%"}}>Data zakończenia</th>
                            <th scope="col" style={{width: "15%"}}>Działanie</th>
                        </tr>
                        </thead>
                        <tbody id="form_table_data_container">
                        { user_table }
                        <tr>
                            <th scope="col"></th>
                            <th scope="col" style={{width: "45%"}}></th>
                            <th scope="col" style={{width: "10%"}}></th>
                            <th scope="col" style={{width: "15%"}}></th>
                            <th scope="col" style={{width: "15%"}}></th>
                            <th scope="col" style={{width: "15%"}}><button className="btn btn-secondary">Przypomnienie</button></th>
                        </tr>
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
                            <th scope="col"></th>
                            <th scope="col" style={{width: "45%"}}>Formularze</th>
                            <th scope="col" style={{width: "10%"}}>Liczba zadań</th>
                            <th scope="col" style={{width: "15%"}}>Utworzony</th>
                            <th scope="col" style={{width: "15%"}}>Ostatnia edycja</th>
                            <th scope="col" style={{width: "10%"}}>Działanie</th>
                        </tr>
                        </thead>
                        <tbody id="form_table_data_container">
                        { form_table }
                        <tr>
                            <th scope="col"></th>
                            <th scope="col" style={{width: "45%"}}></th>
                            <th scope="col" style={{width: "10%"}}></th>
                            <th scope="col" style={{width: "15%"}}></th>
                            <th scope="col" style={{width: "15%"}}></th>
                            <th scope="col" style={{width: "15%"}}><button className="btn btn-secondary">Wyślij</button></th>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div></>
    )
}
export default EmployeeProfileTable;

