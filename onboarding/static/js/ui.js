
export var dTab = document.getElementById("package_table");
const dFormat = new Intl.DateTimeFormat(undefined, {year: 'numeric', month: 'long', day: 'numeric', weekday:'long'});

export function newPackageForm(){
	var pForm = document.getElementById("package_form");
	if(!pForm)
		return false;

	var result = {input:null, button:null}, btn, inputs, i;
	btn = pForm.getElementsByTagName("button");
	inputs = pForm.getElementsByTagName("input");

	if(inputs.length > 0)
		result.input = inputs[0];
	if(btn.length > 0)
		result.button = btn[0];

	return result;
}

function clearTable(){
	if(!dTab)
		return

	var i, n = dTab.rows.length;
	while(n > 1){
		dTab.deleteRow(n - 1);
		n--;
	}
	var tb = document.createElement("tbody");
	dTab.appendChild(tb);
	return tb;
}

function addRow(contentArray, parent){
	let tr, i, td = null, ptab = dTab;
	if(parent)
		ptab = parent;

	tr = document.createElement("tr");

	for(i = 0; i < contentArray.length; i++){
		td = tr.insertCell(-1);
		td.className = "align-middle";
		td.appendChild( document.createTextNode(contentArray[i]) );
	}
	ptab.appendChild(tr);
	return td;
}

function createDelete(){
	var a = document.createElement("a");
	a.appendChild( document.createTextNode("delete") );
	a.href = "#";
	a.addEventListener("click", deleteNthRow, false);
	return a;
}


export function printPackages(result){
	if( Object.prototype.toString.call(result) !=='[object Array]' )
		return [];// log-error;

	var len = result.length;

	if(len < 1)
		return [];

	var arr=["","","","",""], i, lastTd, tbody, links = [], lnk;
	tbody = clearTable();
	for(i = 0; i < len; i++){
		if(result[i].hasOwnProperty("title") ){
			arr[0] = result[i].title;
		} else
			arr[0] = "";

		if(result[i].hasOwnProperty("pages")){
			arr[1] = result[i].pages.length;
		} else
			arr[1] = "";

		let date;
		if(result[i].hasOwnProperty("created_on")){
			date = new Date( Date.parse(result[i].created_on) );
			arr[2] = dFormat.format(date);
		} else
			arr[2] = "";

		if(result[i].hasOwnProperty("updated_on")){
			date = new Date( Date.parse(result[i].updated_on) );
			arr[3] = date.toDateString();//.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();
		} else
			arr[3] = "";

		// todo: create delete button;
		arr[4] = "";
		lastTd = addRow(arr, tbody);
		if(lastTd){
			lnk = createDelete();
			lastTd.appendChild(lnk);
			links.push(lnk);
		}
	}
	return links;
}

export function deleteNthRow(e){
	var aLink = e.target||e.srcElement, row = aLink.parentNode;
	e.preventDefault();

	while(row.nodeName.toLowerCase() != "tr" && row.nodeName.toLowerCase() != "body")
		row = row.parentNode;

	if(row.nodeName.toLowerCase() == "body")
		return;
	row.parentNode.removeChild(row);
}

export function sidePanel(){

}

//export { clearTable as default };

/*

{
    "title": "TTTT",
    "description": ""
}


[
    {
        "id": 15,
        "title": "aaa 1 1 1",
        "description": "11 11 22",
        "created_on": "2020-07-16T14:58:40.353908Z",
        "updated_on": "2020-07-16T14:58:40.353932Z",
        "owner": 1,
        "pages": [],
        "email": []
    },
    {
        "id": 14,
        "title": "aaa 1 1 1",
        "description": "11 11 22",
        "created_on": "2020-07-16T14:53:31.533944Z",
        "updated_on": "2020-07-16T14:53:31.533986Z",
        "owner": 1,
        "pages": [],
        "email": []
    },
    {
        "id": 13,
        "title": "aaa 1 1 1",
        "description": "11 11 22",
        "created_on": "2020-07-16T14:53:21.057183Z",
        "updated_on": "2020-07-16T14:53:21.057209Z",
        "owner": 1,
        "pages": [],
        "email": []
    },
    {
        "id": 12,
        "title": "test widoku stron w paczce",
        "description": "test widoku stron w paczce",
        "created_on": "2020-07-16T12:40:12.371185Z",
        "updated_on": "2020-07-16T12:40:12.371210Z",
        "owner": 1,
        "pages": [
            4,
            5,
            6
        ],
        "email": []
    },
    {
        "id": 11,
        "title": "start",
        "description": "adsffsfxzc",
        "created_on": "2020-07-16T09:27:52.661406Z",
        "updated_on": "2020-07-16T09:27:52.661434Z",
        "owner": 1,
        "pages": [],
        "email": []
    },
    {
        "id": 10,
        "title": "star warszxczx",
        "description": "adsffsfxzc",
        "created_on": "2020-07-16T09:26:29.707747Z",
        "updated_on": "2020-07-16T09:26:29.707899Z",
        "owner": 1,
        "pages": [],
        "email": []
    },
    {
        "id": 9,
        "title": "star warszxczx",
        "description": "adsffsfxzc",
        "created_on": "2020-07-16T09:26:19.798674Z",
        "updated_on": "2020-07-16T09:26:19.798735Z",
        "owner": 1,
        "pages": [],
        "email": []
    },
    {
        "id": 8,
        "title": "star warszxczx",
        "description": "adsffsfxzc",
        "created_on": "2020-07-16T09:23:14.332419Z",
        "updated_on": "2020-07-16T09:23:14.332452Z",
        "owner": 1,
        "pages": [],
        "email": []
    },
    {
        "id": 7,
        "title": "star wars",
        "description": "adsffsf",
        "created_on": "2020-07-16T09:23:07.390798Z",
        "updated_on": "2020-07-16T09:23:07.390846Z",
        "owner": 1,
        "pages": [],
        "email": []
    },
    {
        "id": 6,
        "title": "star wars",
        "description": "adsffsf",
        "created_on": "2020-07-16T09:22:58.650551Z",
        "updated_on": "2020-07-16T09:22:58.650585Z",
        "owner": 1,
        "pages": [],
        "email": []
    },
    {
        "id": 5,
        "title": "api test 1",
        "description": "1st api test",
        "created_on": "2020-07-16T08:18:38.969347Z",
        "updated_on": "2020-07-16T08:18:38.969386Z",
        "owner": 1,
        "pages": [],
        "email": []
    },
    {
        "id": 4,
        "title": "api test 1",
        "description": "1st api test",
        "created_on": "2020-07-16T07:56:08.510825Z",
        "updated_on": "2020-07-16T07:56:08.510864Z",
        "owner": 1,
        "pages": [],
        "email": []
    },
    {
        "id": 1,
        "title": "aaa",
        "description": "aaacvxvfffhhhh",
        "created_on": "2020-07-15T18:07:00.630728Z",
        "updated_on": "2020-07-15T18:08:04.703781Z",
        "owner": 1,
        "pages": [
            1,
            2,
            3
        ],
        "email": []
    }
]
*/
