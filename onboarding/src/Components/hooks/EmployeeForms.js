import React, { useState, useEffect } from "react";
import { getPath, getCookie, dateToString, tryFetchJson, isNumber } from "../utils.js";


function groupFormsResult(result, employeeId){
	let available = [], sent = [], i, j, row, appendToAvailable;
	const rowModel = {id: 0, name: "", pagesCount: "", percentage: 0,  created: "", last_edit: "", form: "", progress: "", send_date: "", finish_date: "", pages: [], users: []},
		count = result.length;
	const specificEmployee = (employeeId && employeeId > 0)?employeeId:-1;

	for(i = 0; i < count; i++){
		appendToAvailable = true;
		if(specificEmployee > 0 && result[i].users && Array.isArray(result[i].users) ){
			if(result[i].users.indexOf(specificEmployee) >= 0)
				appendToAvailable = false;
		}

		row = {...rowModel};
		row.id = result[i].id;
		row.name = row.form = result[i].title;
		row.progress = "? / ?";
		row.send_date = row.finish_date = "?";
		row.pagesCount = 0;
		row.created = dateToString(result[i].created_on);
		row.last_edit = dateToString(result[i].updated_on);
		row.users = result[i].users;
		if(Object.prototype.toString.call(result[i].page_set) === '[object Array]'){ // Array.isArray(object);
			row.pages = result[i].page_set.slice();
			row.pagesCount = row.pages.length;

			for(j = row.pagesCount - 1; j >= 0; j--){
				if(row.pages[j].hasOwnProperty('updated_on') )
					row.pages[j].updated_on = dateToString(row.pages[j].updated_on);
			}
			row.progress = "? / " + row.pagesCount;
		}

		if(appendToAvailable)
			available.push(row);
		else
			sent.push(row);
	}

	return {available: available, sent: sent}
}

