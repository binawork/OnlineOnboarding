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

		FormSectionsAPI.getAllSections(formId)
			.then((response) => {
				setSections((response.sort((a, b) => a.order - b.order)));
				// for(let i = sections.length - 1; i >= 0; i--){
				// 	if( !Array.isArray(sections[i].data) )
				// 	sections[i].data = [];
				// }
			})
			.catch((error) => setErrorMessage(error.message))
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
	if(description){
		if(typeof description === "string" && description.length > 0){
			data.description = description;
			dontUpdate = false;
		}
	}
	if(link){
		if(typeof link === "string" && link.length > 0){
			data.link = link;
			dontUpdate = false;
		}
	}


	if(dontUpdate)
		return false;

	let url = getPath(), token = getCookie('csrftoken'),
		fetchProps = {method:"PATCH", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":token}};

	fetchProps.body = JSON.stringify(data);

	fetch(url + "api/page/" + pageId + "/", fetchProps).then(res => tryFetchJson(res) ).then(
		(result) => {
			handleSuccess(result);
		},
		(error) => {
			handleSuccess(error);
			console.log(error);
		}
	);
	return true;
}

export default FormsEdit;

