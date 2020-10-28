
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

export function validEmail(email){
	let regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regExp.test(String(email));
}

