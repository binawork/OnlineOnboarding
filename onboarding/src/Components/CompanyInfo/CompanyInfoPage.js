import React, { useState, useRef } from "react";
import Navbar from "../Navbar";
import LeftMenu from "../LeftMenu";
import PageAddressBar from "../PageAddressBar";
import LoggedUser from "../hooks/LoggedUser.js";
import ModalWarning from "../ModalWarning";
import CompanyInfoEdit from "./CompanyInfoEdit";

const CompanyInfoPage = ({location}) => {
  const loggedUser = location.state?.loggedUser ?? LoggedUser();
  document.title = "Onboarding: informacje o firmie";

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
              <CompanyInfoEdit />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyInfoPage;
