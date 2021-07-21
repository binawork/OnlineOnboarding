import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPath, validateURL } from "../utils.js";
import { v4 as uuidv4 } from "uuid";
import PageAddressBar from "../PageAddressBar";
import Employee from "./Employee";
import ProgressStats, { joinProgressToUsers } from "../hooks/ProgressStats";
import "../../static/css/Dashboard.scss";

function DashboardPage({ loggedUserId }) {
  const [isEmployee, setIsEmployee] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [employees, setEmployees] = useState([]);
  const progressStats = ProgressStats({count: employees.length});

  
  if(employees.length > 0 && Object.keys(progressStats).length > 0){
    // setEmployees( joinProgressToUsers(employees, progressStats) );/ / "Uncaught Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.";
    joinProgressToUsers(employees, progressStats);
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

  useEffect(() => {
    loggedUserId !== 0 && fetch(url + "api/users/", fetchProps)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.length === 1 && result[0].id === loggedUserId) {
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
      )
  }, [loggedUserId]);

  document.title= "Onboarding: pulpit";

  return (
    <div className="Dashboard page-inner">
      {/* <PageAddressBar page={""} /> */}
        {" "}
        {/* placeholder */}
        {isLoaded ? (
          isEmployee ? (
            employees.map((employee) => {
              return <Employee employee={employee} key={uuidv4()} />;
            })
          ) : (
            <section className="Dashboard__card">
              <p className="Dashboard__text">
                Nie masz jeszcze wdrażanych pracowników (żeby wdrażać
                musisz mieć stworzony profil pracownika i podpięty pod
                niego content wdrożenia).
              </p>
              <div className="Dashboard__buttons-wrapper">
                <Link
                  to="/add_user"
                  className="Dashboard__button btn menu-link"
                >
                    Stwórz profil pracownika
                </Link>
                <Link
                  to="/packages"
                  className="Dashboard__button btn menu-link"
                >
                    Stwórz content wdrożenia
                </Link>
              </div>
            </section>
          )
        ) : (
          <p className="">Ładowanie...</p>
        )}
    </div>
  );
}

export default DashboardPage;
