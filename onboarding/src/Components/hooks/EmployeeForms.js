import React, { useState, useEffect } from "react";
import { getPath, getCookie, dateToString, tryFetchJson, isNumber } from "../utils.js";


/**
 * Get packages or pages when ProcessPreviewTables component is loaded;
 */
// function EmployeeForms(props, count){
	function EmployeeForms(props, setError, setLoading, count){
	const [rows , setRows] = useState([]),
		[loaded, isLoaded] = useState(false);
	const [error, showError] = useState(null);
	const url = getPath(),
		fetchProps = {method:"GET", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":""}};

	useEffect(() => {
		fetch(url + "api/package_pages", fetchProps).then(res => res.json()).then(
			(result) => {
				isLoaded(true);
				setRows(result);
			},
			(err) => {
				console.log(err);
				setError(true);
				showError(err);
			}
		).finally(() => setLoading(false));
	}, [props.count, count]);

	const rowModel = {key: 0, name: "", pagesCount: "",  created: "", last_edit: "", form: "", progress: "", send_date: "", finish_date: "", pages: [], users: []};

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
			row.users = rows[i].users;
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

/*export async function getEmployeesSection(pageId, errorMessageFunction){
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
}*/

/*export async function getEmployeesAnswersForSections(sections){
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
}*/


function getUserId(pageId, errorMessageFunction, setSectionsAnswers){
	let xhr = new XMLHttpRequest(), url = getPath();

	url += "api/users/login_user/";

	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300){
			let resp = xhr.responseText, user;
			try {
				user = JSON.parse(resp);
				if(Array.isArray(user) && user.length > 0)
					user = user[0];

				user = (user.id) ? user.id : false;
			} catch(e){
				getEmployeesSectionsAndAnswers(pageId, false, errorMessageFunction, setSectionsAnswers);
				return ;
			}

			getEmployeesSectionsAndAnswers(pageId, user, errorMessageFunction, setSectionsAnswers);
		} else if(xhr.readyState==4){
			getEmployeesSectionsAndAnswers(pageId, false, errorMessageFunction, setSectionsAnswers);
		}
	}

	xhr.open("GET", url, true);/* async: true (asynchronous) or false (synchronous); */

	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("X-CSRFToken", "");
	xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	xhr.send();
}

export function getEmployeesSectionsAndAnswers(pageId, userId, errorMessageFunction, setSectionsAnswers){
	if( (typeof userId === 'undefined' || userId < 1) && userId !== false){
		getUserId(pageId, errorMessageFunction, setSectionsAnswers);
		return;
	}

	let xhr = new XMLHttpRequest(), url = getPath();
	url += "api/section_answers/" + pageId + "/";

	xhr.onreadystatechange = () => {
		if(xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300){
			let resp = xhr.responseText, sections;
			try {
				sections = JSON.parse(resp);
			} catch(e){
				errorMessageFunction(e.message);
				return ;
			}

			let result = {sections: sections, answers: [], answers_cp: []}, areSaved = false, areFinished = true;
			result.answers = sections.map(function(section){
				let answer = {data: []};
				if(typeof section.answers === 'undefined' || section.answers === null)
					return answer;

				let i = section.answers.length - 1, id = -1, idInt;
				for(; i >= 0; i--){// .reduce(function(prev, curr){return prev.id > curr.id ? prev : curr;});
					if(section.answers[i].owner){// Skip answers of another employees;
						idInt = parseInt(section.answers[i].owner, 10);
						if(idInt !== userId)
							continue;
					}

					idInt = section.answers[i].id ? parseInt(section.answers[i].id, 10) : -1;
					if(idInt > id){// include only the answer with highest 'id' and set flag if it was saved on DB;
						id = idInt;
						answer = section.answers[i];
						areSaved = true;
					}
					if(typeof section.answers[i].finished !== 'undefined')
						areFinished &= section.answers[i].finished;
				}

				try {
					answer.data = JSON.parse(answer.data);
				}catch(e){}

				return answer;
			});

			result.answers_cp = JSON.parse(JSON.stringify(result.answers));
			setSectionsAnswers(result, areSaved, areFinished/*, todo: maybe use confirmed field later; */);
		} else if(xhr.readyState==4){
			errorMessageFunction("Nie udało się zdobyć danych!");
		}
	};

	xhr.open("GET", url, true);/* async: true (asynchronous) or false (synchronous); */

	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("X-CSRFToken", "");
	xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	xhr.send();
}

