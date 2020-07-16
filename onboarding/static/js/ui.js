
var dTab = document.getElementById("package_table");

export function clearTable(){
	if(!dTab)
		return

	var i, n = dTab.rows.length;

	if(n > 2){
		console.log(dTab.rows[n - 1]);
		dTab.deleteRow(n - 1);
		setTimeout(clearTable, 1500);
	}
}

//export { clearTable as default };