function EmployeeForms(employeeId, count, setError, setLoading){
	const [groupedPackages, setPackages] = useState({available: [], sent: [], msg: "Ładowanie ..."});
	const url = getPath(),
		fetchProps = {method:"GET", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":""}};

	useEffect(() => {
		fetch(url + "api/package_pages/", fetchProps).then(res => res.json()).then(
			(result) => {
				let processedResult = groupFormsResult(result, employeeId);
				setPackages({...groupedPackages, available: processedResult.available, sent: processedResult.sent, msg: ""});
			},
			(err) => {
				console.log(err);
				setError(true);
			}
		).catch(err => {
				setError(true);
				setPackages({...groupedPackages, msg: err.message});
			}
		).finally(() => {setLoading(false);} );
	}, [count, employeeId]);

	return groupedPackages;
}


/**
 * Get packages with associated pages for logged-in employee;
 * @param count
 * @param setError
 * @param setLoading
 * @returns {[]} - list of packages;
 * @constructor
 */
export function SingleEmployeeForms(count, setError, setLoading){
	const [groupedPackages, setPackages] = useState({packages: [], msg: "Ładowanie ..."});
	const url = getPath(),
		fetchProps = {method:"GET", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":""}};

	useEffect(() => {
		fetch(url + "api/package_pages/", fetchProps).then(
			(res) => {
				if(!res.ok){
					throw Error("Wystąpił błąd w pobieraniu katalogów!");
				}
				return res.json()
			}).then(
			(result) => {
				let processedResult = groupFormsResult(result);
				setPackages({...groupedPackages, packages: processedResult.available, msg: ""});
			},
			(err) => {
				console.log(err);
				setError(true);
			}
		).catch(err => {
				setError(true);
				setPackages({...groupedPackages, msg: err.message});
			}
		).finally(() => {setLoading(false);} );
	}, [count]);

	return groupedPackages;
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

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - Functions requesting progress - - - - - - - - - - - - - - - -

/**
 *
 * @param progressAnswers
 * [{
    id: int,
    section: {id: int, title: string, data: [], page: int, company_id: int, package_id: int, page_title: string, page_link: string, page_updated": date-string},
    data: string or Object,
    confirmed: boolean,
    updated_on: date-string,
    finished: boolean,
    owner: int
  }, ...]
 * @returns {{}}
 */
function revertProgressAnswers(progressAnswers){
	let progress = {};
	if(progressAnswers.length < 1)
		return progress;

	let packageId, pageId, finishDate, data, empty = true;
	progressAnswers.forEach(function(answer){
		if(typeof answer.section.package_id === 'undefined' || answer.section.package_id === null || typeof answer.section.page === 'undefined')
			return;

		empty = false;

		finishDate = new Date(0);// anything small; here '1970';
		if( answer.hasOwnProperty('updated_on') ){
			try {
				finishDate = new Date(answer.updated_on);
			} catch(e){}
		}

		packageId = answer.section.package_id;
		if( !progress.hasOwnProperty(packageId) )
			progress[packageId] = {packageId: packageId, date: finishDate, finished: 0, count: 0, pages: {}};
		else if(finishDate > progress[packageId].date){
			progress[packageId].date = finishDate;
		}

		pageId = answer.section.page;
		if( !progress[packageId].pages.hasOwnProperty(pageId) )
			progress[packageId].pages[pageId] = {finished: true, confirmed: true, date: finishDate, title: "", answers: {}};
		else if(finishDate > progress[packageId].pages[pageId].date){
			progress[packageId].pages[pageId].date = finishDate;
		}

		if(answer.section.hasOwnProperty("page_title") )
			progress[packageId].pages[pageId].title = answer.section.page_title;


		data = {id: -1, owner: -1, finished: false, confirmed: false, data: {}};

		if( answer.hasOwnProperty("id") )
			data.id = parseInt(answer.id, 10);

		if( answer.hasOwnProperty("owner") )
			data.owner = parseInt(answer.owner, 10);

		if( answer.hasOwnProperty("finished") ){
			data.finished = answer.finished === 'true' || answer.finished === true;
			progress[packageId].pages[pageId].finished &= data.finished;
		}

		if( answer.hasOwnProperty("confirmed") ){
			data.confirmed = answer.confirmed === 'true' || answer.confirmed === true;
			progress[packageId].pages[pageId].confirmed &= data.confirmed;
		}
		/*if( answer.hasOwnProperty("data") )
			data.data = answer.data;*/

		progress[packageId].pages[pageId].answers[data.id] = data;
	});

	if(empty)
		return progress;

	// counting finished forms and converting dates to string representation;
	Object.keys(progress).forEach( (id) => {
		progress[id].count = Object.keys(progress[id].pages).length;
		let countFinished = 0;
		Object.keys(progress[id].pages).forEach( (pId) => {
			if(progress[id].pages[pId].finished)
				countFinished += 1;
					
			progress[id].pages[pId].date = dateToString(progress[id].pages[pId].date);
		});
		progress[id].finished = countFinished;
		progress[id].date = dateToString(progress[id].date);
	});
	return progress;
}

/**
 * Requests server for the list of answers with corresponding section and page keys;
 * @param employeeId: id (int) of employee it is requested for;
 * @param progressCallback: callback function to make use of the result;
 * @returns {abortFun}: function to abort by XMLHttpRequest.abort() property method;
 */
export function getProgress(employeeId, progressCallback){
	let xhr = new XMLHttpRequest(), url = getPath();

	url += "api/user_progress/" + employeeId;

	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status >= 200 && this.status < 300){
			let progressAnswers, progress = {};
			try {
				progressAnswers = JSON.parse(this.responseText);
			}catch(e){
			    progressAnswers = [];}

			progress = revertProgressAnswers(progressAnswers);
			progressCallback(progress);

		} else if(this.readyState == 4){
			let message = this.responseText;
			if(this.status >= 500 && this.status < 600)
				message = "Napotkano błąd po stronie serwera.";
			else if(this.status >= 400 && this.status < 500){
				message = "Napotkano błędne zapytanie serwera.";
			}

			progressCallback(false, message);
		}
	}

	xhr.open("GET", url, true);/* async: true (asynchronous) or false (synchronous); */

	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("X-CSRFToken", "");
	xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	xhr.send();

	let abortFun = function(){
		xhr.abort();
	}
	return abortFun;
}

/*export function getProgress(employeeId, progressCallback){
	let url = getPath();
	const fetchProps = {method:"GET", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":""}},
		abortCont = new AbortController();

	fetchProps.signal = abortCont.signal;
	url += "api/user_progress/" + employeeId;

	fetch(url, fetchProps).then( (res) => {
		if(!res.ok)
			throw Error("Problem z pobraniem danych!");

		return res.json();
	}).then(function(result){
		let progress = revertProgressAnswers(result);
		progressCallback(progress);

	}).catch((err) => {
		progressCallback(false, err.message);// console.log(err);
	});


	let abortFun = function(){
		abortCont.abort();
	}
	return abortFun;
}*/

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - -Functions requesting dates when packages were sent - - - - - - - - - - -

/**
 * Converts list of key-value pairs like [{"package": int, "send_on": string}, ...]
 * into indexed list like {package_1: send_on_1, package_2: send_on_2, ...};
 * @param sendDates: list of objects like [{"package": int, "send_on": string}, ...] or another object to return {};
 * @returns {{}} indexed list or empty object;
 */
function processDatesOfSending(sendDates){
	let result = {};
	if( !Array.isArray(sendDates) || sendDates.length < 1)
		return result;

	let i, count = sendDates.length, packageId;
	for(i = 0; i < count; i++){
		packageId = -1;

		if( sendDates[i].hasOwnProperty("package") )
			packageId = parseInt(sendDates[i]["package"], 10);

		if( sendDates[i].hasOwnProperty("send_on") ){
			result[packageId] = dateToString(sendDates[i].send_on);
		}
	}
	return result;
}

/**
 * Requests server for the list of date when package was sent for corresponding package id;
 * @param employeeId: id (int) of employee it is requested for;
 * @param sendDateCallback: callback function to make use of the result;
 * @returns {abortFun}: function to abort by AbortController()
 */
export function datesOfSendingPackages(employeeId, sendDateCallback){
	let url = getPath(), abortCont;
	const fetchProps = {method:"GET", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":""}};

	abortCont = new AbortController();
	fetchProps.signal = abortCont.signal;
	url += "api/user/" + employeeId + "/when_package_send_to_user/";

	fetch(url, fetchProps).then(function(res){
		if(!res.ok)
			throw Error("Problem z pobraniem danych!");

		return res.json();
	}).then( (result) => {
		let sendDates = processDatesOfSending(result);
		sendDateCallback(sendDates);
	}).catch((err) => {
		sendDateCallback(false, err.message);// console.log(err);
	});


	let abortFun = function(){
		abortCont.abort();
	}
	return abortFun;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/**
 * Rescue request an id of the logged user when it is not set;
 */
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

			let result = {sections: sections, answers: [], answers_cp: []}, areSaved = false, areFinished = true, areConfirmed = true;
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
					} else if(section.answers[i].owner === null)
						continue;

					idInt = section.answers[i].id ? parseInt(section.answers[i].id, 10) : -1;
					if(idInt > id){// include only the answer with highest 'id' and set flag if it was saved on DB;
						id = idInt;
						answer = section.answers[i];
						areSaved = true;
					}
					if(typeof section.answers[i].finished !== 'undefined')
						areFinished &= section.answers[i].finished;

					if(typeof section.answers[i].confirmed !== 'undefined')
						areConfirmed &= section.answers[i].confirmed;
				}

				try {
					answer.data = JSON.parse(answer.data);
				}catch(e){}

				return answer;
			});

			result.answers_cp = JSON.parse(JSON.stringify(result.answers));
			setSectionsAnswers(result, areSaved, areFinished, areConfirmed);
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

		fetch(fullPath, fetchProps)
			.then(res => {
				if(!res.ok) {
					throw Error("Wystąpił błąd: nie udało się wysłać katalogu wdrożeniowego do pracownika!");
				}
				return tryFetchJson(res, "Wystąpił błąd");
			})
			.then(
				(result) => {
					let msg = "Katalog został wysłany do pracownika. ";
					if(typeof result.detail === 'string')
					msg += result.detail;
					handleMessage(msg);
					if(setUsersInPackage) setUsersInPackage(result.users);
				},
				(error) => {
					handleMessage(error.message);
				}
			);
		} else if(typeof packageId === "object") {
			Promise.all(packageId.map(id => {// ESLint: Expected to return a value in arrow function.(array-callback-return);
				const fullPath = path + "api/add_users_to_package/" + id + "/add_user_to_package/";
				fetch(fullPath, fetchProps)
					.then(res => {
						if(!res.ok)	throw new Error("Wystąpił błąd: nie udało się wysłać wybranych katalogów do pracownika!");
					})
					.catch(error => handleMessage(error.message))
			}))
				.then(() => {
					let msg = "Wybrane katalogi zostały wysłane do pracownika.";
					handleMessage(msg);
				});
		}
}

