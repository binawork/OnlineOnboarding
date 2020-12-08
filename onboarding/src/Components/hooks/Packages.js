import React, { useState, useEffect } from "react";
import { getPath, getCookie, tryFetchJson } from "../utils.js";
import PackagesRow from "../PackagesList/PackagesRow";

/**
 * Get packages from Onboarding API when Packages component is loaded;
 */
function Packages(props) {
  var [rows, setRows] = useState([]),
    [loaded, isLoaded] = useState(false);
  const [error, showError] = useState(null);
  const [newRowId, setNewRowId] = useState(null);

  let url = getPath(),
    fetchProps = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": "",
      },
    };

  useEffect(() => {
    fetch(url + "api/package/list_by_company_hr/", fetchProps)
      .then((res) => res.json())
      .then(
        (result) => {
          isLoaded(true);
          setRows(result);
          const ids = result.map((res) => res.id);
          const maxId = ids.reduce((a, b) => Math.max(a, b));/* Uncaught (in promise) TypeError: reduce of empty array with no initial value; */
          setNewRowId(maxId);
        },
        (error) => {
          showError(error);
          console.log(error);
        }
      );
  }, [props.count]);

  if (error) {
    return <PackagesRow key={0} row={{ name: error.message, last_edit: "" }} />;
  } else if (!loaded)
    return (
      <PackagesRow key={0} row={{ name: "Ładowanie ...", last_edit: "" }} />
    );
  else {
    var form_table = [],
      i,
      count = rows.length;
    let loggedUser = {id:0, first_name: ""};

    if(props.loggedUser)
      loggedUser = props.loggedUser;

    for (i = 0; i < count; i++)
      form_table.push(
        <PackagesRow
          key={rows[i].id}
          row={{
            name: rows[i].title,
            last_edit: rows[i].updated_on,
            key: rows[i].id,
            created: rows[i].created_on,
          }}
          handleRemoveAsk={ props.handleRemoveAsk }
          lastRow={newRowId === rows[i].id}
          loggedUser={ loggedUser }
        />
      );
    return <>{form_table}</>;
  }
}

/**
 * Get one package from Onboarding API whith id = packageId;
 */
export function singleCombo(packageId){
    if(packageId < 1)
        return false;

    const [combo, setCombo] = useState(null),
        [error, showError] = useState(null);
    let url = getPath(),
        fetchProps = {method: "GET", headers: {"Accept": "application/json", "Content-Type": "application/json", "X-CSRFToken": ""}};

    useEffect(() => {
        fetch(url + "api/package/" + packageId + "/", fetchProps).then(res => res.json()).then(
            (result) => {
                setCombo(result);
            },
            (error) => {
                console.log(error);
                showError(error);
            }
        );
    }, []);

    return combo;
}

/**
 * Add package/combo into Packages (todo: set owner as a logged HR manager?);
 */
export function addCombo(handleSuccess, title, owner) {
  if (
    typeof title !== "string" ||
    (typeof title === "string" && title.length < 1)
  )
    return false;

  let url = getPath(),
    data,
    token = getCookie("csrftoken"),
    fetchProps = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": token,
      },
      body: null,
    };
  data = { title: title }; // {"title": "", "owner": null, "description": "", "users": []}
  fetchProps.body = JSON.stringify(data);

  fetch(url + "api/package/", fetchProps)
    .then((res) => res.json())
    .then(
      (result) => {
        handleSuccess(result);
      },
      (error) => {
        console.log(error);
      }
    );
  return true;
}

/*export function assignEmployeeToPackage(handleSuccess, employeeId, packageId){
  let url = getPath(), token = getCookie("csrftoken"), fullPath = url + "email/reminder/"+employeeId+"/"+packageId+"/",
      fetchProps = {method:"POST", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken": token}};

  fetch(fullPath, fetchProps).then(res => tryFetchJson(res))
    .then(
      (result) => {
        handleSuccess(result);
      },
      (error) => {
        handleSuccess(error.message);
      }
    );
}*/


/**
 * Remove combo from the server; corresponding pages are kept on server;
 */
export function removeCombo(handleSuccess, packageId, title) {
  let url = getPath(),
    data,
    token = getCookie("csrftoken"),
    fetchProps = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": token,
      },
    };
  data = { id: packageId };
  fetchProps.body = JSON.stringify(data);

  fetch(url + "api/package/" + packageId + "/", fetchProps)
    .then((res) => tryFetchJson(res) )
    .then(
      (result) => {
        handleSuccess("Wdrożenie zostało usunięte.");
      },
      (error) => {
        handleSuccess(error);
      }
    );
  return true;
}


/*
 * Helper to input new packageId into object of relation employees - packages;
 * assumption: {userId: , packageIds: new Set() }.
 * ToFix: computational complexity O(n^2);
 */
function addUsers(usersPackages, packageObject){
    if( !packageObject.hasOwnProperty("users") )
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
 */
export function usersWithPackages(props){
    const [usersForPackages, setUsersForPackages] = useState([]);
    let url = getPath(),
        fetchProps = {method: "GET", headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": "",
        }
    };

    useEffect(() => {
        fetch(url + "api/package/list_by_company_hr/", fetchProps).then((res) => res.json()).then(
            (result) => {
                if( Array.isArray(result) ){
                    let users4Packages = [], packageIds;
                    let i, count = result.length;

                    for(i = 0; i < count; i++){
                        addUsers(users4Packages, result[i]);
                    }

                    for(i = users4Packages.length - 1; i >= 0; i--){
                        packageIds = [];
                        users4Packages[i].packageIds.forEach( v => packageIds.push(v) );
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

export default Packages;

