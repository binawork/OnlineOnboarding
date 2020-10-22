import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPath } from "./utils.js";

//import "../static/looper/stylesheets/theme.min.css";
//import "../static/looper/stylesheets/theme-dark.min.css";

import Navbar from "./Navbar";
import LeftMenu from "./LeftMenu";
import PageAddressBar from "./PageAddressBar";

function DashboardPage(props) {
  const packageIdRef = useRef(0);

  const [isEmployee, setIsEmployee] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [employees, setEmployees] = useState([]);

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
    fetch(url + "api/users/", fetchProps)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          result === [] ? setIsEmployee(false) : setIsEmployee(true);
          setIsLoaded(true);
        },
        (error) => {
          console.error(error);
        }
      );
  }, [props.count]);

  return (
    <div className="app">
      <header className="app-header app-header-dark">
        <Navbar /> {/* placeholder */}
      </header>
      <LeftMenu /> {/* placeholder */}
      <main className="app-main">
        <div className="wrapper">
          <div className="page">
            <div className="page-inner">
              <PageAddressBar page={"Pulpit"} /> {/* placeholder */}
              <div className="page-section">
                {" "}
                {/* placeholder */}
                {isLoaded ? (
                  isEmployee ? (
                    <div className="card card-fluid p-4">

                    </div>
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
                            state: { packageId: packageIdRef.current },
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
                            state: { packageId: packageIdRef.current },
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
