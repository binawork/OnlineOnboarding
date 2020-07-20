
var dTab = document.getElementById("package_table");

export function clearTable(){
	if(!dTab)
		return

	var i, n = dTab.rows.length;

	if(n > 2){
		console.log(dTab.rows[n - 1]);
		dTab.deleteRow(n - 1);
		setTimeout(clearTable, 30);
	}
}

export function deleteNthRow(e){
	var aLink = ev2.target||ev2.srcElement, row = aLink.parentNode;

	while(row.nodeName.toLowerCase() != "tr" && row.nodeName.toLowerCase() != "body")
		row = row.parentNode;

	if(row.nodeName.toLowerCase() == "body")
		return;
	row.parentNode.removeChild(row);
}

//export { clearTable as default };

