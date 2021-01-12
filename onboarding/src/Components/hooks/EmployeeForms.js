import React, { useState, useEffect } from "react";
import { getPath, getCookie, dateToString, tryFetchJson, isNumber } from "../utils.js";


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
		fetch(url + "api/package_pages", fetchProps).then(res => res.json()).then(
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
		const specificEmployee = (props.specificEmployee && props.specificEmployee > 0)?props.specificEmployee:-1;

		/*if(props.loggedUser)
			loggedUser = props.loggedUser;*/

		for(i = 0; i < count; i++){
			if(specificEmployee > 0 && rows[i].users && Array.isArray(rows[i].users)){
				if(rows[i].users.indexOf(specificEmployee) < 0)
					continue;
			}

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


/**
 * Get packages or pages when ProcessPreviewTables component is loaded;
 */
export function SingleEmployeeForms(props){
	var [rows , setRows] = useState([]),
		[loaded, isLoaded] = useState(false);
	const [error, showError] = useState(null);
	let url = getPath(),
		fetchProps = {method:"GET", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":""}};

	useEffect(() => {
		fetch(url + "api/package_pages/list_by_company_employee/", fetchProps).then(res => res.json()).then(
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

	const rowModel = {key: 0, name: "", pagesCount: "",  created: "", form: "", progress: "", send_date: "", finish_date: "", pages: []};

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
		let i, j, row;

		for(i = 0; i < count; i++){
			row = {...rowModel};
			row.key = rows[i].id;
			row.name = row.form = rows[i].title;
			row.progress = "?/?";
			row.send_date = row.finish_date = "?";
			row.pagesCount = 0;
			row.created = dateToString(rows[i].created_on);
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

export async function getEmployeesSection(pageId, errorMessageFunction){
	let url = getPath(),
		fetchProps = {method:"GET", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":""}};

	url += "api/section/" + pageId + "/list_by_page_employee/";
	const response = await fetch(url, fetchProps);
	if(!response.ok){
		//errorMessageFunction("Błąd w pobieraniu formularza!");
		throw new Error("Błąd w pobieraniu formularza!");
		return [];
	}

	let sectionForms = await response.json();
	return sectionForms.sort((a, b) => a.order - b.order);
}

export async function getEmployeesAnswersForSections(sections){
	let mainUrl = getPath(), url,
		fetchProps = {method:"GET", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":""}};
	var results = {answers: Array(sections.length).fill({data: []}), answers_cp: Array(sections.length).fill({data: []})};

	for(let i = sections.length - 1; i >= 0; i--){
		url = mainUrl + "api/answer/" + sections[i].id + "/list_by_section_employee/";
		fetch(url, fetchProps).then(res => res.json()).then(
				(result) => {
					results.answers[i] = {data: []};
					if(Object.prototype.toString.call(result)==='[object Array]' && result.length > 0){
						results.answers[i] = result[0];
						try {
							results.answers[i].data = JSON.parse(result[0].data);
						}catch(e){}
						results.answers_cp[i] = JSON.parse(JSON.stringify(result[0]));
					}
				},
				(error) => {
					results[i] = {data: []};
				}
			);
	}

	return results;
}

export async function getEmployeesSectionsAndAnswers(pageId, errorMessageFunction){
	let result = {sections: [], answers: [], answers_cp: []};

	result.sections = await getEmployeesSection(pageId, errorMessageFunction);
	if(result.sections.length < 1)
		return result;

	result.answers = await getEmployeesAnswersForSections(result.sections);
	return result;
}

/*
 * Send series of employee answers;
 * assumption: sectionAnswers = [{sectionId: ., data: string or JSON-string}, ...]
 * responseFunction = function(sectionId, requestSuccess){}
 */
export function sendEmployeesAnswers(sectionsAnswers, responseFunction){
	let url = getPath(), token = getCookie("csrftoken"), xhr,
		i, data, answerId;
	var sectionId;

	i = sectionsAnswers.length - 1;
	for(; i >= 0; i--){
		if(typeof sectionsAnswers[i].sectionId === 'undefined')
			continue;

		xhr = new XMLHttpRequest();

		sectionId = sectionsAnswers[i].sectionId;
		answerId = -1;
		data = {section: sectionId, data: sectionsAnswers[i].data}
		if( typeof data.data !== "string" && (typeof data.data !== "object" || data.data.constructor !== String) )
			data.data = JSON.stringify(sectionsAnswers[i].data);
		if( isNumber(sectionsAnswers[i].answerId) )
			answerId = sectionsAnswers[i].answerId;


		xhr.onReadyStateChange = function(){
			if(xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300){
				/*var res = xhr.responseText, obj;
				try {
					obj = JSON.parse(res);
				}catch(e){obj = {};}*/

				responseFunction(sectionId, true);
			} else if(xhr.readyState==4){
				responseFunction(sectionId, false);
			}
		}

		if(answerId >= 0)
			xhr.open("PATCH", url + "api/answer/" + answerId + "/", true);/* async: true (asynchronous) or false (synchronous); */
		else
			xhr.open("POST", url + "api/answer/", true);/* async: true (asynchronous) or false (synchronous); */

		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.setRequestHeader("X-CSRFToken", token);
		xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

		xhr.send( JSON.stringify(data) );
	}
}

export async function getEmployeesAnswers(pageId, errorMessageFunction){
}


/**
 * Employee assignment to package/combo;
 */
export function assignEmployeeToPackage(handleMessage, employeeId, packageId, setUsersInPackage){
	let data, token = getCookie("csrftoken"), fullPath = getPath(),
		fetchProps = {method:"POST", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken": token}, body: null};

	fullPath = fullPath + "api/add_users_to_package/" + packageId + "/add_user_to_package/";
	data = {users: [employeeId]};
	//let userPackageObject = {user: parseInt(employeeId), 'package': packageId};
	//data.users.push(userPackageObject);
	fetchProps.body = JSON.stringify(data);

	fetch(fullPath, fetchProps).then(res => {return tryFetchJson(res, "Wystąpił błąd")})
		.then(
			(result) => {
				let msg = "Formularz został wysłany do pracownika. ";
				if(typeof result.detail === 'string')
					msg += result.detail;
				handleMessage(msg);
				setUsersInPackage(result.users)
			},
			(error) => {
				handleMessage(error.message);
			}
		);
}

/**
 * Send reminder to employee to finish forms;
 */
export function remindEmployeeOfPackage(handleMessage, employeeId, packageId){
	let url = getPath(), token = getCookie("csrftoken"), fullPath = url + "email/reminder/"+employeeId+"/"+packageId+"/",
		fetchProps = {method:"POST", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken": token}};

	fetch(fullPath, fetchProps).then(res => tryFetchJson(res))
		.then(
			(result) => {
				handleMessage("Przypomnienie wysłane");
			},
			(error) => {
				handleMessage(error.message);
			}
		);
}

export default EmployeeForms;

