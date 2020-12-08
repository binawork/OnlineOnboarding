import React, { useState } from "react";
import parse from "html-react-parser";
import MarkdownArea from "../MarkdownArea";

function CompanyInfoEdit() {
  const [isEditMode, toggleEditMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [mission, setMission] = useState("");
  const [logo, setLogo] = useState("/onboarding/static/images/circle.png");
  const [aboutCompany, setAboutCompany] = useState("");
  const [link, setLink] = useState("https://www.youtube.com/embed/JxRiPBuPR1k");

  const handleSave = (e) => {
    e.preventDefault();
  };
  const handleShow = (e) => {
    e.preventDefault();
    toggleEditMode(!isEditMode);
  };
  const handleMission = (content) => {
    setMission(content);
  };
  const handleAboutCompany = (content) => {
    setAboutCompany(content);
  };
  const handleLink = (e) => {
    setLink(e.target.value);
  };
  return (
    <div className="page-section">
      <div className="card card-fluid">
        <div className="card-header">Informacje o firmie</div>
        {isEditMode ? (
          <div className="card-body">
            <div className="media mb-5">
              <div className="user-avatar user-avatar-xl fileinput-button">
                <div className="fileinput-button-label"> Zmień logo </div>
                <img src={logo} />
                <input id="fileupload-logo" type="file" name="logo" />
              </div>
              <div className="media-body pl-3">
                <h3 className="card-title"> Logo firmy </h3>
                <h6 className="card-subtitle text-muted">
                  Kliknij w kółko, żeby zmienić logo
                </h6>
                <p className="card-text">
                  <small>JPG, GIF, PNG &lt; 2 MB</small>
                </p>
              </div>
            </div>

            <div className="mb-5">
              <h3 className="card-title">O firmie</h3>
              <MarkdownArea
                id={"company-mission"}
                content={mission}
                contentChange={handleMission}
                simple={false}
                placeholder={"Misja / wizja firmy"}
              />
              <div className="form-group">
                <input
                  type="url"
                  className="form-control"
                  id="video-link"
                  placeholder="Link do wideo"
                  aria-label="Link do wideo o firmie"
                  value={link}
                  onChange={handleLink}
                />
              </div>
              <MarkdownArea
                id={"about-company"}
                content={aboutCompany}
                contentChange={handleAboutCompany}
                simple={false}
                placeholder={"Napisz coś o firmie"}
                height={300}
              />
            </div>
          </div>
        ) : (
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
        )}
      </div>

      <button className="btn btn-success mr-3" onClick={handleSave}>
        Zapisz
      </button>
      <button className="btn btn-success mr-3" onClick={handleShow}>
        {isEditMode ? "Podgląd" : "Edytuj"}
      </button>
    </div>
  );
}

export default CompanyInfoEdit;
