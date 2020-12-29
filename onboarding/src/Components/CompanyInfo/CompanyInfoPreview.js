import React from "react";
import parse from "html-react-parser";

function CompanyInfoPreview({ logo, link, companyName, mission, aboutCompany }) {
  let videoLink;
  if (
    link.match(
      /^(?:(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtu(?:be\.com|\.be))\/(?:watch\?v\=|v\/|embed\/)?([\w\-]+))/i
    )
  ) {
    videoLink = link.replace(/watch\?v=/g, "embed/").replace(/&[\w]+=[\w]+/g, "");
  } else if (
    link?.match(/^(?:(?:https?:\/\/)?(?:www\.)?vimeo\.com.*\/([\w\-]+))/i)
  ) {
    videoLink = link.replace(/vimeo\.com/g, "player.vimeo.com/video");
  }

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
  );
}

export default CompanyInfoPreview;