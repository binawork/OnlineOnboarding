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

function EmployeeApp() {
  const loggedUser = LoggedUser();
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
      <div className="App">
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
                  <EmployeeAccount loggedUser={ loggedUser } />
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
                  <EmployeeFormsList setPackagesList={ setPackagesList } />
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

