import { clearTable, deleteNthRow } from "./ui.js";

function getToken(){
	var inputs = document.getElementsByTagName("input"), i, tok="";

	for(i = inputs.length - 1; i>=0; i--){
		if(inputs[i].name === "csrfmiddlewaretoken"){
			tok=inputs[i].value;
			break;
		}
	}
	return tok;
}

var path = "http://localhost:8000/onboarding/api/packages/", tok, fetchProps;

	tok = getToken();

	fetchProps = {method:"GET", headers:{"Accept":"application/json", "X-CSRFToken":tok}};
fetch(path, fetchProps).then(function(res){return res.json();}).then(
	(resParsed) => {console.log(resParsed);},
	(error) => {console.log("Can not load API, " + error);}
);

if(dTab){
	let links = dTab.getElementsByTagName("a"), i;
	for(i = links.length - 1; i >= 0; i--){
		// todo: add event listeners;
	}
}

