import React, { useState, useEffect } from "react";
import { getPath, getCookie } from "../utils.js";
//import FormTableRow from "../FormTable/FormTableRow";
//import FormPackageEdit from "../FormTable/FormPackageEdit";

/**
 * Get pages for package with defined id from Onboarding API when FormTable component is loaded;
 */
function EmployeeForms(props){
	var [rows , setRows] = useState([]),
		[loaded, isLoaded] = useState(false);
	const [error, showError] = useState(null);
	let url = getPath(),
		fetchProps = {method:"GET", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":""}};

	useEffect(() => {
		fetch(url + "api/page/", fetchProps).then(res => res.json()).then(
			(result) => {
				isLoaded(true);
				setRows(result);
			},
			(error) => {
				console.log(error);
			}
		);
	}, [props.count]);

	const rowModel = {key: 0, name: "", pages: "",  created: "", last_edit: "", form: "", progress: "", send_date: "", finish_date: ""};

	if(error){
		rowModel.name = error.message;
		rowModel.empty = true;
		let form_table = [];
		form_table.push(rowModel);
		return form_table;
	} else if(!loaded){
		rowModel.name = "Ładowanie ...";
		rowModel.empty = true;
		let form_table = [];
		form_table.push(rowModel);
		return form_table;
	} else {
		var form_table = [], count = rows.length;
		let i, row;//, loggedUser = {id:0, first_name: ""};

		/*if(props.loggedUser)
			loggedUser = props.loggedUser;*/

		for(i = 0; i < count; i++){
			row = {...rowModel};
			row.key = rows[i].id;
			row.name = row.form = rows[i].title;
			row.progress = "?/?";
			row.pages = row.created = row.last_edit = row.send_date = row.finish_date = "?";

			form_table.push(row);
		}

		return form_table;
	}

}

export default EmployeeForms;

