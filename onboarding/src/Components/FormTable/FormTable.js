import React from "react";
import FormTableSearch from "./FormTableSearch";
import FormTableAddNew from "./FormTableAddNew";
import FormTableRow from "./FormTableRow";
import { formDataList } from "./FormTableData";

function FormTable() {
    let form_table= [];
    if (formDataList) {
        formDataList.forEach(function (element) {
            form_table.push(<FormTableRow row={element}/>)
        });
    }
    return(
        <div className="page-section">
            <div className="card card-fluid">
                <div className="card-header">
                    Lorem Ipsum
                </div>
                <div className="card-body">
                    <FormTableSearch />
                </div>
            </div>
            <div className="card card-fluid">
                <div className="card-header">
                    Lorem Ipsum
                </div>
                <div className="card-body">
                    <FormTableAddNew />
                </div>
            </div>
            <div className="card card-fluid">
                <div className="card-header">
                    Lista Formularzy
                </div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col" style={{width: "50%"}}>Nazwa formularza</th>
                            <th scope="col" style={{width: "10%"}}>Kolejność</th>
                            <th scope="col" style={{width: "25%"}}>Edytowany</th>
                            <th scope="col" style={{width: "15%"}}>Działanie</th>
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
export default FormTable;
