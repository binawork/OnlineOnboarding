/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { getPath } from "../utils";

// - - - - -Functions to request raw numbers of progress without details for all users - - - - -

/**
 * Converts list like  [{id: Number, users: [Number, ...], pages: [{id: Number, order: Number, ...}, ...]}, ...]  into
 * object of userId as keys with:
 *  {packageIds: [Number, ...], progress: 0, pagesStarted: 0, pagesFinished: 0, pagesCount: Number,
 *   percentage: 0, pages: {packageId_1: [], packageId_2: [], ...}};
 * @param packagesWithUsersAndPages - result of response from /api/package_pages/users/:
 *  [{id: Number, users: [userId_1, ...], pages: [{id: Number, order: Number, owner: Number, package: Number}, ...]}, ...];
 * @returns {*} - usersObject;
 */
function packageUsersPagesToUsersListObject(packagesWithUsersAndPages){
	let usersObject = {};
	if(packagesWithUsersAndPages.length < 1)
		return usersObject;

	let count;

	packagesWithUsersAndPages.forEach((packageUsersAndPages) => {
		if(typeof packageUsersAndPages.users === 'undefined' || packageUsersAndPages.users === null)
			return;

		count = packageUsersAndPages.users.length;
		let i, userId, hasPages = false, packageId;
		if( packageUsersAndPages.hasOwnProperty("pages") && Array.isArray(packageUsersAndPages.pages) )
			hasPages = true;

		packageId = parseInt(packageUsersAndPages.id, 10);

		for(i = count - 1; i >= 0; i--){
			userId = parseInt(packageUsersAndPages.users[i], 10);

			if( !usersObject.hasOwnProperty(userId) ){
				usersObject[userId] = {packageIds: [], progress: 0, pagesStarted: 0, pagesFinished: 0, pagesCount: 0, percentage: 0, pages: {}};
				usersObject[userId].packageIds = new Set();
			}
			usersObject[userId].packageIds.add(packageId);

			// if the element in result has a set of pages -
			//  - add it to pages with packageId as key and include flags: started and finished;
			if(hasPages)
				usersObject[userId].pages[packageId] = packageUsersAndPages.pages.map(function(page){
					let newPage = {...page, started: false, finished: false};
					//page.started = page.finished = false;
					return newPage;
				});
		}
	});

	Object.keys(usersObject).forEach((userId) => {
		usersObject[userId].packageIds = Array.from(usersObject[userId].packageIds);

		// count sum o lengths of pages arrays in count += usersObject[userId].pages;
		count = 0;
		Object.keys(usersObject[userId].pages).forEach(function(packageId){
			count += usersObject[userId].pages[packageId].length;
		});
		usersObject[userId].pagesCount = count;
	});

	return usersObject;
}

/**
 *
 * @param progressAnswersListAll - eg. [{id: 1, owner: 2, section: {id: 1, page: 1, package_id: 3}, confirmed: false, finished: false}];
 * @param usersWithPackagesObject - result of the function above (packageUsersPagesToUsersListObject);
 * @returns {*} - usersWithPackagesObject  with fulfilled information about pages;
 */
