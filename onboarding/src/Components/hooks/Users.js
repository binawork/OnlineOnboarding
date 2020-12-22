import React, { useState, useEffect } from "react";
import { getPath, getCookie, tryFetchJson } from "../utils.js";
//import UserListRow from "../UsersList/UserListRow";


function checkUser(userObject, userId){
	const singleUser = {id: userId, name: "-", first_name: "", last_name: "", email: "-", tel: "",
				position: "-", department: "-", location: "-", sent: "-", finished: "-", avatar:""};

	if(typeof userObject.first_name === "string" && userObject.first_name.length > 0){
		singleUser.name = userObject.first_name;
		singleUser.first_name = userObject.first_name;
	}
	if(typeof userObject.last_name === "string" && userObject.last_name.length > 0){
		singleUser.name = singleUser.name + " " + userObject.last_name;
		singleUser.last_name = userObject.last_name;
	}

	if(typeof userObject.email === "string" && userObject.email.length > 0)
		singleUser.email = userObject.email;
	if(typeof userObject.phone_number === "string" && userObject.phone_number.length > 0)
		singleUser.tel = userObject.phone_number;

	if(typeof userObject.location === "string" && userObject.location.length > 0)
		singleUser.location = userObject.location;

	if(typeof userObject.team === "string" && userObject.team.length > 0)
		singleUser.department = userObject.team;

	if(typeof userObject.job_position === "string" && userObject.job_position.length > 0)
		singleUser.position = userObject.job_position;

	if(typeof userObject.avatar === "string" && userObject.avatar.length > 0)
		singleUser.avatar = userObject.avatar;

	return singleUser;
}

/**
 * Get users/employees from Onboarding API when UserList component is loaded;
 */
function Users(loggedUser, setUsers, setSearchResult, isLoaded, showError) {
  let url = getPath(),
    fetchProps = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": "",
      },
    };

		fetch(url + "api/users/", fetchProps)
    .then((res) => res.json())
    .then((result) => {
      const users = result
        .filter((user) => user.id !== loggedUser.id)
        .map((user) => {
          user = checkUser(user, user.id);
          return user;
				})
				.sort((a,b) => a.id - b.id);

			setUsers(users);
			setSearchResult ? setSearchResult(users) : null;
    })
    .catch((error) => {
      showError(true);
      console.log(error);
		})
		.finally(() => isLoaded(true));
}


/**
 * 
 * employeeObject = {name: "", last_name: "", email: "", tel: "", department: "", location: "", position: ""};
 */
export function employeeAddEdit(handleMessage, employeeObject){
	if(typeof employeeObject.name !== "string" || typeof employeeObject.last_name !== "string"
		|| typeof employeeObject.email !== "string" || typeof employeeObject.email.length < 2){
		handleMessage("Błędny format danych lub brak e-maila!", false);
		return false;
	}
	if(employeeObject.avatar)
		delete employeeObject.avatar;

	if(typeof employeeObject.id !== 'undefined' && (employeeObject.id==0 || employeeObject.id=="0") )
		delete employeeObject.id;


	let url = getPath(), data, token = getCookie('csrftoken'),
		fetchProps = {method:"POST", headers:{}, body:null};

	fetchProps.headers = {"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":token};

	data = employeeObject;
	data.first_name = employeeObject.name;
	fetchProps.body = JSON.stringify(data);

	let path = "api/users/", employeeId = 0;
	var msg = "Dodano pracownika. ";
	if(employeeObject.id && employeeObject.id > 0){
		employeeId = employeeObject.id;
		path += employeeId + "/";
		fetchProps.method = "PATCH";
		msg = "Zmodyfikowano pracownika. ";
	} else
		path += "create_user/";// SMTPAuthenticationError * /


	fetch(url + path, fetchProps).then(res => tryFetchJson(res) ).then(
		(result) => {
			if(result.hasOwnProperty('detail') )
				msg += "  " + String(result.detail);
			handleMessage(msg, true);
		},
		(error) => {
			console.log("Users: eA");
			handleMessage("Błąd. " + error, false);
		}
	);
	return true;
}

export function uploadAvatar(handleSuccess, avatarFile, employeeObject){
	let url = getPath(), data, token = getCookie('csrftoken'),
		fetchProps = {method:"POST", headers:{"Accept":"application/json", "X-CSRFToken":token, "Authorization": "Token " + token}, body:null};

	if(employeeObject.id && employeeObject.id > 0){
		let data = {id: employeeObject.id};
		fetchProps.body = JSON.stringify(data);
	}

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

export function employeeRemove(handleSuccess, userId){
	if(userId < 2)
		return false;
	let url = getPath(), data, token = getCookie('csrftoken'),
		fetchProps = {method:"DELETE", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":token}};

	data = {"id": userId};
	fetchProps.body = JSON.stringify(data);

	fetch(url + "api/users/" + userId + "/", fetchProps).then(res => tryFetchJson(res) ).then(
		(result) => {
			let msg = "Pracownik usunięty";
			if(result.hasOwnProperty('detail') )
				msg += "  " + result.detail;
			handleSuccess(msg);
		},
		(error) => {
			handleSuccess("Kłopoty z usunięciem pracownika!");
		}
	);
	return true;
}

export default Users;