/*
 * Send series of employee answers;
 * assumption: sectionAnswers = [{sectionId: ., data: string or JSON-string}, ...]
 * responseFunction = function(sectionId, requestSuccess){}
 */
export function sendEmployeesAnswers(sectionsAnswers, responseFunction){
	let url = getPath(), token = getCookie("csrftoken"),
		i, data, answerId;
	var sectionId, xhr;

	i = sectionsAnswers.length - 1;
	for(; i >= 0; i--){
		if(typeof sectionsAnswers[i].sectionId === 'undefined')
			continue;

		xhr = new XMLHttpRequest();

		sectionId = sectionsAnswers[i].sectionId;
		answerId = -1;
		data = {section: sectionId, data: sectionsAnswers[i].data}
		/*if( typeof data.data !== "string" && (typeof data.data !== "object" || data.data.constructor !== String) )
			data.data = JSON.stringify(sectionsAnswers[i].data);*/
		if( isNumber(sectionsAnswers[i].answerId) )
			answerId = sectionsAnswers[i].answerId;


		xhr.onreadystatechange = function(){
			if(this.readyState == 4 && this.status >= 200 && this.status < 300){
				let resp, answerIdResp = -1, sectionIdResp = -1;
				try {
					resp = JSON.parse(this.responseText);
					if(resp.hasOwnProperty('id') )
						answerIdResp = parseInt(resp.id, 10);
					if(resp.hasOwnProperty('section') )
						sectionIdResp = parseInt(resp.section, 10);
				}catch(e){}

				responseFunction(sectionIdResp, true, answerIdResp);
			} else if(this.readyState == 4){
				responseFunction(sectionId, false);
			}
		};

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

export async function finishEmployeesAnswers(pageId, handleMessage){
	let data, token = getCookie("csrftoken"), fullPath = getPath(),
		fetchProps = {method:"PATCH", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken": token}, body: null};

	fullPath = fullPath + "api/answer/" + pageId + "/finished/";
	fetch(fullPath, fetchProps).then(
		(result) => {
			handleMessage("Formularz został wysłany do HR. ");
		},
		(error) => {
			handleMessage("Wystąpił błąd! " + error.message);
		}
	);
}


/**
 * Employee assignment to package/combo;
 */
export function assignEmployeeToPackage(handleMessage, employeeId, packageId, setUsersInPackage){
	let data, token = getCookie("csrftoken"), path = getPath(),
		fetchProps = {method:"POST", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken": token}, body: null};

	data = {users: [employeeId]};
	fetchProps.body = JSON.stringify(data);

	if(typeof packageId === "string" || typeof packageId === "number") {
		const fullPath = path + "api/add_users_to_package/" + packageId + "/add_user_to_package/";

		//let userPackageObject = {user: parseInt(employeeId), 'package': packageId};
		//data.users.push(userPackageObject);

		fetch(fullPath, fetchProps).then(res => {return tryFetchJson(res, "Wystąpił błąd")})
		.then(
			(result) => {
				let msg = "Formularz został wysłany do pracownika. ";
				if(typeof result.detail === 'string')
				msg += result.detail;
				handleMessage(msg);
				setUsersInPackage ? setUsersInPackage(result.users) : null;// ESLint: Expected an assignment or function call and instead saw an expression.(no-unused-expressions);
			},
			(error) => {
				console.log(error.message);
			}
			);
		} else if(typeof packageId === "object") {
			Promise.all(packageId.map(id => {// ESLint: Expected to return a value in arrow function.(array-callback-return);
				const fullPath = path + "api/add_users_to_package/" + id + "/add_user_to_package/";
				fetch(fullPath, fetchProps)
			})).then(() => {
						let msg = "Wybrane formularze zostały wysłane do pracownika.";
						handleMessage(msg);
					}, 
					(error) => {
						console.log(error.message);
					}
				);
		}
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

