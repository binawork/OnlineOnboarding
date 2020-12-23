import React, { useState, useRef } from "react";
import MarkdownArea from "../MarkdownArea";
import CompanyInfoAPI from "../hooks/CompanyInfoAPI";
import CompanyInfoPreview from "./CompanyInfoPreview";
import ModalWarning from "../ModalWarning";

function CompanyInfoEdit({ company }) {
  const [isEditMode, toggleEditMode] = useState(true);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [logo, setLogo] = useState(company.company_logo || "");
  const [mission, setMission] = useState(company.mission || "");
  const [link, setLink] = useState(company.link || "");
  // const [link, setLink] = useState("https://www.youtube.com/embed/JxRiPBuPR1k");
  const [aboutCompany, setAboutCompany] = useState(company.info || "");
  const [showSaveModal, setShowSaveModal] = useState(false);

  const logoRef = useRef("");

  const handleMission = (content) => {
    setMission(content);
  };
  const handleAboutCompany = (content) => {
    setAboutCompany(content);
  };
  const handleLink = (e) => {
    setLink(e.target.value);
  };
  const handleLogo = (e) => {
    if (logoRef.current.files.length > 0) {
      if (FileReader) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(logoRef.current.files[0]);
        fileReader.onload = () => {
          setLogo(fileReader.result);
        };
      }
      setImageFile(logoRef.current.files[0]);
    }
  };

  const hideModal = () => {
    setShowSaveModal(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    CompanyInfoAPI.saveCompanyInfo(
      company.id,
      imageFile,
      mission,
      link,
      aboutCompany
    )
      .catch((error) => setError(error.message))
      .finally(() => setShowSaveModal(true));
  };
  const handleShow = (e) => {
    e.preventDefault();
    toggleEditMode(!isEditMode);
  };

  return (
    <>
      {isEditMode ? (
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
          <div className="media mb-4 d-flex align-items-center">
            <div className="user-avatar user-avatar-xl fileinput-button mr-5">
              <div className="fileinput-button-label"> Zmień logo </div>
              {logo ? <img alt="logo" src={logo} /> : <></>}
              <div
                style={{
                  border: "2px solid #dadada",
                  borderRadius: "50%",
                  width: "80px",
                  height: "80px",
                }}
              ></div>
              <input
                id="fileupload-logo"
                type="file"
                name="logo"
                ref={logoRef}
                onChange={handleLogo}
              />
            </div>
            <p className="m-0" style={{ fontSize: "1.5rem" }}>
              <b>{company.name}</b>
            </p>
          </div>

          <div className="">
            <MarkdownArea
              id={"company-mission"}
              content={mission}
              contentChange={handleMission}
              simple={false}
              placeholder={"Misja firmy"}
            />
            <hr />
            <div className="form-group">
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
      ) : (
        <CompanyInfoPreview
          logo={logo}
          link={link}
          companyName={company.name}
          mission={mission}
          aboutCompany={aboutCompany}
        />
      )}
      <div className="card-body rounded-bottom border-top">
        <button className="btn btn-success mr-3" onClick={handleSave}>
          Zapisz
        </button>
        <button className="btn btn-success mr-3" onClick={handleShow}>
          {isEditMode ? "Podgląd" : "Edytuj"}
        </button>
        {/* { error ? <p>{ error }</p> : null } */}
      </div>
      {showSaveModal ? (
        <ModalWarning
          handleAccept={hideModal}
          title={""}
          message={
            error
              ? "Nie udało się zapisać"
              : "Zmiany zostały pomyślnie zapisane"
          }
          show={true}
          acceptText={"Ok"}
          id={0}
        />
      ) : null}
    </>
  );
}

export default CompanyInfoEdit;
