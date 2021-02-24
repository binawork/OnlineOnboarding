import { useState, useEffect } from "react";
import { getPath, getCookie, tryFetchJson } from "../utils.js";
import useFetch from "./useFetch.js";

/**
 * Get pages for package with defined id from Onboarding API when FormTable component is loaded;
 */
function PackagePage(count, id){
  const [pages, setPages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, showError] = useState(null);

	let url = getPath(),
		fetchProps = {method:"GET", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":""}};

	useEffect(() => {
		fetch(url + "api/page/" + id + "/list_by_package_hr/", fetchProps)
			.catch(error => {
				showError(error.message);
				console.error(error);
			})
			.then(res => res.json())
			.then((result) => {
					setPages(result.sort((a, b) => b.id - a.id));
				},
			)
			.finally(() => setIsLoading(false));
	}, [count]);

	return { pages, isLoading, error };
}

export function fetchOnePackageAndForms(packageId, count){
	const url = getPath();
	const fetchProps = {method:"GET", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":""}};

	const { data:packageAndForms, isLoading, error } = useFetch(`${url}api/package_pages/${packageId}`, fetchProps, count);

	return { packageAndForms, isLoading, error };
}

export function savePackageDetails(handleSuccess, packageId, title, description){
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

	if(dontUpdate)
		return false;

	let url = getPath(), token = getCookie('csrftoken'),
		fetchProps = {method:"PATCH", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":token}};

	fetchProps.body = JSON.stringify(data);

	fetch(url + "api/packae/" + packageId + "/", fetchProps).then(res => tryFetchJson(res, "Nie udało się zapisać zmian!") ).then(
		(result) => {
			handleSuccess("Zapisano zmiany");
		},
		(error) => {
			handleSuccess(error.message);
		}
	);
	return true;
}

/**
 * Add page into Pages for Package (todo: set owner as a logged HR manager?);
 */
export function addPage(handleSuccess, title, packageId, order, owner){
	if(typeof title !== "string" || (typeof title === "string" && title.length < 1) )
		return false;
	let url = getPath(), data, token = getCookie('csrftoken'),
		fetchProps = {method:"POST", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":token}, body:null};

	data = {"title": title, "package": packageId, "order": 1};
	if(order){
		data.order = order;
	}
	if(owner)
		data.owner = owner;

	fetchProps.body = JSON.stringify(data);

	fetch(url + "api/page/", fetchProps).then(res => res.json()).then(
		(result) => {
			handleSuccess(result);
		},
		(error) => {
			console.log(error);
		}
	);
	return true;
}

export function removeForm(handleSuccess, pageId){
	let url = getPath(),
    data,
    token = getCookie("csrftoken"),
    fetchProps = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": token,
      },
    };
  data = { id: pageId };
	fetchProps.body = JSON.stringify(data);

	fetch(url + "api/page/" + pageId + "/", fetchProps)
		.then(res => {
			if(!res.ok) {
				throw Error("Nie udało się usunąć formularza!");
			}
			return tryFetchJson(res) 
		}).then((result) => {
				handleSuccess("Formularz został usunięty.");
		}).catch((error) => {
		handleSuccess(error.message);
	});
	return true;
}

export default PackagePage;

