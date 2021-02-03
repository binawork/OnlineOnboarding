import React, { useState, useRef, useEffect } from "react";
import { getPath/*, getCookie*/ } from "../utils.js";

function LoggedUser(editLoggedUser){
	const userModel = {id: 0, email: "", first_name: "", last_name: "",
							phone_number: "", location: "", team: "",
							job_position: "",last_login: "", avatar: "", welcome_board: null};
	const loggedUserRef = useRef(userModel), [loggedUser, setUser] = useState(userModel);

	const [error, showError] = useState(false), [loaded, isLoaded] = useState(false);

	useEffect(() => {
		let url = getPath(),
			fetchProps = {method:"GET", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":""}};

		fetch(url + "api/users/login_user/", fetchProps).then(res => res.json()).then(
			(result) => {
				if(result.length > 0){
					loggedUserRef.current = result[0];
					setUser(result[0]);
				} else {
					loggedUserRef.current = result;
					setUser(result);
				}
				isLoaded(true);

			},
			(error) => {
				showError(true);
			}
		);console.log("   Log-user effect is used");
	}, [editLoggedUser]);


	if(error){
		userModel.first_name = "(problem z pobraniem)";
		return userModel;
	} else if(!loaded){
		userModel.first_name = "";
		return userModel;
	}

	return loggedUserRef.current;
}

export default LoggedUser;

