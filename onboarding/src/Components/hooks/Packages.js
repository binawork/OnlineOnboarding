/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import { getPath, getCookie, tryFetchJson } from "../utils.js";
import useFetch from "./useFetch.js";

/**
 * Get packages from Onboarding API when Packages component is loaded;
 */
function fetchPackages(count) {
  const [packages, setPackages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, showError] = useState(null);

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
      .catch(error => {
        showError(error.message);
        console.error(error);
      })
      .then((res) => res.json())
      .then((result) => {
          setPackages(result.sort((a, b) => b.id - a.id));
        }
      )
      .finally(() => setIsLoading(false));
  }, [count]);

  return { packages, isLoading, error };
}

/**
 * Get all packages with theirs forms
 */
export const fetchPackagesAndForms = (count) => {
  const url = getPath();
  const fetchProps = {
      method:"GET", 
      headers: {
          "Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":""
      }
  };

  const { data:packagesAndForms, isLoading, error } = useFetch(`${url}api/package_pages`, fetchProps, count);
  if(packagesAndForms) packagesAndForms.sort((a, b) => b.id - a.id);

  return { packagesAndForms, isLoading, error };
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
      packageId && fetch(url + "api/package/" + packageId + "/", fetchProps).then(res => res.json()).then(
            (result) => {
                setCombo(result);
            },
            (error) => {
                console.log(error);
                showError(error);
            }
        );
    }, [packageId]);
    return combo;
}

/**
 * Add package/combo into Packages (todo: set owner as a logged HR manager?);
 */
export function addCombo(handleSuccess, title, popUpAddPackageError) {
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
    .then((res) => {
      if(!res.ok) {
        throw Error("Wystąpił błąd podczas dodawania katalogu!");
      }
      return res.json();
    })
    .then(
      (result) => {
        handleSuccess(result);
      },
      (error) => {
        popUpAddPackageError(error.message);
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
    .then((res) => {
      if(!res.ok) {
        throw Error("Nie udało się usunąć katalogu wdrożeniowego! Jeśli katalog został wysłany pracownikowi, nie może zostać usunięty.");
      }
      return tryFetchJson(res);
    })
    .then(
      (result) => {
        handleSuccess("Katalog wdrożeniowy został usunięty.");
      },
      (error) => {
        handleSuccess(error.message);
      }
    );
  return true;
}


export default fetchPackages;

