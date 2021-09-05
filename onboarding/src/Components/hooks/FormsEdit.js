import { useEffect, useState } from "react";
import { getPath, getCookie, tryFetchJson } from "../utils.js";
import FormSectionsAPI from "./FormSectionsAPI.js";
import useFetch from "./useFetch.js";

/**
 * Get page sections;
 */
function FormsEdit(formId, update){
	const [sections, setSections] = useState(null);
  const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	
	useEffect(() => {
    const abortCont = new AbortController();

		FormSectionsAPI.getAllSections(formId, abortCont)
			.then((response) => {
				setSections((response.sort((a, b) => a.order - b.order)));
				for(let i = sections?.length - 1; i >= 0; i--){
					if( !Array.isArray(sections[i].data) )
					sections[i].data = [];
				}
			})
			.catch((error) => {
				if(error.name === "AbortError") {
          console.log('Fetch aborted');
        } else {
					setErrorMessage(error.message)
				}
			})
			.finally(() => setLoading(false));

		return () => abortCont.abort();
	}, [update]);

	return { sections, loading, errorMessage };
}

/**
 * Get page details;
 */
export function fetchFormData(formId) {
	const url = getPath(),
	fetchProps = {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			"X-CSRFToken": "",
		},
	};

  const { data, isLoading, error } = useFetch(`${url}api/page/${formId}`, fetchProps);

	return { data, isLoading, error };
}

/**
 * Sends page details to update/edit;
 */
export function savePageDetails(handleSuccess, pageId, title, link, description){
	let data = {}, dontUpdate = true;
	if(title){
		if(typeof title === "string" && title.length > 0){
			data.title = title;
			dontUpdate = false;
		}
	}
	if(typeof description === "string"){
		data.description = description;
		dontUpdate = false;
	}
	if(typeof link === "string"){
		data.link = link;
		dontUpdate = false;
	}


	if(dontUpdate)
		return false;

	let url = getPath(), token = getCookie('csrftoken'),
		fetchProps = {method:"PATCH", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":token}};

	fetchProps.body = JSON.stringify(data);

	fetch(url + "api/page/" + pageId + "/", fetchProps)
		.then(res => {
			if(!res.ok) {
				throw Error("Błąd: Nie udało się zapisać danych rozdziału.");
			}
			return tryFetchJson(res);
		})
		.then(() => {
			handleSuccess("Zapisano dane");
		})
		.catch((error) => {
			handleSuccess(error.message);
			console.log(error);
		});
	return true;
}

/**
 * Requests files for page and works on them by callback function
 *
 * @param pageId - an id of page for which we want to reqests and get files;
 * @param setterForFilesState - callback function to call when success;
 * @param showErrorCallback - callback function to show an error of request;
 * @returns {*} - abort object fro Promise-fetch;
 */
export function getFilesForPage(pageId, setterForFilesState, showErrorCallback){
	let fetchProps = {method:"GET", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":""}},
		abortCont = new AbortController();
	var url = getPath();
	fetchProps.signal = abortCont.signal;

	fetch(url + "api/page/" + pageId + "/files/", fetchProps)
		.then(res => {
			if(!res.ok)
				throw Error("Wystąpił błąd podczas pobierania listy plików!");
			return res.json();
		})
		.then( (response) => {
			let files = [], row, downloadUrl = url + "api/page_file/";// 1/download/";
        	response.forEach(function(element){
        		row = element;
        		row.data_file = downloadUrl + element.id + "/download/";
        		files.push(row);
        	});
        	setterForFilesState(files);
        })
		.catch(error => {
			showErrorCallback(error.message);
		});

	return abortCont;
}

/**
 * Requests files for page and works on them by callback function
 *
 * @param pageId - an id of page for which we want to reqests and get files;
 * @param files -
 * @param showResult -
 * @param showError -
 * @param showProgress -
 * @returns {*} - abort function for all requests for files;
 */
export function addNewFiles(pageId, files, showResult, showError, showProgress){
	var xhrsAll = [];
	let xhr, url, token = getCookie('csrftoken');

	url = getPath();
	url = url + "api/page_file/";

	let i, count = files.length, formData;

	for(i = 0; i < count; i++){
		xhr = new XMLHttpRequest();
		formData = new FormData();
		formData.append("data_file", files[i]);
		formData.append("page", pageId);
		formData.append("description", "");
		let fileName = files[i].name;
		//formData.append("csrftoken": token);

		xhr.onreadystatechange = function(){
			if(this.readyState == 4 && this.status >= 200 && this.status < 300){
				let response;
				try {
					response = JSON.parse(this.responseText);
				}catch(e){
					response = "";}
				showResult(fileName, response);

			} else if(this.readyState == 4){
				showError(i, this.responseText, this.status);// this.status >= 400 ...;
			}
		};
		xhr.onprogress = function(e){
			if(e.lengthComputable){
				showProgress(fileName, e.loaded, e.total);
			}
		}

		xhr.open("POST", url, true);/* async: true (asynchronous) or false (synchronous); */

		xhr.setRequestHeader("Accept", "application/json");
		//xhr.setRequestHeader("Content-Type", "multipart/form-data");/ / "Multipart form parse error - Invalid boundary in multipart: None"!!!
		xhr.setRequestHeader("X-CSRFToken", token);
		xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		xhrsAll.push(xhr);

		xhr.send(formData);
	}

	//await Promise.all(files.map((file) => {
	//		let formData = new FormData();
	//		formData.append("data_file", file);
	//		formData.append("page": pageId);
	//		//formData.append("csrftoken": token);
	//		fetchProps.body = formData;

	//		return fetch(url, fetchProps);
	//	}
	//));

	return function(){
		let i = xhrsAll.length;
		for(; i >= 0; i--)
			xhrsAll.abort();
	};
}

/**
 * Removes file of pages in packages.
 * @param pageFileId - id of file to be removed;
 * @param removeCallback - callback function to be called when request is finished;
 * @returns {*};
 */
export function removePageFile(pageFileId, removeCallback){
	let url = getPath(), token = getCookie('csrftoken'),
		fetchProps = {method:"DELETE", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":token}};

	fetch(url + "api/page_file/" + pageFileId + "/", fetchProps)
		.then(res => {
			if(!res.ok)
				throw Error("Błąd: nie udało się usunąć pliku!");
			return (res.status !== 204) ? res.json() : res;// 204: HTTP_204_NO_CONTENT;
		}).then(data => {
			removeCallback("Udało się usunąć plik.", pageFileId);
		}).catch(err => {
			removeCallback(err.message);
		});
}

export default FormsEdit;