function revertProgressOfUsers(progressAnswersListAll, usersWithPackagesObject){
	if(progressAnswersListAll.length < 1)
		return usersWithPackagesObject;


	progressAnswersListAll.forEach(function(progressAnswer){
		if(typeof progressAnswer.owner === 'undefined' || progressAnswer.owner === null
			|| typeof progressAnswer.section === 'undefined' || typeof progressAnswer.finished === 'undefined')
			return;

		let userId = parseInt(progressAnswer.owner, 10), packageId, pageId;
		// exit when usersWithPackagesObject has no userId inside;
		if( !usersWithPackagesObject.hasOwnProperty(userId) )
			return;


		packageId = progressAnswer.section.package_id;
		pageId = parseInt(progressAnswer.section.page, 10);
		if( !usersWithPackagesObject[userId].pages.hasOwnProperty(packageId) )
			return;

		let isFinished = progressAnswer.finished === 'true' || progressAnswer.finished === true;
		let pages = usersWithPackagesObject[userId].pages[packageId];

		usersWithPackagesObject[userId].pages[packageId] = pages.map((page) => {
			let newPage = {...page};
			if(page.id === pageId){
				newPage.started = true; // "this[index].started = this[index].id === pageId"  would set false in many unwanted cases;
				newPage.finished = isFinished;
			}
			return newPage;
		});
	});

	let onlyStarted, totalFinished, prevFinished, count;
	Object.keys(usersWithPackagesObject).forEach((userId) => {
		if( !usersWithPackagesObject[userId].hasOwnProperty("pages") )
			return;

		let pages = usersWithPackagesObject[userId].pages;
		onlyStarted = totalFinished = 0;

		Object.keys(usersWithPackagesObject[userId].pages).forEach((packageId) => {
			prevFinished = totalFinished;
			// if a page has started = true but finished = false -> onlyStarted++;
			// else if page is finished -> totalFinished++;

			pages[packageId].forEach(function(page){
				if(page.started === true && page.finished === false)
					onlyStarted++;
				else if(page.finished === true)
					totalFinished++;
			});

			count = pages[packageId].length;
			// if all pages for packageId has finished = true -> usersWithPackagesObject[userId].progress++;
			if(count <= totalFinished - prevFinished && count > 0){// pages[packageId].length < totalFinished-prevFinished  should never happen, but just in case;
				usersWithPackagesObject[userId].progress = usersWithPackagesObject[userId].progress + 1;
			}
		});

		usersWithPackagesObject[userId].pagesStarted = onlyStarted;
		usersWithPackagesObject[userId].pagesFinished = totalFinished;

		count = usersWithPackagesObject[userId].packageIds.length;
		if(usersWithPackagesObject[userId].progress > count)
			usersWithPackagesObject[userId].progress = count;

		count = totalFinished + onlyStarted/2.0;// those started count as 0.5 (user is in the middle);
		count = count/usersWithPackagesObject[userId].pagesCount;
		if(count > 1.0)
			count = 1.0;
		usersWithPackagesObject[userId].percentage = Number((count*100.0).toFixed(2));
	});
	//console.log(usersWithPackagesObject);
	return usersWithPackagesObject;
}


function ProgressStats({ count }){
	const [usersPackages, setUsersPackages] = useState({});
	const [fullyFinished, isFullyFinished] = useState(false);
	let url = getPath(),
		fetchProps = {method: "GET",
					headers: {"Accept": "application/json", "Content-Type": "application/json", "X-CSRFToken": ""
					}
		};

	useEffect(() => {
		let usersPackagesLength = Object.keys(usersPackages).length;
		if(count > 0 && usersPackagesLength == 0){
			fetch(url + "api/package_pages/users/", fetchProps).then(res => {
				if(!res.ok) {
					throw Error("Wystąpił błąd: nie udało się pobrać użytkowników i ich progresu!");
				}
				return res.json();
			}).then(
				(result) => {
					let usersWithPackagesOb = packageUsersPagesToUsersListObject(result);
					setUsersPackages(usersWithPackagesOb);
				},
				(error) => {
					console.log(error);
					isFullyFinished(true);
					setUsersPackages({err0: error.message});
				}
			).catch(err => {
				isFullyFinished(true);
				setUsersPackages({err: err.message});
			});
		}
	}, [count]);

	useEffect(() => {
		let usersPackagesLength = Object.keys(usersPackages).length;
		if(fullyFinished === false && usersPackagesLength > 0){
			fetch(url + "api/user_progress/list_all/", fetchProps).then(res => {
				if(!res.ok) {
					throw Error("Wystąpił błąd: nie udało się pobrać użytkowników i ich progresu!");
				}
				return res.json();
			}).then(
				(result) => {
					let usersWithPackagesOb = revertProgressOfUsers(result, usersPackages);
					setUsersPackages(usersWithPackagesOb);
					isFullyFinished(true);
				},
				(error) => {
					console.log(error);
					setUsersPackages({...usersPackages, err1: error.message});
					isFullyFinished(true);
				}
			).catch(err => {
				setUsersPackages({...usersPackages, err2: err.message});
				isFullyFinished(true);
			});
		}
	}, [count, usersPackages]);


	return fullyFinished? usersPackages : {};
}


