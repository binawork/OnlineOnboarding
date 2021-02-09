import React, { useState } from "react";
import CompanyInfoAPI from "../hooks/CompanyInfoAPI";
import CompanyInfoPreview from "./CompanyInfoPreview";
import CompanyInfoEdit from "./CompanyInfoEdit";
import ModalWarning from "../ModalWarning";

function CompanyInfoContent({ company }) {
  const [isEditMode, toggleEditMode] = useState(true);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState("");
  const [logo, setLogo] = useState(company.company_logo || "");
  const [mission, setMission] = useState(company.mission || "");
  const [link, setLink] = useState(company.link || "");
  const [aboutCompany, setAboutCompany] = useState(company.info || "");
  const [showSaveModal, setShowSaveModal] = useState(false);

  const handleMission = (content) => {
    setMission(content);
  };
  const handleAboutCompany = (content) => {
    setAboutCompany(content);
  };
  const handleLink = (e) => {
    setLink(e.target.value);
  };

  const hideModal = () => {
    setShowSaveModal(false);
    setError(null);
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
        <CompanyInfoEdit
          companyName={company.name}
          logo={logo}
          mission={mission}
          link={link}
          aboutCompany={aboutCompany}
          setLogo={setLogo}
          setImageFile={setImageFile}
          handleMission={handleMission}
          handleLink={handleLink}
          handleAboutCompany={handleAboutCompany}
        />
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
      </div>
      {showSaveModal ? (
        <ModalWarning
          handleAccept={hideModal}
          title={"Zapisywanie informacji o firmie"}
          message={
            error
              ? error
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

export default CompanyInfoContent;
