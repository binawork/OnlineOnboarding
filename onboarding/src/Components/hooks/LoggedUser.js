import React, { useRef, useEffect } from "react";
import { getPath/*, getCookie*/ } from "../utils.js";

function LoggedUser(){
	const loggedUserRef = useRef({id: 0, email: "", first_name: "", last_name: "",
							phone_number: "", location: "", team: "",
							job_position: "",last_login: "", avatar: ""});

	useEffect(() => {
		let url = getPath(),
			fetchProps = {method:"GET", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":""}};

		fetch(url + "api/users/login_user/", fetchProps).then(res => res.json()).then(
			(result) => {
				if(result.length > 0) loggedUserRef.current = result[0];
				else loggedUserRef.current = result;
			},
			(error) => {
				//console.log(error);
			}
		);console.log("   Use effect is used");
	}, []);

	return loggedUserRef.current;
}

export default LoggedUser;