/**
 *
 * @param users - result of response from /api/users/:
 *  [{id: Number
 *		avatar: String path
 *  	email: String
 *  	first_name: String
 *  	job_position: String
 *  	last_name: String
 *  	location: String
 *  	phone_number: String
 *  	team: String},
 *   ...]
 * @param usersWithPackagesObject - result from response from "api/package_pages/users/"
 *  and functions above;
 * @returns {[]} - modified users with new keys: percentage, sent, finished, progress (string);
 */
export function joinProgressToUsers(users, usersWithPackagesObject){
	let usersCp = users, uId;// = users or JSON.parse(JSON.stringify(users) ) or .map();

	for(let i = users.length - 1; i >= 0; i--){
		if( !users[i].hasOwnProperty('id') )
			continue;

		uId = parseInt(users[i].id, 10);
		if( !usersWithPackagesObject.hasOwnProperty(uId) )
			continue;

		users[i].sent = usersWithPackagesObject[uId].packageIds.length;
		users[i].finished = usersWithPackagesObject[uId].progress;
		users[i].percentage = usersWithPackagesObject[uId].percentage;
		users[i].progress = '' + users[i].finished + '/' + users[i].sent;
	}

	/*usersCp = users.map(function(user){/ / "Uncaught Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.";
		if( !user.hasOwnProperty('id') )
			return user;

		uId = parseInt(user.id, 10);
		if( !usersWithPackagesObject.hasOwnProperty(uId) )
			return user;

		user.sent = usersWithPackagesObject[uId].packageIds.length;
		user.finished = usersWithPackagesObject[uId].progress;
		user.percentage = usersWithPackagesObject[uId].percentage;
		user.progress = '' + user.finished + '/' + user.sent;

		return user;
	});*/

	return usersCp;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/*
 * Helper to input new packageId into object of relation employees - packages;
 * assumption: {userId: , packageIds: new Set() }.
 * ToFix: computational complexity O(n^2);
 */
function assignPackageToUsers(usersPackages, packageObject){
	if(!packageObject.hasOwnProperty("users"))
		return;

	let i, j, users = packageObject.users, count = packageObject.users.length;
	var newElement;

	for(i = 0; i < count; i++){

		for(j = usersPackages.length - 1; j >= 0; j--)
			if(usersPackages[j].userId === users[i])
				break;
		if(j >= 0)
			usersPackages[j].packageIds.add(packageObject.id);
		else {
			newElement = {userId: users[i], packageIds: new Set()};
			newElement.packageIds.add(packageObject.id);
			usersPackages.push(newElement);
		}
	}
}

/**
 * Get list of users and their packages;
 *  usersForPackages[.].packageIds.length  is the number of packages
 * which were  sent  to employee usersForPackages[.].userId;
 */
export function usersWithPackages(props){
	const [usersForPackages, setUsersForPackages] = useState([]);
	let url = getPath(),
		fetchProps = {
			method: "GET", headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"X-CSRFToken": "",
			}
		};

	useEffect(() => {
		fetch(url + "api/package/list_by_company_hr/", fetchProps).then((res) => res.json()).then(
			(result) => {
				if(Array.isArray(result)){
					let users4Packages = [], packageIds;
					let i, count = result.length;

					for(i = 0; i < count; i++){
						assignPackageToUsers(users4Packages, result[i]);
					}

					for(i = users4Packages.length - 1; i >= 0; i--){
						packageIds = [];
						users4Packages[i].packageIds.forEach(v => packageIds.push(v));// convert set to array;
						users4Packages[i].packageIds = packageIds;
					}

					setUsersForPackages(users4Packages);
				}
			},
			(error) => {
				console.log(error);
			}
		);
	}, [props.count]);

	return usersForPackages;
}

/**
 * Get packages of user by user's id
 */
export function userWithPackages(id, count){
	const users = usersWithPackages(count);
	return users.find(user => user.userId == id);
}

export default ProgressStats;

