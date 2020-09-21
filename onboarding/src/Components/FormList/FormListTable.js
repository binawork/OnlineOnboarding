import React, { useState, useEffect } from "react";
import PackagesAddNew from "./PackagesAddNew";
import PackagesRow from "./PackagesRow";
import { formDataList } from "../FormTable/FormTableData";

function getPath(){
	var url = "";
	if(!window.location.origin){
		url = window.location.protocol +"//"+ window.location.host;
	} else url = window.location.origin;

	if(url===null || !(url) || (typeof url==='string' && url=='null')) url="";
	let rrs=/\/$/.test(url);
	if(!rrs) url=url+"/";
	return url;
}

function FormListTable() {
	var [rows , setRows] = useState([]);
	let form_table= [], url = "http://localhost:8000/";// getPath();
	let fetchProps = {method:"GET", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":"", 'Access-Control-Allow-Origin':'http://localhost:8000'}};

	form_table.push(<PackagesRow row={ {name: "Loading ...", last_edit: ""} }/>);

	useEffect(() => {
		fetch(url + "api/package/", fetchProps).then(res => {console.log(res);res.json()}).then(
			(result) => {
				console.log(result);
			},
			(error) => {
				console.log(error);
			}
		);
	});

    if (formDataList) {
        formDataList.forEach(function (element) {
            form_table.push(<PackagesRow row={element}/>)
        });
    }
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
                            { form_table }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default FormListTable;

