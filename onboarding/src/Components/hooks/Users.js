import React, { useState, useEffect } from "react";
import { getPath, getCookie } from "../utils.js";
import UserListRow from "../UsersList/UserListRow";

/**
 * Get users/employees from Onboarding API when UserList component is loaded;
 */
function Users(props){
	var [rows , setRows] = useState([]),
		[loaded, isLoaded] = useState(false);
	const [error, showError] = useState(null);
	let url = getPath(),
		fetchProps = {method:"GET", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":""}},
		singleUser;

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
		return error.message;
	} else if(!loaded){
		singleUser = {name: "Ładowanie ...", first_name: "", last_name: "", email: "Ładowanie ...", tel: "",
			position: "Ładowanie ...", department: "Ładowanie ...", localization: "Ładowanie ...",
			sent: "-", finished: "-", avatar: ""};

		return <UserListRow user = { singleUser } key = { 0 } />;
	} else {
		var users = [], count = rows.length;
		let i;
		for(i = 0; i < count; i++){
			singleUser = {id: 0, name: "-", first_name: "", last_name: "", email: "-", tel: "",
				position: "-", department: "-", localization: "-", sent: "-", finished: "-", avatar:""};

			if(rows[i].id)
				singleUser.id = rows[i].id;

			if(typeof rows[i].first_name === "string" && rows[i].first_name.length > 0){
				singleUser.name = rows[i].first_name;
				singleUser.first_name = rows[i].first_name;
			}
			if(typeof rows[i].last_name === "string" && rows[i].last_name.length > 0){
				singleUser.name = singleUser.name + " " + rows[i].last_name;
				singleUser.last_name = rows[i].last_name;
			}

			if(typeof rows[i].email === "string" && rows[i].email.length > 0)
				singleUser.email = rows[i].email;
			if(typeof rows[i].phone_number === "string" && rows[i].phone_number.length > 0)
				singleUser.tel = rows[i].phone_number;

			if(typeof rows[i].location === "string" && rows[i].location.length > 0)
				singleUser.localization = rows[i].location;

			if(typeof rows[i].team === "string" && rows[i].team.length > 0)
				singleUser.department = rows[i].team;

			if(typeof rows[i].job_position === "string" && rows[i].job_position.length > 0)
				singleUser.position = rows[i].job_position;

			if(typeof rows[i].avatar === "string" && rows[i].avatar.length > 0)
				singleUser.avatar = rows[i].avatar;

			users.push(<UserListRow user={ singleUser } key={ i } />);
		}

		return ( <>{ users }</> )
	}
}


/**
 * 
 * employeeObject = {name: "", last_name: "", email: "", tel: "", department: "", localization: "", position: ""};
 */
export function employeeAddEdit(handleSuccess, employeeObject){
	if(typeof employeeObject.name !== "string" || typeof employeeObject.last_name !== "string")
		return false;

	let url = getPath(), data, token = getCookie('csrftoken'),
		fetchProps = {method:"POST", headers:{}, body:null};

	fetchProps.headers = {"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":token};

	data = employeeObject;
	data.first_name = employeeObject.name;
	fetchProps.body = JSON.stringify(data);

	let path = "api/users/", employeeId = 0;
	if(employeeObject.id && employeeObject.id > 0){
		employeeId = employeeObject.id;
		path += employeeId + "/";
		fetchProps.method = "PATCH";
	}

	/*fetch(url + path, fetchProps).then(res => res.json()).then(
		(result) => {
			handleSuccess(result);
		},
		(error) => {
			console.log(error);
		}
	);*/
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

export default Users;