/**
 * Requests server to accept all answers send by employee with id = employeeId for questions of form/page with id = pageId;
 * @param employeeId: an id of employee whose answers are to be accepted;
 * @param pageId: id of the form/page the answers belongs to;
 * @param acceptCallback: callback function with arguments
 *        message - string of message to be displayed,
 *        isError - boolean if error occurred or not,
 *        elementTarget - DOM of button to be unblock and all its button siblings when error occurred (optional);
 * @param button: DOM object of button to be unblock when the answer is not ok (optional);
 */
export function sendAcceptance(employeeId, pageId, acceptCallback, button){
	let data, token = getCookie("csrftoken"), path = getPath(),
		fetchProps = {method:"PATCH", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken": token}, body: null};

	data = {user: employeeId};
	fetchProps.body = JSON.stringify(data);

	path += "api/answer/" + pageId + "/confirm/";
	fetch(path, fetchProps)
		.then(res => {
				if(!res.ok) {
					throw Error("Wystąpił błąd podczas akceptacji!");
				}
				return (res.status !== 204) ? res.json() : res;// 204: HTTP_204_NO_CONTENT;
		}).then(
			(result) => {
				acceptCallback("Pracownik skończył to wdrożenie.", false);
			},
			(error) => {
				acceptCallback("Wystąpił błąd podczas akceptacji!", true, button);
			}
		).catch(function(err){
			acceptCallback(err.message, true, button);
		});
}

/**
 * Requests server to set employee's answers as not finished and sends an e-mail to ask employee to reanswer them;
 * @param employeeId: an id of employee whose answers will have to be send again;
 * @param pageId: id of the form/page the answers belongs to;
 * @param retryCallback: callback function with arguments
 *        message - string of message to be displayed,
 *        isError - boolean if error occurred or not,
 *        elementTarget - DOM of button to be unblock and all its button siblings when error occurred (optional);
 * @param button: DOM object of button to be unblock when the answer is not ok (optional);
 */
export function sendRetry(employeeId, pageId, retryCallback, button){
	let data, token = getCookie("csrftoken"), path = getPath(),
		fetchProps = {method:"PATCH", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken": token}, body: null};

	data = {user: employeeId};
	fetchProps.body = JSON.stringify(data);

	path += "api/answer/" + pageId + "/resend/";
	fetch(path, fetchProps)
		.then(res => {
				if(!res.ok) {
					throw Error("Wystąpił błąd podczas wysyłania!");
				}
				return (res.status !== 204) ? res.json() : res;// 204: HTTP_204_NO_CONTENT;
		}).then(
			(result) => {console.log(result);
				retryCallback("Dokumenty/ Formularze zostały wysłane do pracownika.", false);
			},
			(error) => {
				retryCallback("Formularza/Dokumentów nie udało się wysłać.", true, button);
			}
		).catch(function(err){
			retryCallback(err.message, true, button);
		});
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

/**
 * Removes package from the list of packages sent to employee;
 * @param handleMessage: callback function with arguments - string of answer and boolean if error occurred;
 * @param employeeId: id of the user (employee) from whom the package has to be removed;
 * @param packageId: the id of package which has to be removed;
 */
export function withholdPackageFromEmployee(handleMessage, employeeId, packageId){
	let data, token = getCookie("csrftoken"), path = getPath(),
		fetchProps = {method:"DELETE", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken": token}, body: null};

	data = {package: packageId};
	fetchProps.body = JSON.stringify(data);

	fetch(path + "api/add_users_to_package/" + employeeId + "/", fetchProps)
		.then(res => {
				if(!res.ok) {
					throw Error("Wystąpił błąd: nie udało się usunąć katalogu!");
				}
				return (res.status !== 204) ? res.json() : res;// 204: HTTP_204_NO_CONTENT;
		}).then(
			(result) => {
				handleMessage("Katalog u pracownika zostal usunięty.");
			},
			(error) => {
				handleMessage("Wystąpił błąd: nie udało się usunąć katalogu!", true);
			}
		).catch(function(err){
			handleMessage(err.message, true);
		});
}

export default EmployeeForms;

