import React, { useRef, useState } from "react";

const CompanyInfoLogo = ({ logo, companyName, setCompanyName, setLogo, setImageFile }) => {
  const logoRef = useRef("");
  const [editName, setEditName] = useState(companyName ? false : true);

  const handleLogo = () => {
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
  const handleCompanyChange = (e) => {
    setCompanyName(e.target.value);
  }
  const handleClick = (e) => {
    e.preventDefault();
    setEditName(!editName);
    // TODO: zapisywanie nazwy
  }

  return (
    <header className="CompanyInfo__header-wrapper">
      <div className="CompanyInfo__logo user-avatar user-avatar-xl fileinput-button">
        <div className={`UserAccount__icon-wrapper ${logo ? "fileinput-button-label" : ""}`}>
          <i className="UserAccount__download-icon bi bi-download"></i>
        </div>
        { logo && (
          <img
            className="UserAccount__avatar"
            src={ logo }
            alt="avatar" /> 
        )}
        <input
          className="UserAccount__avatar-input"
          id="fileupload-avatar"
          type="file"
          name="avatar"
          ref={ logoRef }
          onChange={ handleLogo } />
      </div>
      <div className="CompanyInfo__name-wrapper">
        <div className="CompanyInfo__name">
          <small className="CompanyInfo__text">
            { editName ? "Dodaj nazwę organizacji" : "Nazwa organizacji" }
          </small>
          {
            editName 
              ? <input className="CompanyInfo__input form-control" value={ companyName } onChange={ handleCompanyChange } />
              : (
                <h1 className="CompanyInfo__header">
                  { companyName }
                </h1>
              )
          }
        </div>
        {/* TODO */}
        {/* <button className="CompanyInfo__button" onClick={ handleClick }>
          { editName ? "Zapisz" : "Zmień" }
        </button> */}
      </div>
    </header>
  );
};

export default CompanyInfoLogo;
