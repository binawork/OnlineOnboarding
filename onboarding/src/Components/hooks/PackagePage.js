import React, { useState, useEffect } from "react";
import { getPath, getCookie, tryFetchJson } from "../utils.js";
import FormTableRow from "../FormTable/FormTableRow";
import FormPackageEdit from "../FormTable/FormPackageEdit";

/**
 * Get pages for package with defined id from Onboarding API when FormTable component is loaded;
 */
function PackagePage(props){
	var [rows , setRows] = useState([]),
		[loaded, isLoaded] = useState(false);
	const [error, showError] = useState(null);
  const [newRowId, setNewRowId] = useState(null);

	let url = getPath(),
		fetchProps = {method:"GET", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":""}};

	useEffect(() => {
		fetch(url + "api/page/" + props.id + "/list_by_package_hr/", fetchProps).then(res => res.json()).then(
			(result) => {
				isLoaded(true);
				setRows(result.sort((a, b) => b.id - a.id));
				const ids = result.map((res) => res.id);
				const maxId = Math.max(...ids);
				setNewRowId(maxId);
			},
			(error) => {
				showError(error);
				console.log(error);
			}
		);
	}, [props.count]);

	if(error){
		return <FormTableRow key={0} row={ {name: error.message, last_edit: ""} }/>
	} else if(!loaded)
		return <FormTableRow key={0} row={ {name: "Ładowanie ...", last_edit: ""} }/>
	else {
		var form_table = [], count = rows.length, maxOrder = -1, order;
		let i, loggedUser = {id:0, first_name: ""};

		if(props.loggedUser)
			loggedUser = props.loggedUser;

		for(i = 0; i < count; i++){
			order = parseInt(rows[i].order, 10);
			form_table.push(
        <FormTableRow
          key={rows[i].id}
          packageId={props.id}
          row={{
            name: rows[i].title,
            order: order,
            last_edit: rows[i].updated_on,
            description: rows[i].description,
            link: rows[i].link,
            key: rows[i].id,
          }}
          handleRemoveAsk={ props.handleRemoveAsk }
          handleUpdate={props.handleUpdate}
          lastRow={newRowId === rows[i].id}
          loggedUser={loggedUser}
        />
      );
			if(order > maxOrder)
				maxOrder = order;
		}

		props.updateOrder(maxOrder);

		return ( <>{ form_table }</> )
	}

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
			handleSuccess("Strona została usunięta.");
		},
		(error) => {
			handleSuccess(error);
		}
	);
	return true;
}

export default PackagePage;

