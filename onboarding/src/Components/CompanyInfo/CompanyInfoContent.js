import React, { useState } from "react";
import CompanyInfoAPI from "../hooks/CompanyInfoAPI";
import CompanyInfoPreview from "./CompanyInfoPreview";
import CompanyInfoEdit from "./CompanyInfoEdit";
import ModalWarning from "../ModalWarning";

function CompanyInfoContent({ company }) {
  const [storage, setStorage] = useState(JSON.parse(localStorage.getItem("company_info")));
  const [isEditMode, toggleEditMode] = useState(true);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState("");
  const [companyName, setCompanyName] = useState(company.name || "");
  const [logo, setLogo] = useState(company.company_logo || "");
  const [mission, setMission] = useState(storage?.mission || company.mission || "");
  const [link, setLink] = useState(storage?.link || company.link || "");
  const [aboutCompany, setAboutCompany] = useState(storage?.info || company.info || "");
  const [showSaveModal, setShowSaveModal] = useState(false);

  const handleMission = (content) => {
    setMission(content);
    if(company.mission !== content) {
      localStorage.setItem("company_info", JSON.stringify({...storage, mission: content}));
      setStorage({...storage, mission: content});
    }
  };
  const handleAboutCompany = (content) => {
    setAboutCompany(content);
    if(company.info !== content) {
      localStorage.setItem("company_info", JSON.stringify({...storage, info: content}));
      setStorage({...storage, info: content});
    }
  };
  const handleLink = (e) => {
    setLink(e.target.value);
    if(company.link !== e.target.value) {
      localStorage.setItem("company_info", JSON.stringify({...storage, link: e.target.value}));
      setStorage({...storage, link: e.target.value});
    }
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
      .finally(() => {
        setShowSaveModal(true);
        localStorage.removeItem("company_info");
        setStorage({});
      });
  };
  const handleShow = (e) => {
    e.preventDefault();
    toggleEditMode(!isEditMode);
  };

  return (
    <>
      {isEditMode ? (
        <CompanyInfoEdit
          companyName={companyName}
          setCompanyName={setCompanyName}
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
      <div className="CompanyInfo__footer">
        <i className="CompanyInfo__warning text-warning">
          { storage && Object.keys(storage).length !== 0 && 'Masz niezapisane zmiany! Kliknij "Zapisz", aby je zachować.' }
        </i>
        <div className="CompanyInfo__buttons">
          <button className="CompanyInfo__button btn" onClick={handleSave}>
            Zapisz
          </button>
          <button className="CompanyInfo__button btn" onClick={handleShow}>
            {isEditMode ? "Podgląd" : "Edytuj"}
          </button>
        </div>
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
