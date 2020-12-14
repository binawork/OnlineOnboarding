import React from "react";
import EmployeeSections from "./EmployeeSections";
import PropTypes from "prop-types";

const EmployeeSinglePage = ({ page }) => {
  let pageLink;
  if(page.link?.match(/^(?:(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtu(?:be\.com|\.be))\/(?:watch\?v\=|v\/|embed\/)?([\w\-]+))/i)) {
    pageLink = page.link ? page.link.replace(/watch\?v=/g, "embed/") : "";
  } else if(page.link?.match(/^(?:(?:https?:\/\/)?(?:www\.)?vimeo\.com.*\/([\w\-]+))/i)) {
    pageLink = page.link ? page.link.replace(/vimeo\.com/g, "player.vimeo.com/video") : "";
  }

  return (
    <div className="page">
      <div className="page-inner">
        <div className="page-section">
          <div className="card card-fluid">
            <div className="card-header">{page.title}</div>
            <div className="card-body">{page.description}</div>

            <div className="card-body">
              {
                pageLink
                  ? (
                    <div className="embed-responsive embed-responsive-21by9">
                      <iframe
                        className="embed-responsive-item"
                        src={pageLink}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        title="video"
                      />
                    </div>
                  ) : (<a href={ page.link } target="_blank">LINK</a>)
              }
            </div>
          </div>
          <EmployeeSections pageId={page.id} />
        </div>
      </div>
    </div>
  );
};

EmployeeSinglePage.propTypes = {
  page: PropTypes.object.isRequired,
};

export default EmployeeSinglePage;
