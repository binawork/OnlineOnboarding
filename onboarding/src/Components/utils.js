
const dFormat = new Intl.DateTimeFormat(undefined, {year: 'numeric', month: 'long', day: 'numeric', weekday:'long'});

export function getPath(){
	var url = "";
	if(!window.location.origin){
		url = window.location.protocol +"//"+ window.location.host;
	} else url = window.location.origin;

	if(url===null || !(url) || (typeof url==='string' && url=='null')) url="";
	let rrs=/\/$/.test(url);
	if(!rrs) url=url+"/";
	return url;
}

/**
 * Checks if url is a address of website itself;
 * @param url: string af page/path address
 * @param defaultUrl: default url to use;
 * @returns {*}
 */
export function validateURL(url, defaultUrl) {
	let a  = document.createElement('a');
	a.href = url;
	if(a.host && a.host != window.location.host){
		// maybe also: if(url.startsWith(getPath()) ) return url;
		return defaultUrl;
	}

	return url;
}

export function dateToString(str){
	var date, formatted;
	try {
		date = new Date( Date.parse(str) );
		formatted = dFormat.format(date);
	}catch(e){
		//console.log(e);
		formatted = str;
	}
	return formatted;
}


export function getCookie(name) {
	var cookieValue = null;
	if(document.cookie && document.cookie !== ''){
		let cookies = document.cookie.split(';'), i, cookie;
		for(i = 0; i < cookies.length; i++){
			cookie = cookies[i].trim();
			if(cookie.substring(0, name.length + 1) === (name + '=')){
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}

export function tryFetchJson(res, noJsonMessage){
	let result = "";
	var noJsonObj = {detail: ""};
	if(typeof noJsonMessage === 'string')
		noJsonObj.detail = noJsonMessage;

	if(!res.ok){
		result = res.json().catch(() => {
			throw new Error(noJsonObj.detail)
		});
	} else {
		result = res.text();
	}
	return result;
}

export function validEmail(email){
	let regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regExp.test(String(email));
}

export function isNumber(val){
	return ( Object.prototype.toString.call(val)!=='[object Array]' && (val-parseFloat(val)+1)>=0)?true:false;
}

export function clickButtonAfterPressingEnter(e, buttonId) {
	if (e.key === "Enter") {
			e.preventDefault();
			document.getElementById(buttonId).click();
	}
}

export function onDragEnd(result, list, setList) {
	// destination, source -> objects in which you can find the index of the destination and index of source item
	const { destination, source, reason } = result;
	// Not a thing to do...
	if (!destination || reason === "CANCEL") {
		return;
	}
	//If drop an element to the same place, it should do nothing
	if (
		destination.droppableId === source.droppableId &&
		destination.index === source.index
	)
		return;

	const droppedSection = list[source.index];
	const pageSections = [...list];

	pageSections.splice(source.index, 1);
	pageSections.splice(destination.index, 0, droppedSection);

	const updatedList = pageSections.map((qa, index) => {
		qa.order = index + 1;
		return qa;
	});

	setList(updatedList);
};