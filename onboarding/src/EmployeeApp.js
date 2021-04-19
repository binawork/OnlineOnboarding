import React, { useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./static/css/style.scss";
import "./static/css/App.scss";
import EmployeeSingleFormPage from "./Components/Employee/EmployeeFormPages/EmployeeSingleFormPage";
import LoggedUser from "./Components/hooks/LoggedUser";
import LeftMenuEmployee from "./Components/Employee/LeftMenuEmployee";
import Navbar from "./Components/Navbar";
import EmployeeFormsList from "./Components/Employee/EmployeeFormsList/EmployeeFormsList";
import EmployeeFormPages from "./Components/Employee/EmployeeFormPages/EmployeeFormPages";
import CompanyInfoPage from "./Components/Employee/CompanyInfoPage";
import QnAList from "./Components/Employee/QnA/QnAList";
import EmployeeAccount from "./Components/Employee/EmployeeAccount/EmployeeAccount";

function EmployeeApp() {
  const [countUpdate, updateUser] = useState(0);
  const loggedUser = LoggedUser(countUpdate);
  const [showAside, setToggleAside] = useState(false);
  const [page, setPage] = useState(null);

  return (
    <HashRouter>
      <div className="app">
        <header className="app-header app-header-dark">
          <Navbar
            loggedUser={ loggedUser }
            showAside={ showAside }
            setToggleAside={ setToggleAside }
          />
        </header>
        <LeftMenuEmployee
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
                  <EmployeeFormPages setPage={ setPage } />
                </Route>
                <Route path="/" exact>
                  <EmployeeFormsList />
                </Route>
              </Switch>
            </div>
          </div>
        </main>
      </div>
    </HashRouter>
  );
}

export default EmployeeApp;

