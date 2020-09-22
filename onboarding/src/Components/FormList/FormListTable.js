import React/*, { useState, useEffect }*/ from "react";
import PackagesAddNew from "./PackagesAddNew";
//import PackagesRow from "./PackagesRow";
//import { formDataList } from "../FormTable/FormTableData";
//import { getPath } from "../utils.js";
import Packages from "../hooks/Packages";

function FormListTable() {
	/*var [rows , setRows] = useState([]),
		[loaded, isLoaded] = useState(false);
	let form_table= [], url = getPath();
	let fetchProps = {method:"GET", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":""}};

	/*useEffect(() => {
		fetch(url + "api/package/", fetchProps).then(res => res.json()).then(
			(result) => {
				isLoaded(true);
				setRows(result);
			},
			(error) => {
				console.log(error);
			}
		);
	}, []);

    if(!loaded){
		form_table.push(<PackagesRow key={0} row={ {name: "Loading ...", last_edit: ""} }/>);
    } else {
        rows.forEach(function (element) {
            form_table.push(<PackagesRow key = { element.id } row={ {name: element['title'], last_edit:element['updated_on']} }/>)
        });
    }*/
    return(
        <div className="page-section">
            <div className="card card-fluid">
                <div className="card-header">
                    Lorem Ipsum
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
                            <th scope="col" style={{width: "50%"}}>Package Name</th>
                            <th scope="col" style={{width: "25%"}}>Last Edit</th>
                            <th scope="col" style={{width: "15%"}}>Action</th>
                        </tr>
                        </thead>
                        <tbody id="form_table_data_container">
                            { <Packages /> }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default FormListTable;

