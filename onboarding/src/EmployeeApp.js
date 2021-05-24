import React, { useEffect, useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./static/css/App.scss";
import EmployeeSingleFormPage from "./Components/Employee/EmployeeFormPages/EmployeeSingleFormPage";
import LoggedUser from "./Components/hooks/LoggedUser";
import LeftMenuEmployee from "./Components/Employee/LeftMenuEmployee";
import EmployeeFormsList from "./Components/Employee/EmployeeFormsList/EmployeeFormsList";
import EmployeeFormPages from "./Components/Employee/EmployeeFormPages/EmployeeFormPages";
import CompanyInfoPage from "./Components/Employee/CompanyInfoPage";
import QnAList from "./Components/Employee/QnA/QnAList";
import EmployeeAccount from "./Components/Employee/EmployeeAccount/EmployeeAccount";
import WelcomePage from "./Components/Employee/WelcomePage";

function EmployeeApp() {
  const [countUpdate, updateUser] = useState(0);
  const loggedUser = LoggedUser(countUpdate);
  const [showAside, setToggleAside] = useState(false);
  const [page, setPage] = useState(null);
  const [packagesList, setPackagesList] = useState([]);

  useEffect(() => {
    if(packagesList?.length > 0)
      sessionStorage.setItem("packages_list", JSON.stringify(packagesList))
    else setPackagesList(JSON.parse(sessionStorage.getItem("packages_list")));
  }, [packagesList]);
  
  return (
    <HashRouter>
      { loggedUser.id !== 0 && loggedUser.welcome_board && <WelcomePage /> }
      { loggedUser.id !== 0 && (
        <div className="App">
          <div className="hamburger-wrapper d-md-none d-lg-none d-xl-none">
            <button 
              className={`hamburger hamburger-squeeze ${showAside ? "active" : ""}`}
              type="button"
              data-toggle="aside"
              aria-label="toggle menu"
              onClick={() => setToggleAside(!showAside)}>
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
          </div>
          <LeftMenuEmployee
            packagesList={ packagesList }
            showAside={ showAside }
            setToggleAside={ setToggleAside }
          />
          <main className="App__main app-main">
            <div className="wrapper">
              <div className="page container-xl">
                <Switch>
                  <Route path="/my_profile">
                    <EmployeeAccount loggedUser={ loggedUser } countUpdate={ countUpdate } updateUser={ updateUser } />
                  </Route>
                  <Route path="/q_and_a">
                    <QnAList />
                  </Route>
                  <Route path="/company">
                    <CompanyInfoPage loggedUser={ loggedUser } />
                  </Route>
                  <Route path="/form/:form_id">
                    <EmployeeSingleFormPage page={ page } userId={ loggedUser.id } />
                  </Route>
                  <Route path="/package/:package_id">
                    <EmployeeFormPages setPage={ setPage } userId={ loggedUser.id } />
                  </Route>
                  <Route path="/" exact>
                    <EmployeeFormsList setPackagesList={ setPackagesList } />
                  </Route>
                </Switch>
              </div>
            </div>
          </main>
        </div>
      )}
    </HashRouter>
  );
}

export default EmployeeApp;

