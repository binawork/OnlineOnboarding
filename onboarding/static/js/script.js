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

function newPackage(e){
	e.preventDefault();
	e.returnValue = false;
	var button = e.target||e.srcElement, url = "http://localhost:8000/onboarding/api/package/create/",
		packageName = pForm.input.value,
		fetchProps = {method:"GET", headers:{"Accept":"application/json", "X-CSRFToken":tok}};

	if(!packageName || packageName.length < 1){
		return;
	}

	console.log(packageName);
}

if(dTab){
	contentGET(path, printPackages);

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

