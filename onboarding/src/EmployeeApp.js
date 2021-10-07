import React, { useEffect, useState } from "react";
import { HashRouter, Link, Route, Switch } from "react-router-dom";
import EmployeeSingleFormPage from "./Components/Employee/EmployeeFormPages/EmployeeSingleFormPage";
import LoggedUser from "./Components/hooks/LoggedUser";
import LeftMenuEmployee from "./Components/Employee/LeftMenuEmployee";
import EmployeeFormsList from "./Components/Employee/EmployeeFormsList/EmployeeFormsList";
import EmployeeFormPages from "./Components/Employee/EmployeeFormPages/EmployeeFormPages";
import CompanyInfoPage from "./Components/Employee/CompanyInfoPage";
import QnAList from "./Components/Employee/QnA/QnAList";
import EmployeeAccount from "./Components/Employee/EmployeeAccount/EmployeeAccount";
import WelcomePage from "./Components/Employee/WelcomePage";
import ModalWarning from "./Components/ModalWarning";
import "./static/css/App.scss";

function EmployeeApp() {
  const [countUpdate, updateUser] = useState(0);
  const loggedUser = LoggedUser(countUpdate);
  const [showAside, setToggleAside] = useState(false);
  const [page, setPage] = useState(null);
  const [packagesList, setPackagesList] = useState([]);
  const [dropdownClass, setDropdownClass] = useState("");
  const [modal, setModal] = useState(<></>);

  useEffect(() => {
    if(packagesList?.length > 0)
      sessionStorage.setItem("packages_list", JSON.stringify(packagesList))
    else setPackagesList(JSON.parse(sessionStorage.getItem("packages_list")));
  }, [packagesList]);

  const preventOnBlur = function(e){
    e.preventDefault();// will delay onBlur event after onClick;
  };
  const handleLogout = () => {
    sessionStorage.clear();
  }
  const showModal = (modalTitle, message) => {
      setModal(<ModalWarning handleAccept={ hideModal } title={ modalTitle } message={ message } id={ 0 } show={ true } acceptText={ "Ok" } />);
  };
  const hideModal = function(){
      setModal(<></>);
  };
  const handleClick = (elName) => {
    if(elName === "help") {
      showModal(
        "Pomoc",
        "Tu w przyszłości pojawi się pomoc dotycząca korzystania z aplikacji OnboardingStep."  
      )
    } else if(elName === "hello") {
      setDropdownClass("active");
    } else if(elName === "inactivate") {
      setDropdownClass("")
    } else if(elName === "profile") {
      setToggleAside(false);
      setDropdownClass("");
    }
  }
  
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
            <div className="App__buttons-wrapper">
            <div className="App__button-profile-wrapper">
              <button className="App__button" onClick={ () => handleClick("hello") } onBlur={ () => handleClick("inactivate") } >{ `Witaj ${loggedUser.first_name}` }</button>
              <ul className={`dropdown ${dropdownClass}`}>
                <Link className="dropdown__link" to="/my_profile" onClick={ () => handleClick("profile") }>
                  <li className="dropdown__item dropdown__item--profile">
                    Profil
                  </li>
                </Link>
                <a
                    className="dropdown__link"
                    href="/accounts/logout/"
                    onMouseDown={ preventOnBlur }
                    onClick={ handleLogout }
                >
                  <li className="dropdown__item">
                    Wyloguj
                  </li>
                </a>
              </ul>
            </div>
            {/* <button className="App__button btn">Raporty</button> */}
            <button className="App__button" onClick={ () => handleClick('help') }>Pomoc</button>
          </div>
          </main>
          { modal }
        </div>
      )}
    </HashRouter>
  );
}

export default EmployeeApp;

