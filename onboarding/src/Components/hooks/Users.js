/* eslint-disable react-hooks/rules-of-hooks */
import { getPath, getCookie, tryFetchJson } from "../utils.js";
import useFetch from "./useFetch.js";
//import UserListRow from "../UsersList/UserListRow";

function checkUser(userObject, userId){
	const singleUser = {id: userId, name: "", first_name: "", last_name: "", email: "", tel: "",
				position: "", department: "", location: "", sent: "", finished: "", avatar:""};

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
function Users(loggedUserId, setUsers, setSearchResult, isLoaded, showError) {
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
        .filter((user) => user.id !== loggedUserId)
        .map((user) => {
          user = checkUser(user, user.id);
          return user;
				})
				.sort((a,b) => a.id - b.id);

			setUsers(users);
			if(setSearchResult) setSearchResult(users);
    })
    .catch((error) => {
      showError(true);
      console.log(error);
		})
		.finally(() => isLoaded(true));
}

export function getUserById(id) {
	const url = getPath(),
	fetchProps = {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			"X-CSRFToken": "",
		},
	};

  const { data, isLoading, error } = useFetch(`${url}api/users/${id}`, fetchProps);

	return { data, isLoading, error };
}

/**
 * 
 * employeeObject = {name: "", last_name: "", email: "", tel: "", department: "", location: "", position: ""};
 */
export function employeeAddEdit(handleMessage, employeeObject, updateData){
	// if(avatarSaveError) {
	// 	handleMessage("Nie udało się zapisać avatara!", false);
	// 	return false;
	// }
	if(typeof employeeObject.first_name !== "string" || typeof employeeObject.last_name !== "string"
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

	data = {
		email: employeeObject.email,
		first_name: employeeObject.first_name,
		last_name: employeeObject.last_name,
		phone_number: employeeObject.tel,
		location: employeeObject.location,
		team: employeeObject.department,
		job_position: employeeObject.position,
	};
	fetchProps.body = JSON.stringify(data);

	let path = "api/users/", employeeId = 0;
	var msg = "Dodano pracownika. ";
	if(employeeObject.id && employeeObject.id > 0){
		employeeId = employeeObject.id;
		path += employeeId + "/";
		fetchProps.method = "PATCH";
		msg = "Pomyślnie zapisano dane. ";
	} else
		path += "create_user/";// SMTPAuthenticationError * /

	fetch(url + path, fetchProps)
		.then(res => {
			if(!res.ok) {
				throw Error("Nie udało się zapisać danych. Upewnij się, że pracownik o podanym adresie Email nie został już dodany.");
			}
			return tryFetchJson(res);
		})
		.then((result) => {
			if(result.hasOwnProperty('detail') )
				msg += "  " + String(result.detail);
			handleMessage(msg, true);
			updateData?.();
		},
		(error) => {
			// console.log("Users: eA");
			handleMessage("Wystąpił błąd: " + error.message, false);
		}
	);
	return true;
}

/**
 * Updates user (mainly employee) on endpoint for some (not most) data.
 * @param handleMessage - function to call on response;
 * @param employeeObject - object with same fields like those listed in serializer,
 *   {first_name": String,
    "last_name": String,
    "phone_number": String};
 */
export function employeeSelfEdit(handleMessage, employeeObject){
	let url = getPath(), userData, token = getCookie('csrftoken'),
		fetchProps = {method: "PATCH", headers: {}, body: null};

	fetchProps.headers = {"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":token};

	userData = {...employeeObject};
	if(userData.avatar)
		delete userData.avatar;

	if(typeof userData.id)
		delete userData.id;

	if(userData.name)
		userData.first_name = userData.name;

	fetchProps.body = JSON.stringify(userData);

	fetch(url + "api/users/update_user/", fetchProps).then(res => {
			if(!res.ok)
				throw Error("Nie udpało się zapisać zmian.");
			return res.json();
		}
	).then((result) => {
			let msg = "Zaktualizowano dane.";
			if(Object.keys(result).length < 1){
				msg = "Aktualizacja danych nie nastąpiła: brak właściwych pól.";
			} else {
				msg = "Zaktualizowano dane.";
				if(result.hasOwnProperty("detail"))
					msg += " " + result.detail;
			}

			handleMessage(msg, true);
		},
		(error) => {
			handleMessage("Wystąpił błąd: " + error.message, false);
		}
	).catch(err => {
		handleMessage(err.message, false);
	});
}

export function uploadAvatar(handleSuccess, avatarFile, employeeObject, showModal, updateData){
// export function uploadAvatar(avatarFile, employeeObject){
	let data = new FormData();
	let url = getPath(), 
		token = getCookie('csrftoken'),
		fetchProps = {
			method:"POST", 
			headers:{"Accept":"application/json", "X-CSRFToken":token, "Authorization": "Token " + token}, 
			body:null
		};

	// if(employeeObject.id && employeeObject.id > 0){
	// 	data.id = employeeObject.id;
	// 	fetchProps.body = JSON.stringify(data);
	// }
	// data = new FormData();
	// data.append('id', employeeObject.id);
	data.append('avatar', avatarFile);
	fetchProps.body = data;
	fetch(url + 'api/user-avatar/', fetchProps)
		.then(response => {
			if(!response.ok) {
				throw Error("Wystąpił błąd podczas zapisywania avatara!")
			}
			return response.json();
		})
		.then(data => {
				handleSuccess(data);
				employeeAddEdit(showModal, employeeObject);
				updateData();
				return data;
		})
		.catch(error => {
			showModal(error.message);
			console.error('Error:', error);
		});
}

export function employeeRemove(handleSuccess, userId, setLoadingSave){
	setLoadingSave(true);
	if(userId < 2)
		return false;
	let url = getPath(), data, token = getCookie('csrftoken'),
		fetchProps = {method:"DELETE", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":token}};

	data = {"id": userId};
	fetchProps.body = JSON.stringify(data);

	fetch(url + "api/users/" + userId + "/", fetchProps)
		.then(res => {
			if(!res.ok) {
				throw Error("Nie udało się usunąć pracownika!");
			}
			return tryFetchJson(res);
		})
		.then((result) => {
			let msg = "Pracownik został usunięty";
			if(result.hasOwnProperty('detail') )
				msg += "  " + result.detail;
			handleSuccess(msg);
		},
		(error) => {
			handleSuccess(error.message);
		})
		.finally(() => {
			setLoadingSave(false);
		});
	return true;
}

export default Users;

