import React, { useEffect, useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import LeftMenu from "./Components/LeftMenu";
import LoggedUser from "./Components/hooks/LoggedUser.js";
import DashboardPage from "./Components/Dashboard/DashboardPage";
import UserListPage from "./Components/UsersList/UserListPage";
import FormsEditPage from "./Components/FormsEdit/FormsEditPage";
import FormTablePage from "./Components/FormTable/FormTablePage";
import AddUserTablePage from "./Components/AddUserTable/AddUserTablePage";
import ManagerEditPage from "./Components/UserEdit/ManagerEditPage";
import AddEmployeePage from "./Components/UserEdit/AddEmployeePage";
import EmployeeEditPage from "./Components/UserEdit/EmployeeEditPage";
import PackagesListPage from "./Components/PackagesList/PackagesListPage";
import QnAPage from "./Components/QnA/QnAPage";
import EmployeeProfilePage from "./Components/EmployeeProfile/EmployeeProfilePage";
import CompanyInfoPage from "./Components/CompanyInfo/CompanyInfoPage";
import ModalWarning from "./Components/ModalWarning";
// import FormsManagerCheckPage from "./Components/FormsManagerCheckPage"; // where manager checks how form was filled;
import "./static/css/App.scss";

function App() {
  const [editLoggedUser, setEditLoggedUser] =useState(0);
  const loggedUser = LoggedUser(editLoggedUser);
  const [showAside, setToggleAside] = useState(false);
  const [packagesList, setPackagesList] = useState([]); //[{id: number, title: string}]
  const [dropdownClass, setDropdownClass] = useState("");
  const [modal, setModal] = useState(<></>);

  useEffect(() => {
    if(packagesList?.length > 0)
      sessionStorage.setItem("packages_list", JSON.stringify(packagesList))
    else setPackagesList(JSON.parse(sessionStorage.getItem("packages_list")));
  }, [packagesList]);

  useEffect(() => {
    if (loggedUser.id > 0)
      sessionStorage.setItem("logged_user", JSON.stringify(loggedUser));
  }, [loggedUser]);

  const handleEditTitle = (packageId, newTitle) => {
    setPackagesList(packagesList.map(element => {
        if(element.id == packageId) element.title = newTitle;
        return element;
    }))
  }

  const handleClick = (elName) => {
    if(elName === "help") {
      showModal(
        "Pomoc",
        "Tu w przyszłości pojawi się pomoc dotycząca korzystania z aplikacji OnboardingStep."  
      )
    } else if(elName === "hello") {
      dropdownClass
        ? setDropdownClass("")
        : setDropdownClass("active");
    } else if(elName === "profile") {
      setToggleAside(false);
      setDropdownClass("");
    }
  }

  const showModal = (modalTitle, message) => {
      setModal(<ModalWarning handleAccept={ hideModal } title={ modalTitle } message={ message } id={ 0 } show={ true } acceptText={ "Ok" } />);
  };

  const hideModal = function(){
      setModal(<></>);
  };

  const handleLogout = () => {
    sessionStorage.clear();
  }

  return (
    <HashRouter>
      <div className="App">
        <div className="hamburger-wrapper d-lg-none d-xl-none">
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
        <LeftMenu
          packagesList={ packagesList }
          showAside={ showAside }
          setToggleAside={ setToggleAside }
        />
        <main className="App__main app-main">
          <div className="wrapper">
            <div className="page container-xl">
              <Switch>
                  <Route path="/users_list">
                      <UserListPage loggedUserId={ loggedUser.id } />
                  </Route>
                  <Route path="/my_profile">
                      <ManagerEditPage user={ loggedUser } editLoggedUser={ editLoggedUser } setEditLoggedUser={ setEditLoggedUser } />
                  </Route>
                  <Route path="/add_user/">
                      <AddEmployeePage />
                  </Route>
                  <Route path="/edit_employee/:employee_id">
                      <EmployeeEditPage />
                  </Route>
                  <Route path="/employee/:employee_id">
                      <EmployeeProfilePage />
                  </Route>
                  <Route path="/packages">
                      <PackagesListPage setPackagesList={ setPackagesList } />
                  </Route>
                  <Route path="/package/:package_id">
                      <FormTablePage companyId={ loggedUser.company_id } handleEditTitle={ handleEditTitle } />
                  </Route>
                  <Route path="/form/:form_id">
                      <FormsEditPage />
                  </Route>
                  <Route path="/send_package/:package_id">
                      <AddUserTablePage loggedUserId={ loggedUser.id } />
                  </Route>
                  <Route path="/company">
                      <CompanyInfoPage loggedUser={ loggedUser } />
                  </Route>
                  <Route path="/q_and_a">
                      <QnAPage />
                  </Route>
                  <Route exact path="/">
                      <DashboardPage loggedUserId={ loggedUser.id } />
                  </Route>
              </Switch>
            </div>
          </div>
          <div className="App__buttons-wrapper">
            <div className="App__button-profile-wrapper">
              <button className="App__button btn" onClick={ () => handleClick("hello") } onBlur={ () => handleClick("hello") }>{ `Witaj ${loggedUser.first_name}` }</button>
              <ul className={`dropdown ${dropdownClass}`}>
                <Link className="dropdown__link" to="/my_profile" onClick={ () => handleClick("profile") }>
                  <li className="dropdown__item dropdown__item--profile">
                    Profil
                  </li>
                </Link>
                <a
                    className="dropdown__link"
                    href="/accounts/logout/"
                    onClick={ handleLogout }
                >
                  <li className="dropdown__item">
                    Wyloguj
                  </li>
                </a>
              </ul>
            </div>
            {/* <button className="App__button btn">Raporty</button> */}
            <button className="App__button btn" onClick={ () => handleClick('help') }>Pomoc</button>
          </div>
        </main>
        { modal }
      </div>
    </HashRouter>
  );
}

export default App;
