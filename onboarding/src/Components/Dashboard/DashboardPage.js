import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPath, validateURL } from "../utils.js";
import { v4 as uuidv4 } from "uuid";
import PageAddressBar from "../PageAddressBar";
import Employee from "./Employee";
import { usersWithPackages } from "../hooks/Packages";

function DashboardPage({ loggedUserId }) {
  const usersForPackages = usersWithPackages({count: 0});

  const [isEmployee, setIsEmployee] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [employees, setEmployees] = useState([]);

  if(usersForPackages.length !== 0) {
    for(let i = employees.length - 1; i >= 0; i--){
      for(let j = usersForPackages.length - 1; j >= 0; j--){
        if(usersForPackages[j].userId === employees[i].id) {
          employees[i].sent = usersForPackages[j].packageIds.length;
        }
      }
    }
  }

  const url = getPath();
  const fetchProps = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": "",
    },
  };

  const sessionEmployees = JSON.parse(sessionStorage.getItem('employees'));

  useEffect(() => {
    if(sessionEmployees) {
      sessionEmployees.map(employee => {
        employee.avatar = validateURL(employee.avatar, "/onboarding/static/images/unknown-profile.jpg");
      })
      setEmployees(sessionEmployees);
      setIsLoaded(true);
      sessionEmployees?.length > 0 
        ? setIsEmployee(true)
        : setIsEmployee(false);
    } else {
      loggedUserId !== 0 && fetch(url + "api/users/", fetchProps)
        .then((res) => res.json())
        .then(
          (result) => {
            if (result === []) {
              setIsEmployee(false);
            } else {
              setIsEmployee(true);
              setEmployees(result.filter(user => user.id !== loggedUserId).sort((a,b) => a.id - b.id));
              sessionStorage.setItem('employees', JSON.stringify(result.filter(user => user.id !== loggedUserId)));
            }

            setIsLoaded(true);
          },
          (error) => {
            console.error(error);
          }
    )};
  }, [loggedUserId]);

  document.title= "Onboarding: pulpit";

  return (
    <div className="page-inner">
      <PageAddressBar page={""} /> {/* placeholder */}
      <div className="page-section">
        {" "}
        {/* placeholder */}
        {isLoaded ? (
          isEmployee ? (
            employees.map((employee) => {
              return <Employee employee={employee} key={uuidv4()} />;
            })
          ) : (
            <div className="card card-fluid p-4">
              <div className="card-body">
                Nie masz jeszcze wdrażanych pracowników (żeby wdrażać
                musisz mieć stworzony profil pracownika i podpięty pod
                niego content wdrożenia)
              </div>
              <div className="card-body">
                <Link
                  to="/add_user"
                  className="menu-link"
                >
                  <button className="btn btn-secondary mr-5">
                    Stwórz profil pracownika
                  </button>
                </Link>
                <Link
                  to="/packages"
                  className="menu-link"
                >
                  <button className="btn btn-secondary">
                    Stwórz content wdrożenia
                  </button>
                </Link>
              </div>
            </div>
          )
        ) : (
          <div className="card card-fluid p-4">
            <div className="card-body">Loading...</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
