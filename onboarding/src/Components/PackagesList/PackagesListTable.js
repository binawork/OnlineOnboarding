import React, { useState/*, useEffect*/ } from "react";
import PackagesAddNew from "./PackagesAddNew";
//import PackagesRow from "./PackagesRow";
//import { formDataList } from "../FormTable/FormTableData";
//import { getPath } from "../utils.js";
import Packages from "../hooks/Packages";
import LoggedUser from "../hooks/LoggedUser.js";

function PackagesListTable(props) {
    const [countUpdate, update] = useState(0);
    //let packages = <Packages count = countUpdate />;
    let loggedUser = (props.loggedUser)?props.loggedUser:LoggedUser();

    var updatePackages = function(){
    	update(countUpdate + 1);
        //packages = Packages(countUpdate);
    }

    return (
        <div className="page-section">
            <div className="card card-fluid">
                <div className="card-header">
                    Dodanie nowego dokumentu
                </div>
                <div className="card-body">
                    <PackagesAddNew handleUpdate = { updatePackages } />
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
                            <Packages count = { countUpdate } handleUpdate = { updatePackages } loggedUser={ loggedUser } />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default PackagesListTable;

