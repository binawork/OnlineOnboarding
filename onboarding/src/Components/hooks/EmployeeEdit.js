import React/*, { useState, useEffect }*/ from "react";
import { getPath, getCookie } from "../utils.js";

/**
 * 
 */
function EmployeeEdit(props){
	console.log(props);
	/*var [rows , setRows] = useState([]),
		[loaded, isLoaded] = useState(false);
	const [error, showError] = useState(null);
	let url = getPath(),
		fetchProps = {method:"GET", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":""}};

	useEffect(() => {
		fetch(url + "api/users/", fetchProps).then(res => res.json()).then(
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
		form_table.push(<UserProfileManage key={ rows[i].id } row={ {name: rows[i].title, last_edit: rows[i].updated_on, key: rows[i].id } } handleUpdate = { props.handleUpdate } />);
		return ( <>{ form_table }</> )
	}*/
}

/**
 * 
 * employeeObject = {name: "", last_name: "", email: "", tel: "", department: "", localization: "", position: ""};
 */
export function employeeAddEdit(handleSuccess, employeeObject){
	if(typeof title !== "string" || (typeof title === "string" && title.length < 1) )
		return false;

	let url = getPath(), data, token = getCookie('csrftoken'),
		fetchProps = {method:"POST", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":token}, body:null};
	data = {"title": title};// {"title": "", "owner": null, "description": "", "users": []}
	fetchProps.body = JSON.stringify(data);

	fetch(url + "api/users/", fetchProps).then(res => res.json()).then(
		(result) => {
			handleSuccess(result);
		},
		(error) => {
			console.log(error);
		}
	);
	return true;
}

export function uploadAvatar(handleSuccess, avatarFile){
	let url = getPath(), data, token = getCookie('csrftoken'),
		fetchProps = {method:"POST", headers:{"Accept":"application/json", "X-CSRFToken":token, "Authorization": "Token " + token}, body:null};

	data = new FormData();
	data.append('avatar', avatarFile);
	fetchProps.body = data;

	fetch(url + 'api/user-avatar/', fetchProps).then(response => response.json()).then(
		data => {
			console.log(data);
			handleSuccess(data);
		},
		(error) => {
			console.error('Error:', error);
		}
	);
}

export default EmployeeEdit;

