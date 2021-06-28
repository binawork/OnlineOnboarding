(function(n, d){
	let mainLang = n.languages ? n.languages[0] : (n.language || n.userLanguage), mail = "", text = "C";
	let arr = ['t', 'c', 'a', 't', 'n', 'o', 'c'], i = arr.length - 1, isNext = false;

	if(/pl/i.test(mainLang) ){
		arr[1] = arr[i] = 'k';
		text = "K";
	}
	for(; i >= 0; i--){
		mail += arr[i];
		if(isNext){
			text += arr[i];
		}
		isNext = true;
	}

	mail += "@";
	mail += "onboardingstep.com";// location.hostname (www);
	let containers = document.querySelectorAll(".js-mail"), a = "mail";
	i = containers.length - 1;
	mail = a + "to:" + mail;

	for(; i >= 0; i--){
		a = d.createElement("a");
		a.href = mail;
		a.rel = "nofollow";

		a.appendChild(d.createTextNode(text) );
		a.className = "nav-link";
		containers[i].appendChild(a);
	}
})(navigator, document);
