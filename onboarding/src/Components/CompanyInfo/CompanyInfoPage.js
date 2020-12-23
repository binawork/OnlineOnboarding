import React, { useState, useRef, useEffect } from "react";
import Navbar from "../Navbar";
import LeftMenu from "../LeftMenu";
import PageAddressBar from "../PageAddressBar";
import LoggedUser from "../hooks/LoggedUser.js";
import ModalWarning from "../ModalWarning";
import CompanyInfoEdit from "./CompanyInfoEdit";
import CompanyInfoAPI from "../hooks/CompanyInfoAPI";

const CompanyInfoPage = ({ location }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [company, setCompany] = useState("");
  const loggedUser = location.state?.loggedUser ?? LoggedUser();

  document.title = "Onboarding: informacje o firmie";

  useEffect(() => {
    if(loggedUser.id) {
      CompanyInfoAPI.getCompanyInfo(loggedUser.company_id)
        .catch((error) => {
          setError(error.message);
          console.log(error);
        })
        .then((result) => setCompany(result))
        .finally(() => setLoading(false));
    }
  }, [loggedUser]);

  return (
    <div className="app">
      <header className="app-header app-header-dark">
        <Navbar loggedUser={ loggedUser } />
      </header>
      <LeftMenu loggedUser={ loggedUser } />
      <main className="app-main">
        <div className="wrapper">
          <div className="page">
            <div className="page-inner">
              <PageAddressBar
                page={"Informacje o firmie"}
                loggedUser={ loggedUser }
              />
              <div className="page-section">
                <div className="card card-fluid">
                  <div className="card-header">Informacje o firmie</div>
                  {loading ? (
                    <div className="card-body">Ładowanie...</div>
                  ) : error ? (
                    <div className="card-body">{ error }</div>
                  ) : (
                    <CompanyInfoEdit company={ company } />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyInfoPage;
