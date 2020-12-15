import React, { useState, useRef, useEffect } from "react";
import Navbar from "../Navbar";
import LeftMenu from "../LeftMenu";
import PageAddressBar from "../PageAddressBar";
import LoggedUser from "../hooks/LoggedUser.js";
import ModalWarning from "../ModalWarning";
import CompanyInfoEdit from "./CompanyInfoEdit";
import CompanyInfoAPI from "../hooks/CompanyInfoAPI";

const CompanyInfoPage = ({location}) => {
  const [companyName, setCompanyName] = useState("");
  const loggedUser = location.state?.loggedUser ?? LoggedUser();
  
  document.title = "Onboarding: informacje o firmie";

  useEffect(() => {
    if(loggedUser.id){

      CompanyInfoAPI.getCompanyName(loggedUser.company_id)
      .catch(error => console.log(error.message))
      .then(result => setCompanyName(result));
    }
  }, [loggedUser]);

  return (
    <div className="app">
      <header className="app-header app-header-dark">
        <Navbar loggedUser={loggedUser} />
      </header>
      <LeftMenu loggedUser={loggedUser} />
      <main className="app-main">
        <div className="wrapper">
          <div className="page">
            <div className="page-inner">
              <PageAddressBar
                page={"Informacje o firmie"}
                loggedUser={loggedUser}
              />
              <CompanyInfoEdit companyName={ companyName } />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyInfoPage;
