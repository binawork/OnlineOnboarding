import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import parse from "html-react-parser";
import CompanyInfoAPI from "../hooks/CompanyInfoAPI";
import PageAddressBar from "../PageAddressBar";
import { linkToVideo } from "../utils.js";
import "../../static/css/CompanyInfo.scss";

const CompanyInfoPage = ({ loggedUser }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [mission, setMission] = useState("");
  const [logo, setLogo] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (loggedUser.id) {
      CompanyInfoAPI.getCompanyInfo(loggedUser.company_id)
        .catch((error) => {
          setError(error.message);
          console.log(error);
        })
        .then((response) => {
          setCompanyName(response.name ? response.name : "");
          setMission(response.mission ? response.mission : "");
          setLogo(response.company_logo ? response.company_logo : "");
          setAboutCompany(response.info ? response.info : "");
          setLink(response.link ? response.link : "");
        })
        .finally(() => setLoading(false));
    }
  }, [loggedUser]);

  let videoLink;
  if (link) {
    videoLink = linkToVideo(link);
    if(videoLink?.isVideo){
        videoLink = videoLink.link;
    } else
        videoLink = false;
  }

  return (
    <div className="page-inner">
      <PageAddressBar page="O firmie" />
      {loading ? (
        <div className="">Ładowanie...</div>
      ) : error ? (
        <div className="">{error}</div>
      ) : (
        <div className="CompanyInfoPreview">
          <header className="CompanyInfo__header-wrapper">
            {logo ? (
              <div className="CompanyInfo__logo user-avatar user-avatar-xxl fileinput-button">
                <img className="UserAccount__avatar" alt="logo" src={logo} />
              </div>
            ) : (
              <></>
            )}
            <div className="CompanyInfo__name CompanyInfoPreview__name">
              <small className="CompanyInfo__text">
                Nazwa organizacji
              </small>
              <h1 className="CompanyInfo__header">
                <b>{companyName}</b>
              </h1>
            </div>
          </header>

          <section className="CompanyInfo__card CompanyInfoPreview__card">
            <h2 className="CompanyInfo__card-header">Nasza misja</h2>
            {parse(mission)}
          </section>

          {link !== "" ? (
            videoLink ? (
              <div className="CompanyInfoPreview__frame-wrapper">
                <p
                  className="position-absolute"
                  style={{ top: "10px", left: "10px" }}
                >
                  Ładowanie...
                </p>
                <iframe
                  className="CompanyInfoPreview__frame"
                  src={ videoLink }
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title="video"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <a href={ link } target="_blank" rel="noopener noreferrer">
                { link }
              </a>
            )
          ) : (
            <></>
          )}

          <section className="CompanyInfo__card CompanyInfoPreview__card">
            {parse(aboutCompany)}
          </section>
        </div>
      )}
    </div>
  );
};

CompanyInfoPage.propTypes = {
  loggedUser: PropTypes.object.isRequired,
};

export default CompanyInfoPage;
