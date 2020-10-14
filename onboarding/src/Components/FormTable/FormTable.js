import React, { useState, useRef } from "react";
import FormPackageEdit from "./FormPackageEdit";
import FormTableAddNew from "./FormTableAddNew";
import FormTableRow from "./FormTableRow";
import { formDataList } from "./FormTableData";
import PackagePage, { OnePackageEdit } from "../hooks/PackagePage";

function FormTable(props) {
    const [countUpdate, update] = useState(0),
    order = useRef(0);
    //let packages = <Packages count = countUpdate />;

    var updatePackages = function(){
    	update(countUpdate + 1);
        //packages = Packages(countUpdate);
    }

    const updateOrder = (nr) => {
        if(nr > order.current)
            order.current = nr;
    }

    const getOrder = () => order.current;

    return(
        <div className="page-section">
            <div className="card card-fluid">
                <div className="card-header">
                    Edytuj formularz
                </div>
                <div className="card-body">
                    <OnePackageEdit packageId = { props.packageId } />
                </div>
            </div>
            <div className="card card-fluid">
                <div className="card-header">
                    Stwórz strone
                </div>
                <div className="card-body">
                    <FormTableAddNew id = { props.packageId } handleUpdate = { updatePackages } getOrder={ getOrder } />
                </div>
            </div>
            <div className="card card-fluid">
                <div className="card-header">
                    Lista Stron
                </div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col" style={{width: "50%"}}>Nazwa strony</th>
                            <th scope="col" style={{width: "10%"}}>Kolejność</th>
                            <th scope="col" style={{width: "25%"}}>Edytowany</th>
                            <th scope="col" style={{width: "15%"}}>Działanie</th>
                        </tr>
                        </thead>
                        <tbody id="form_table_data_container">
                            <PackagePage id = { props.packageId } count={ countUpdate } handleUpdate={ updatePackages } updateOrder={ updateOrder } />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default FormTable;

