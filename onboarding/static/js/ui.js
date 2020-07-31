
export var dTab = centralTable();
export var pForm = newPackageForm();
var menuAndForm = firstMenuAndFormInfo();
const dFormat = new Intl.DateTimeFormat(undefined, {year: 'numeric', month: 'long', day: 'numeric', weekday:'long'});

function centralTable(){
	var tab = {table:null, tbody:null, head:null, names:{}}, nms;
	nms = {packages:"Package Name"};
	tab.names = nms;// names for translations;

	tab.table = document.getElementById("packages_table");
	if(!tab.table)
		return tab;

	tab.head = document.getElementsByTagName("thead");
	let testCase = false;
	if(tab.head){
		testCase = true;
		if(tab.head.length < 1)
			testCase = false;
	}

	if(!testCase){
		tab.head = document.createElement("thead");
		tab.table.appendChild(tab.head);
	} else
		tab.head = tab.head[0];

	tab.tbody = tab.table.getElementsByTagName("tbody");
	testCase = false;
	if(tab.tbody){
		testCase = true;
		if(tab.tbody.length < 1)
			testCase = false;
	}

	if(!testCase){
		tab.tbody = document.createElement("tbody");
		tab.table.appendChild(tab.tbody);
	} else
		tab.tbody = tab.tbody.tbody;

	return tab;
}

function newPackageForm(){
	var pForm = document.getElementById("packages_form");
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

function formInfo(){
	var form = {container:null, title:null, desc:null, button:null};
	form.container = document.getElementById("page_info");
	if(!form.container)
		return form;

	form.button = form.container.getElementsByTagName("button");
	if(form.button.length > 0)
		form.button = form.button[0];
	else
		form.button = null;

	return form;
}

function firstMenuAndFormInfo(){
	var nodes = {menu:null, iForm:{}};
	nodes.iForm = formInfo();
// todo: finish getting left menu and title-description-form;
	nodes.menu = document.getElementById("stacked-menu");
	return nodes;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function unDisplay(node){
	if(node.style.display=="none")
		node.style.display="";// default;
	else
		node.style.display="none";
}

function clearNode(node){
	var nod = node.firstChild;
	while(nod){
		node.removeChild(nod);
		nod = node.firstChild;
	}
}

function clearTable(){
	if(!dTab.table)
		return

	clearNode(dTab.tbody);

	return dTab.tbody;
}

function addRow(contentArray, parent){
	let tr, i, td = null, ptab = dTab.table;
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

function createDelete(id){
	var a = document.createElement("a");
	a.appendChild( document.createTextNode("delete") );
	a.href = "#";
	a.setAttribute("id", id);
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

		arr[4] = "";
		lnk = "";
		if(result[i].hasOwnProperty("id")){
			lnk = result[i].id;
		}

		lastTd = addRow(arr, tbody);
		if(lastTd){
			lnk = createDelete(lnk);
			lastTd.appendChild(lnk);
			links.push(lnk);
		}
	}

	sidePanel(result);// here for now;
	return links;
}

function deleteNthRow(e){
	var aLink = e.target||e.srcElement, row = aLink.parentNode;
	e.preventDefault();

	while(row.nodeName.toLowerCase() != "tr" && row.nodeName.toLowerCase() != "body")
		row = row.parentNode;

	if(row.nodeName.toLowerCase() == "body")
		return;
	row.parentNode.removeChild(row);
}

export function deleteFromPackages(e){
	var p_id=-1, aLink = e.target||e.srcElement;

	p_id = aLink.getAttribute("id");// link.dataset.id;
	deleteNthRow(e);

	if(isNaN(parseFloat(p_id)) || isNaN(p_id - 0) ){
		return;
	}

	var liContainer = getNthMenuItem(0);// first <li class="menu-item"> by now;
	if(!liContainer)
		return;

	var list = liContainer.getElementsByTagName("li"), i = list.length - 1, idCheck;
	for(; i >= 0; i--){
		idCheck = list[i].getAttribute("id_1");// link.dataset.id;

		if(isNaN(parseFloat(p_id)) || isNaN(p_id - 0) )
			continue;

		if(idCheck === p_id){
			list[i].parentNode.removeChild(list[i]);
			return;
		}
	}
}

// - - - dynammic left menu;

function getNthMenuItem(number){
	if(!menuAndForm.menu)
		return null;

	var list = menuAndForm.menu.getElementsByTagName("ul");
	if(list.length < 1)
		return null;

	list = list[0];
	var lis = list.getElementsByTagName("li");
	if(lis.length < 1)
		return null;

	// get number-th <li class=" menu-item "> from lis[]:
	var i, j, item = null;
	for(i = j = 0; i < lis.length; i++){
		if((' ' + lis[i].className + ' ').indexOf(" menu-item ") > -1){// lis[i].classList.contains("menu-item");
			if(j == number){
				item = lis[i];
				break;
			}
			j++;
		}
	}

	return item;
}

function deleteMenuItems(number){
	var item = getNthMenuItem(number);

	if(item == null)
		return null;

	var list = item.getElementsByTagName("ul");
	for(let i = 0; i < list.length; i++)
		item.removeChild(list[i]);

	return item;
}

export function sidePanel(result, url){
	var liContainer = deleteMenuItems(0);// first <li class="menu-item"> by now;
	if(!liContainer || result.length < 1)
		return;

	if((' ' + liContainer.className + ' ').indexOf(" has-child ") < 0)// liContainer.classList.add("has-child");
		liContainer.className += " has-child";
	if((' ' + liContainer.className + ' ').indexOf(" has-open ") < 0)// liContainer.classList.add("has-open");
		liContainer.className += " has-open";

	var lis = document.createElement("ul");
	lis.className = "menu";
	liContainer.appendChild(lis);
	liContainer = lis;

	let i, len = result.length, link;
	for(i = 0; i < len; i++){
		if(!result[i].hasOwnProperty("title") )
			continue;

		lis = document.createElement("li");
		lis.className="menu-item";
		if(result[i].hasOwnProperty("id")){
			lis.setAttribute("id_1", result[i].id);
		}

		link = document.createElement("a");
		link.appendChild(document.createTextNode(result[i].title) );
		link.href="/onboarding/bootstrap/package-page/";
		link.className="menu-link";
		if(menuAndForm.iForm.container)
			link.onclick=function(){unDisplay(menuAndForm.iForm.container);};

		lis.appendChild(link);
		liContainer.appendChild(lis);
	}

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
    }
]
*/
