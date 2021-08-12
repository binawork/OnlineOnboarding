import React from "react";
import parse from "html-react-parser";
import { linkToVideo } from "../utils.js";


function CompanyInfoPreview({ logo, link, companyName, mission, aboutCompany }) {
  let videoLink = linkToVideo(link);


  return (
          <div className="CompanyInfoPreview">
            <header className="CompanyInfo__header-wrapper">
              {logo ? (
                <div className="CompanyInfo__logo user-avatar user-avatar-xxl fileinput-button">
                  <img className="UserAccount__avatar" src={logo}  alt="logo" />
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
              videoLink.isVideo ? (
                <div
                  className="CompanyInfoPreview__frame-wrapper"
                >
                  <p
                    className="position-absolute"
                    style={{ top: "10px", left: "10px" }}
                  >
                    Ładowanie...
                  </p>
                  <iframe
                    className="CompanyInfoPreview__frame"
                    src={ videoLink.link }
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    title="video"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <a href={ link } target="_blank" rel="noopener noreferrer">{ link }</a>
              )
            ) : (
              <></>
            )}
            <section className="CompanyInfo__card CompanyInfoPreview__card">{parse(aboutCompany)}</section>
          </div>
  );
}

export default CompanyInfoPreview;
