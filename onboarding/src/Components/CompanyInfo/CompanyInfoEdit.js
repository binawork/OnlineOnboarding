import React from "react";
import MarkdownArea from "../MarkdownArea";
import CompanyInfoLogo from "./CompanyInfoLogo";

function CompanyInfoEdit({
  companyName,
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
    <div className="card-body col-xl-6 col-lg-8 col-12">
      <div className="pb-3">
        <h4 className="card-title"> Logo firmy </h4>
        <h6 className="card-subtitle text-muted">
          Kliknij w kółko, żeby zmienić logo
        </h6>
        <p className="card-text">
          <small>JPG, GIF, PNG &lt; 2 MB</small>
        </p>
      </div>
      <CompanyInfoLogo
        logo={logo}
        companyName={companyName}
        setLogo={setLogo}
        setImageFile={setImageFile}
      />

      <div className="">
        <label className="text-muted" htmlFor="company-mission">Misja firmy</label>
        <MarkdownArea
          id={"company-mission"}
          content={mission}
          contentChange={handleMission}
          simple={false}
          placeholder={"Misja firmy"}
        />
        <hr />
        <div className="form-group">
          <label className="text-muted" htmlFor="about-company">Link do filmiku</label>
          <input
            type="url"
            className="form-control"
            id="video-link"
            placeholder="Link, np. https://www.youtube.com/..."
            aria-label="Link do wideo o firmie"
            value={link}
            onChange={handleLink}
          />
        </div>
        <hr />
        <label className="text-muted" htmlFor="about-company">Inne informacje o firmie</label>
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
