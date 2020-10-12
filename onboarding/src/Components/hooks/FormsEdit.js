import React, { useState, useEffect } from "react";
import { getPath, getCookie } from "../utils.js";

/**
 * todos: get page sections;
 */
function FormsEdit(props){
	/*var [rows , setRows] = useState([]),
		[loaded, isLoaded] = useState(false);
	const [error, showError] = useState(null);
	let url = getPath(),
		fetchProps = {method:"GET", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":""}};

	useEffect(() => {
		fetch(url + "api/page/" + props.id + "/list_by_package_hr/", fetchProps).then(res => res.json()).then(
			(result) => {
				isLoaded(true);
				setRows(result);
			},
			(error) => {
				console.log(error);
			}
		);
	}, [props.count]);

	if(error){
		return <FormTableRow key={0} row={ {name: error.message, last_edit: ""} }/>
	} else if(!loaded)
		return <FormTableRow key={0} row={ {name: "Ładowanie ...", last_edit: ""} }/>
	else {
		var form_table = [], i, count = rows.length;
		for(i = 0; i < count; i++)
			form_table.push(<FormTableRow key={ rows[i].id }
								row={ {name: rows[i].title, order: rows[i].order, last_edit: "<do poprawy po stronie api>",
									description: rows[i].description, link: rows[i].link, key: rows[i].id } }
								handleUpdate = { props.handleUpdate } />);
		return ( <>{ form_table }</> )
	}*/

}

/**
 * Sends page details to update/edit;
 */
export function savePageDetails(handleSuccess, pageId, title, link, description){
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
	if(link){
		if(typeof link === "string" && link.length > 0){
			data.link = link;
			dontUpdate = false;
		}
	}


	if(dontUpdate)
		return false;

	let url = getPath(), token = getCookie('csrftoken'),
		fetchProps = {method:"PATCH", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":token}};

	fetchProps.body = JSON.stringify(data);

	fetch(url + "api/page/" + pageId + "/", fetchProps).then(res => res.json()).then(
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

export default FormsEdit;

