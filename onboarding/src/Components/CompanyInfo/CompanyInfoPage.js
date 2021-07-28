import React, { useState, useEffect } from "react";
import PageAddressBar from "../PageAddressBar";
import CompanyInfoContent from "./CompanyInfoContent";
import CompanyInfoAPI from "../hooks/CompanyInfoAPI";
import "../../static/css/CompanyInfo.scss";

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
    <div className="page-inner">
      <PageAddressBar page={"O firmie"} />
      {loading ? (
        <div className="">Ładowanie...</div>
      ) : error ? (
        <div className="">{ error }</div>
      ) : (
        <CompanyInfoContent company={ company } />
      )}
    </div>
  );
};

export default CompanyInfoPage;
