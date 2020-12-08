import React from "react";
import MarkdownArea from "../MarkdownArea";

function CompanyInfoEdit() {
  const handleSave = (e) => {
    e.preventDefault();
  }
  const handleShow = (e) => {
    e.preventDefault();
  }
  return (
    <div className="page-section">
      <div className="card card-fluid">
        <div className="card-header">Informacje o firmie</div>
        <div className="card-body">
          <div className="media mb-5">
            <div className="user-avatar user-avatar-xl fileinput-button">
              <div className="fileinput-button-label"> Zmień logo </div>
              <img src="/onboarding/static/images/circle.png" />
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
            <div className="form-group">
              <input
                type="media"
                className="form-control"
                id="video-link"
                placeholder="Link do wideo"
                aria-label="Link do wideo o firmie"
              />
            </div>
            <MarkdownArea
              id={"about-company"}
              // content={question}
              // contentChange={changeQuestion}
              simple={false}
              placeholder={"Napisz coś o firmie"}
              height={300}
            />
          </div>
        </div>
      </div>
      <button className="btn btn-success mr-3" onClick={handleSave}>
        Zapisz
      </button>
      <button className="btn btn-success mr-3" onClick={handleShow}>
        Podgląd
      </button>
    </div>
  );
}

export default CompanyInfoEdit;
