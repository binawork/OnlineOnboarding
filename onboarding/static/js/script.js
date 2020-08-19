import { printPackages, deleteFromPackages, dTab, pForm } from "./ui.js";

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

function getPath(){
	var url = "";
	if(!window.location.origin){
		url = window.location.protocol +"//"+ window.location.host;
	} else url = window.location.origin;

	if(url===null || !(url) || (typeof url==='string' && url=='null')) url="";
	let rrs=/\/$/.test(url);
	if(!rrs) url=url+"/";
	return url;
}


var path = getPath() + "onboarding/api/", tok;
	tok = getToken();


function contentGET(url, responseFun){
	var fetchProps;
	fetchProps = {method:"GET", headers:{"Accept":"application/json", "X-CSRFToken":tok}};
	
	fetch(url, fetchProps).then(function(res){return res.json();}).then(
		(resParsed) => {console.log(resParsed);responseFun(resParsed);},
		(error) => {console.log("Can not load API, " + error);}
	);
}

// when new package created/requested, del button listens delPackage() which sends this function;
function contentDEL(url, responseFun){
	var fetchProps;
	fetchProps = {method:"DELETE", headers:{"Accept": "application/json", "Content-Type": "application/json", "X-CSRFToken":tok}};

	fetch(url, fetchProps).then(
		(res) => {responseFun(res);},
		(error) => {console.log("Can not load API, " + error);}
	);
}

function newPackage(e){
	e.preventDefault();
	e.returnValue = false;
	var button = e.target||e.srcElement, url = path + "package/create/",
		packageName = pForm.input.value;

	if(!packageName || packageName.length < 1){
		return;
	}

	var fetchProps = {method:"POST", headers:{"Accept": "application/json", "Content-Type": "application/json", "X-CSRFToken": tok}, body:JSON.stringify({title: packageName, description: "Please fill description here"})};

	fetch(url, fetchProps).then(function(res){return res.json();}).then(
		(resParsed) => {console.log(resParsed);if(resParsed.hasOwnProperty("title")){contentGET(path+"packages/", printPackagesWithLinks);pForm.input.value="";} },
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

	var url = path + "package/";
	url = url + id;
	contentDEL(url, function(res){if(res.status==204/* && res.ok */)deleteFromPackages(e);});
}


function printPackagesWithLinks(response){
	var links = printPackages(response), i;
	for(i = links.length - 1; i >= 0; i--){
		links[i].addEventListener("click", delPackage, false);
		// clicking links fires contentDEL() after which row is removed if request is accepted;
		// deleteFromPackages(e);
	}
}

if(dTab.table){
	contentGET(path+"packages/", printPackagesWithLinks);
}

if(pForm != false){
	if(pForm.button && pForm.input)
		pForm.button.addEventListener("click", newPackage, false);

}

