import React, { useState, useEffect } from "react";
import { getPath, getCookie, tryFetchJson } from "../utils.js";
import FormPackageEdit from "../FormTable/FormPackageEdit";

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

export function OnePackageEdit(props){
	var [element, setElement] = useState({title: "", description: ""}),
		[loaded, isLoaded] = useState(false);
	const [error, showError] = useState(null);
	let url = getPath(),
		fetchProps = {method:"GET", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":""}};

	useEffect(() => {
		fetch(url + "api/package/" + props.packageId, fetchProps).then(res => res.json()).then(
			(result) => {
			    if(!result.description)
			        result.description = "";

				isLoaded(true);
				setElement(result);
			},
			(error) => {
				showError(error);
				console.log(error);
			}
		);
	}, []);

	if(error){
		return <FormPackageEdit key={0} error = { error.message } />
	} else if(!loaded)
		return <FormPackageEdit key={0} />
	else {
		return <FormPackageEdit key={0} pack={ {title: element.title, description: element.description, packageId: props.packageId} } />
	}
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

	fetch(url + "api/package/" + packageId + "/", fetchProps).then(res => tryFetchJson(res) ).then(
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

export function removePage(handleSuccess, pageId, title){
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

	fetch(url + "api/page/" + pageId + "/", fetchProps).then(res => tryFetchJson(res) ).then(
		(result) => {
			handleSuccess("Formularz został usunięty.");
		},
		(error) => {
			handleSuccess(error);
		}
	);
	return true;
}

export default PackagePage;

