import React from "react";
import MarkdownArea from "../MarkdownArea";
import CompanyInfoLogo from "./CompanyInfoLogo";

function CompanyInfoEdit({
  companyName,
  setCompanyName,
  logo,
  mission,
  link,
  aboutCompany,
  setLogo,
  setImageFile,
  handleMission,
  handleLink,
  handleAboutCompany,
}) {
  return (
    <div className="CompanyInfo__main">
      <CompanyInfoLogo
        logo={logo}
        companyName={companyName}
        setCompanyName={setCompanyName}
        setLogo={setLogo}
        setImageFile={setImageFile}
      />

      <div className="CompanyInfo__card">
        <label className="CompanyInfo__label" htmlFor="company-mission">Misja firmy</label>
        <MarkdownArea
          id={"company-mission"}
          content={mission}
          contentChange={handleMission}
          simple={false}
          placeholder={"Misja firmy"}
        />
      </div>
        <div className="CompanyInfo__card form-group">
          <label className="CompanyInfo__label" htmlFor="about-company">Link do filmiku</label>
          <input
            type="url"
            className="CompanyInfo__input form-control"
            id="video-link"
            placeholder="Link, np. https://www.youtube.com/..."
            aria-label="Link do wideo o firmie"
            value={link}
            onChange={handleLink}
          />
        </div>
      <div className="CompanyInfo__card">
        <label className="CompanyInfo__label" htmlFor="about-company">Inne informacje o firmie</label>
        <MarkdownArea
          id="about-company"
          content={aboutCompany}
          contentChange={handleAboutCompany}
          simple={false}
          placeholder={"Inne informacje, np. historia firmy"}
          height={200}
        />
      </div>
    </div>
  );
}

export default CompanyInfoEdit;
