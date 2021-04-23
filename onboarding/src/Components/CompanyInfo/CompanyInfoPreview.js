import React from "react";
import parse from "html-react-parser";
import { linkToVideo } from "../utils.js";


function CompanyInfoPreview({ logo, link, companyName, mission, aboutCompany }) {
  let videoLink = linkToVideo(link);


  return (
          <div className="card-body">
            <div className="media mb-5 d-flex align-items-center">
              {logo ? (
                <div className="user-avatar user-avatar-xl fileinput-button mr-4">
                  <img src={logo}  alt="logo" />
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
                videoLink.isVideo ? (
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
              <section className="mt-3">{parse(aboutCompany)}</section>
            </div>
          </div>
  );
}

export default CompanyInfoPreview;
