import React, { useState, useEffect } from "react";
import { getPath, getCookie } from "../utils.js";
import PackagesRow from "../FormList/PackagesRow";

/**
 * Get packages from Onboarding API when Packages component is loaded;
 */
function Packages(){
	var [rows , setRows] = useState([]),
		[loaded, isLoaded] = useState(false);
	const [error, showError] = useState(null);
	let url = getPath(),
		fetchProps = {method:"GET", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":""}};

	useEffect(() => {
		fetch(url + "api/package/", fetchProps).then(res => res.json()).then(
			(result) => {
				isLoaded(true);
				setRows(result);
			},
			(error) => {
				showError(error);
				console.log(error);
			}
		);
	}, []);

	if(error){
		return <PackagesRow key={0} row={ {name: error.message, last_edit: ""} }/>
	} else if(!loaded)
		return <PackagesRow key={0} row={ {name: "Loading ...", last_edit: ""} }/>
	else {
		var form_table = [], i, count = rows.length;
		for(i = 0; i < count; i++)
			form_table.push(<PackagesRow key={ rows[i].id } row={ {name: rows[i].title, last_edit: rows[i].updated_on} }/>);
		return ( <>{ form_table }</> )
	}

}


/**
 * Add package/combo into Packages (todo: set owner as a logged HR manager?);
 */
export function addCombo(title, owner){
	var [saved, isSaved] = useState(false);
	const [saveError, showSaveError] = useState(null);

	if(typeof title !== "string" || (typeof title === "string" && title.length < 1) )
		return;

	let url = getPath(), data, token = getCookie('csrftoken'),
		fetchProps = {method:"POST", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":token, "body":null}};
	data = {"title": title};// {"title": "", "owner": null, "description": "", "users": []}
	fetchProps.headers.body = JSON.stringify(data);

	useEffect(() => {
		fetch(url + "api/package/", fetchProps).then(res => res.json()).then(
			(result) => {
				isSaved(true);
			},
			(error) => {
				showSaveError(error);
				console.log(error);
			}
		);
	}, []);

	if(saveError){
		console.log(saveError.message);// todo: modal with message;
		return false;
	} else if(saved){
		return true;
	}
}

export default Packages;

