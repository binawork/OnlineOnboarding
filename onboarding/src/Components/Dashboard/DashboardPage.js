import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPath } from "../utils.js";
import { v4 as uuidv4 } from "uuid";

import LoggedUser from "../hooks/LoggedUser.js";
import Navbar from "../Navbar";
import LeftMenu from "../LeftMenu";
import PageAddressBar from "../PageAddressBar";
import Employee from "./Employee";
import { usersWithPackages } from "../hooks/Packages";

function DashboardPage(props) {
  const packageIdRef = useRef(0);
  const usersForPackages = usersWithPackages({count: 0});
  const loggedUser = props.location.state?.loggedUser ?? LoggedUser();

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

  useEffect(() => {
    loggedUser.id !== 0 && fetch(url + "api/users/", fetchProps)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result === []) {
            setIsEmployee(false);
          } else {
            setIsEmployee(true);
            setEmployees(result.filter(user => user.id !== loggedUser.id).sort((a,b) => a.id - b.id));
          }

          setIsLoaded(true);
        },
        (error) => {
          console.error(error);
        }
      );
  }, [props.count, loggedUser]);

  document.title= "Onboarding: pulpit";

  return (
    <div className="app">
      <header className="app-header app-header-dark">
        <Navbar loggedUser={ loggedUser } /> {/* placeholder */}
      </header>
      <LeftMenu loggedUser={ loggedUser } /> {/* placeholder */}
      <main className="app-main">
        <div className="wrapper">
          <div className="page">
            <div className="page-inner">
              <PageAddressBar page={"Wdrażani pracownicy"} loggedUser={ loggedUser } /> {/* placeholder */}
              <div className="page-section">
                {" "}
                {/* placeholder */}
                {isLoaded ? (
                  isEmployee ? (
                    employees.map((employee) => {
                      return <Employee employee={employee} key={uuidv4()} loggedUser={ loggedUser } />;
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
                          to={{
                            pathname: "/add_user",
                            state: { packageId: packageIdRef.current, loggedUser: loggedUser },
                          }}
                          className="menu-link"
                        >
                          <button className="btn btn-secondary mr-5">
                            Stwórz profil pracownika
                          </button>
                        </Link>
                        <Link
                          to={{
                            pathname: "/packages",
                            state: { packageId: packageIdRef.current, loggedUser: loggedUser },
                          }}
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
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
