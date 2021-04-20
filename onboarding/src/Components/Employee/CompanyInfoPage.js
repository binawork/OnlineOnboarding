import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import parse from "html-react-parser";
import CompanyInfoAPI from "../hooks/CompanyInfoAPI";
import PageAddressBar from "../PageAddressBar";

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
    if (link.match(
        /^(?:(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtu(?:be\.com|\.be))\/(?:watch\?v\=|v\/|embed\/)?([\w\-]+))/i
    )) {
      videoLink = link
        .replace(/watch\?v=/g, "embed/")
        .replace(/&[\w]+=[\w]+/g, "");
    } else if (link?.match(
      /^(?:(?:https?:\/\/)?(?:www\.)?vimeo\.com.*\/([\w\-]+))/i
    )) {
      videoLink = link.replace(/vimeo\.com/g, "player.vimeo.com/video");
    }
  }

  return (
    <div className="page-inner">
      <PageAddressBar page="Informacje o firmie" />
      <div className="page-section">
        <div className="card card-fluid">
          <div className="card-header">Informacje o firmie</div>
          {loading ? (
            <div className="card-body">Ładowanie...</div>
          ) : error ? (
            <div className="card-body">{error}</div>
          ) : (
            <div className="card-body">
              <div className="media mb-5 d-flex align-items-center">
                {logo ? (
                  <div className="user-avatar user-avatar-xl fileinput-button mr-4">
                    <img alt="logo" src={logo} />
                  </div>
                ) : (
                  <></>
                )}
                <p className="m-0" style={{ fontSize: "1.5rem" }}>
                  <b>{companyName}</b>
                </p>
              </div>
              <div className="mb-5 w-100 col-xl-6 col-lg-8 col-12">
                <section className="mb-3">{parse(mission)}</section>
                {link !== "" ? (
                  videoLink ? (
                    <div
                      className="position-relative"
                      style={{
                        overflow: "hidden",
                        paddingTop: "56.25%",
                        background: "rgba(255, 255, 255, 0.2)",
                      }}
                    >
                      <p
                        className="position-absolute"
                        style={{ top: "10px", left: "10px" }}
                      >
                        Ładowanie...
                      </p>
                      <iframe
                        className="w-100 h-100 position-absolute"
                        style={{ top: "0", left: "0" }}
                        src={videoLink}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        title="video"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    <a href={link} target="_blank">
                      LINK
                    </a>
                  )
                ) : (
                  <></>
                )}
                <section className="mt-3">{parse(aboutCompany)}</section>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

CompanyInfoPage.propTypes = {
  loggedUser: PropTypes.object.isRequired,
};

export default CompanyInfoPage;
