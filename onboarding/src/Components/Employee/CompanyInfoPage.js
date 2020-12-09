import React, { useState, useEffect } from "react";
import parse from "html-react-parser";

const CompanyInfoPage = () => {
  const [mission, setMission] = useState("");
  const [logo, setLogo] = useState("/onboarding/static/images/circle.png");
  const [aboutCompany, setAboutCompany] = useState("");
  const [link, setLink] = useState("");

  return (
    <div className="page">
      <div className="page-inner">
        <div className="page-section">
          <div className="card card-fluid">
            <div className="card-header">Informacje o firmie</div>

            <div className="card-body">
              {logo === "/onboarding/static/images/circle.png" ? (
                <></>
              ) : (
                <div className="media mb-5">
                  <div className="user-avatar user-avatar-xl fileinput-button">
                    <img src={logo} />
                  </div>
                </div>
              )}
              <div className="mb-5 w-100">
                <section className="mb-3">{parse(mission)}</section>
                {/* Responsive video */}
                <div
                  className="w-100 position-relative"
                  style={{ overflow: "hidden", paddingTop: "56.25%" }}
                >
                  <iframe
                    className="w-100 h-100 position-absolute"
                    style={{ top: "0", left: "0" }}
                    src={link}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <section className="mt-3">{parse(aboutCompany)}</section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoPage;
