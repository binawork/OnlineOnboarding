import React/*, { useState, useEffect }*/ from "react";
import PackagesAddNew from "./PackagesAddNew";
//import PackagesRow from "./PackagesRow";
//import { formDataList } from "../FormTable/FormTableData";
//import { getPath } from "../utils.js";
import Packages from "../hooks/Packages";

function FormListTable() {

	let packages = Packages();

    return (
        <div className="page-section">
            <div className="card card-fluid">
                <div className="card-header">
                    Dodanie nowego dokumentu
                </div>
                <div className="card-body">
                    <PackagesAddNew />
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
                            <th scope="col" style={{width: "50%"}}>Nazwa</th>{/* sortowanie po * */}
                            <th scope="col" style={{width: "25%"}}>Edytowany</th>
                            <th scope="col" style={{width: "15%"}}>Działanie</th>
                        </tr>
                        </thead>
                        <tbody id="form_table_data_container">
                            { packages }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default FormListTable;

