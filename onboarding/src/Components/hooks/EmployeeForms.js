import React, { useState, useEffect } from "react";
import { getPath, getCookie, dateToString } from "../utils.js";


/**
 * Get packages or pages when ProcessPreviewTables component is loaded;
 */
function EmployeeForms(props){
	var [rows , setRows] = useState([]),
		[loaded, isLoaded] = useState(false);
	const [error, showError] = useState(null);
	let url = getPath(),
		fetchProps = {method:"GET", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":""}};

	useEffect(() => {
		fetch(url + "api/package_pages/list_by_company_hr", fetchProps).then(res => res.json()).then(
			(result) => {
				isLoaded(true);
				setRows(result);
			},
			(error) => {
				console.log(error);
				showError(error);
			}
		);
	}, [props.count]);

	const rowModel = {key: 0, name: "", pagesCount: "",  created: "", last_edit: "", form: "", progress: "", send_date: "", finish_date: "", pages: []};

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
		let i, j, row;//, loggedUser = {id:0, first_name: ""};

		/*if(props.loggedUser)
			loggedUser = props.loggedUser;*/

		for(i = 0; i < count; i++){
			row = {...rowModel};
			row.key = rows[i].id;
			row.name = row.form = rows[i].title;
			row.progress = "?/?";
			row.send_date = row.finish_date = "?";
			row.pagesCount = 0;
			row.created = dateToString(rows[i].created_on);
			row.last_edit = dateToString(rows[i].updated_on);
			if( Object.prototype.toString.call(rows[i].page_set)==='[object Array]' ){ // Array.isArray(object)
				row.pages = rows[i].page_set.slice();
				row.pagesCount = row.pages.length;

				for(j = row.pagesCount - 1; j >= 0; j--){
					if(row.pages[j].hasOwnProperty('updated_on') )
						row.pages[j].updated_on = dateToString(row.pages[j].updated_on);
				}
			}

			form_table.push(row);
		}

		return form_table;
	}

}


export function remindEmployeeOfPackage(handleSuccess, employeeId, packageId){
  let url = getPath(), token = getCookie("csrftoken"), fullPath = url + "email/reminder/"+employeeId+"/"+packageId+"/",
      fetchProps = {method:"POST", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken": token}};

  fetch(fullPath, fetchProps).then(res => tryFetchJson(res))
    .then(
      (result) => {
        handleSuccess(result);
      },
      (error) => {
        handleSuccess(error.message);
      }
    );
}

export default EmployeeForms;

