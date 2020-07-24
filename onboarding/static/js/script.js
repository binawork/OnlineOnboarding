import { printPackages, deleteNthRow, dTab, newPackageForm } from "./ui.js";

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

var path = "http://localhost:8000/onboarding/api/packages/", tok;

	tok = getToken();

function contentGET(url, responseFun){
	var fetchProps;
	fetchProps = {method:"GET", headers:{"Accept":"application/json", "X-CSRFToken":tok}};
	
	fetch(url, fetchProps).then(function(res){return res.json();}).then(
		(resParsed) => {console.log(resParsed);responseFun(resParsed);},
		(error) => {console.log("Can not load API, " + error);}
	);
}

function contentDEL(url, responseFun){
	var fetchProps;
	fetchProps = {method:"DELETE", headers:{"Accept": "application/json", "Content-Type": "application/json", "X-CSRFToken":tok}};

	fetch(url, fetchProps).then(function(res){return res.json();}).then(
		(resParsed) => {console.log(resParsed);responseFun(resParsed);},
		(error) => {console.log("Can not load API, " + error);}
	);
}

function newPackage(e){
	e.preventDefault();
	e.returnValue = false;
	var button = e.target||e.srcElement, url = "http://localhost:8000/onboarding/api/package/create/",
		packageName = pForm.input.value;

	if(!packageName || packageName.length < 1){
		return;
	}

	var fetchProps = {method:"POST", headers:{"Accept": "application/json", "Content-Type": "application/json", "X-CSRFToken": tok}, body:JSON.stringify({title: packageName, description: "Please fill description here"})};

	fetch(url, fetchProps).then(function(res){return res.json();}).then(
		(resParsed) => {console.log(resParsed);if(resParsed.hasOwnProperty("title"))contentGET(path, printPackages);},
		(error) => {console.log("Can not load API, " + error);}
	);
}

function delPackage(e){
	e.preventDefault();
	e.returnValue = false;
	var link, id;

	link = e.target||e.srcElement;
	id = link.getAttribute("id");// link.dataset.id;
	if(isNaN(parseFloat(id)) || isNaN(id - 0) ){
		return;
	}

	var url = "http://localhost:8000/onboarding/api/package/", fetchProps;
	url = url + id + "/";
	contentDEL(url, function(res){console.log(res);});
}


function printPackagesWithLinks(response){
	var links = printPackages(response), i;
	for(i = links.length - 1; i >= 0; i--){
		console.log(links[i]);
	}
}

if(dTab){
	contentGET(path, printPackagesWithLinks);

	let links = dTab.getElementsByTagName("a"), i;
	for(i = links.length - 1; i >= 0; i--){
		links[i].addEventListener("click", deleteNthRow, false);
	}
}

var pForm = newPackageForm();
if(pForm != false){
	if(pForm.button && pForm.input)
		pForm.button.addEventListener("click", newPackage, false);

}

