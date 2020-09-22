
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

