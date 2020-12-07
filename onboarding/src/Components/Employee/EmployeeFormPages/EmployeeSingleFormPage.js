import React from "react";
import EmployeeSections from "./EmployeeSections";
import PropTypes from "prop-types";

const EmployeeSinglePage = ({ page }) => {
  const pageLink = page.link ? page.link.replace(/watch\?v=/g, "embed/") : "";

  return (
    <div className="page has-sidebar-expand-xl">
      <div className="page-inner">
        <div className="page-section">
          <div className="card card-fluid">
            <div className="card-header">{page.title}</div>
            <div className="card-body">{page.description}</div>

            <div className="card-body">
              <div className="embed-responsive embed-responsive-21by9">
                <iframe
                  className="embed-responsive-item"
                  src={pageLink}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="video"
                />
              </div>
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
