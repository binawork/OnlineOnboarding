import React, { useState } from "react";
import parse from "html-react-parser";
import MarkdownArea from "../MarkdownArea";

function CompanyInfoEdit({ companyName }) {
  const [isEditMode, toggleEditMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [mission, setMission] = useState("");
  const [logo, setLogo] = useState("/onboarding/static/images/circle.png");
  const [aboutCompany, setAboutCompany] = useState("");
  const [link, setLink] = useState("https://www.youtube.com/embed/JxRiPBuPR1k");

  let pageLink;
  if(link.match(/^(?:(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtu(?:be\.com|\.be))\/(?:watch\?v\=|v\/|embed\/)?([\w\-]+))/i)) {
    pageLink = link.replace(/watch\?v=/g, "embed/");
  } else if(link?.match(/^(?:(?:https?:\/\/)?(?:www\.)?vimeo\.com.*\/([\w\-]+))/i)) {
    pageLink = link.replace(/vimeo\.com/g, "player.vimeo.com/video");
  }

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Zapisywanie...")
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
          <div className="card-body col-xl-6 col-lg-8 col-12">
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

            <div className="">
              {/* <h3 className="card-title">O firmie</h3> */}
              <label htmlFor="">Nagłówek:</label>
              <MarkdownArea
                id={"company-mission"}
                content={mission}
                contentChange={handleMission}
                simple={false}
                placeholder={"Np. misja firmy"}
              />
              <div className="form-group">
                <label htmlFor="video-link">Link:</label>
                <input
                  type="url"
                  className="form-control"
                  id="video-link"
                  placeholder="Np. https://www.youtube.com/..."
                  aria-label="Link do wideo o firmie"
                  value={link}
                  onChange={handleLink}
                />
              </div>
              <label htmlFor="about-company">Opis:</label>
              <MarkdownArea
                id="about-company"
                content={aboutCompany}
                contentChange={handleAboutCompany}
                simple={false}
                placeholder={"O firmie"}
                height={200}
              />
            </div>
          </div>
        ) : (
          <div className="card-body">
            {/* {logo === "/onboarding/static/images/circle.png" ? (
              <></>
            ) : ( */}
            <div className="media mb-5 d-flex align-items-center">
              <div className="user-avatar user-avatar-xl fileinput-button mr-4">
                <img src={logo} />
              </div>
              <p className="m-0" style={{ fontSize: "1.5rem" }}>
                <b>{companyName}</b>
              </p>
            </div>
            {/* )} */}
            <div className="mb-5 w-100 col-xl-6 col-lg-8 col-12">
              <section className="mb-3">{parse(mission)}</section>

              {link !== "" 
                ? pageLink 
                  ? (
                    <div
                      className="position-relative"
                      style={{
                        overflow: "hidden",
                        paddingTop: "56.25%",
                        background: "rgba(255, 255, 255, 0.2)",
                      }}
                    >
                   {/* <div className="embed-responsive embed-responsive-21by9"> */}
                      <p className="position-absolute" style={{ top: "10px", left: "10px" }}>Ładowanie...</p>
                      <iframe
                        // className="embed-responsive-item"
                        className="w-100 h-100 position-absolute"
                        style={{ top: "0", left: "0" }}
                        src={link}
                        frameBorder="0"
                        // allow="autoplay; encrypted-media"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        title="video"
                        allowFullScreen
                      ></iframe>
                    </div>
              ) : ( <a href={ link } target="_blank">LINK</a> ) : (
                <></>
              )}

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
