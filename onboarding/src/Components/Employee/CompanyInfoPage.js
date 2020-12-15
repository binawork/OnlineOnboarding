import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import CompanyInfoAPI from "../hooks/CompanyInfoAPI";

const CompanyInfoPage = ({ loggedUser }) => {
  const [companyName, setCompanyName] = useState("");
  const [mission, setMission] = useState("");
  const [logo, setLogo] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [link, setLink] = useState("https://www.youtube.com/embed/JxRiPBuPR1k");

  useEffect(() => {
    if(loggedUser.id){

      CompanyInfoAPI.getCompanyName(loggedUser.company_id)
      .catch(error => console.log(error.message))
      .then(result => setCompanyName(result));
    }
  }, [loggedUser]);

  let pageLink;
  if (
    link.match(
      /^(?:(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtu(?:be\.com|\.be))\/(?:watch\?v\=|v\/|embed\/)?([\w\-]+))/i
    )
  ) {
    pageLink = link.replace(/watch\?v=/g, "embed/");
  } else if (
    link?.match(/^(?:(?:https?:\/\/)?(?:www\.)?vimeo\.com.*\/([\w\-]+))/i)
  ) {
    pageLink = link.replace(/vimeo\.com/g, "player.vimeo.com/video");
  }

  return (
    <div className="page">
      <div className="page-inner">
        <div className="page-section">
          <div className="card card-fluid">
            <div className="card-header">Informacje o firmie</div>

            <div className="card-body">
                <div className="media mb-5 d-flex align-items-center">
              {logo ? (
                  <div className="user-avatar user-avatar-xl fileinput-button mr-4">
                    <img src={logo} />
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
                  pageLink ? (
                    <div
                      className="position-relative"
                      style={{
                        overflow: "hidden",
                        paddingTop: "56.25%",
                        background: "rgba(255, 255, 255, 0.2)",
                      }}
                    >
                      {/* <div className="embed-responsive embed-responsive-21by9"> */}
                      <p
                        className="position-absolute"
                        style={{ top: "10px", left: "10px" }}
                      >
                        Ładowanie...
                      </p>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoPage;
