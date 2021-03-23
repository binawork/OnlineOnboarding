import React, { useRef } from "react";

const CompanyInfoLogo = ({ logo, companyName, setLogo, setImageFile }) => {
  const logoRef = useRef("");

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

  return (
    <div className="media mb-4 d-flex align-items-center">
      <div className="CompanyInfo__logo user-avatar user-avatar-xl fileinput-button">
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
        <b>{companyName}</b>
      </p>
    </div>
  );
};

export default CompanyInfoLogo;
