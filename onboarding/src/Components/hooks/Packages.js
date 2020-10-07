import React, { useState, useEffect } from "react";
import { getPath, getCookie } from "../utils.js";
import PackagesRow from "../FormList/PackagesRow";

/**
 * Get packages from Onboarding API when Packages component is loaded;
 */
function Packages(props){
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
	}, [props.count]);

	if(error){
		return <PackagesRow key={0} row={ {name: error.message, last_edit: ""} }/>
	} else if(!loaded)
		return <PackagesRow key={0} row={ {name: "Ładowanie ...", last_edit: ""} }/>
	else {
		var form_table = [], i, count = rows.length;
		for(i = 0; i < count; i++)
			form_table.push(<PackagesRow key={ rows[i].id } row={ {name: rows[i].title, last_edit: rows[i].updated_on, key: rows[i].id } } handleUpdate = { props.handleUpdate } />);
		return ( <>{ form_table }</> )
	}
}


/**
 * Add package/combo into Packages (todo: set owner as a logged HR manager?);
 */
export function addCombo(handleSuccess, title, owner){
	if(typeof title !== "string" || (typeof title === "string" && title.length < 1) )
		return false;

	let url = getPath(), data, token = getCookie('csrftoken'),
		fetchProps = {method:"POST", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":token}, body:null};
	data = {"title": title};// {"title": "", "owner": null, "description": "", "users": []}
	fetchProps.body = JSON.stringify(data);

	fetch(url + "api/package/", fetchProps).then(res => res.json()).then(
		(result) => {
			handleSuccess(result);
		},
		(error) => {
			console.log(error);
		}
	);
	return true;
}

export function removeCombo(handleSuccess, packageId, title){
	console.log(packageId);
	let url = getPath(), data, token = getCookie('csrftoken'),
		fetchProps = {method:"DELETE", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":token}};
	data = {"id": packageId};
	fetchProps.body = JSON.stringify(data);

	fetch(url + "api/package/" + packageId + "/", fetchProps).then(res => res.json()).then(
		(result) => {
			handleSuccess(result);
		},
		(error) => {
			handleSuccess(error);
		}
	);
	return true;
}

export default Packages;

