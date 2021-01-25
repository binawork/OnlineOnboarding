import React, { useState, useEffect } from "react";
import PageAddressBar from "../PageAddressBar";
import ModalWarning from "../ModalWarning";
import CompanyInfoContent from "./CompanyInfoContent";
import CompanyInfoAPI from "../hooks/CompanyInfoAPI";

const CompanyInfoPage = ({ loggedUser }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [company, setCompany] = useState("");

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
      <main className="app-main">
        <div className="wrapper">
          <div className="page">
            <div className="page-inner">
              <PageAddressBar
                page={"Informacje o firmie"}
              />
              <div className="page-section">
                <div className="card card-fluid">
                  <div className="card-header">Informacje o firmie</div>
                  {loading ? (
                    <div className="card-body">Ładowanie...</div>
                  ) : error ? (
                    <div className="card-body">{ error }</div>
                  ) : (
                    <CompanyInfoContent company={ company } />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  );
};

export default CompanyInfoPage;
