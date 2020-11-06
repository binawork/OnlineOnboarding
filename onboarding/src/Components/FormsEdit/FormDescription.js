import React, { useState } from "react";
import { savePageDetails } from "../hooks/FormsEdit";

const FormDescription = ({ location, pageId }) => {
  const [pageName, setPageName] = useState(
    location.state ?? pageName ? location.state.pageName : ""
  );
  const [link, setLink] = useState(
    location.state ?? link ? location.state.link : ""
  );
  const [description, setDescription] = useState(
    location.state ?? description ? location.state.description : ""
  );

  const handleSave = (e) => {
    e.preventDefault();
    savePageDetails((res) => {},
      pageId,
      pageName,
      link,
      description
    ); // pack as one argument;
  };

  return (
    <form>
      {" "}
      {/* form placeholder */}
      <div className="page-section">
        <div className="card card-fluid">
          <div className="card-header">Strona</div>
          <div className="card-body">
            <div className="form-group">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nazwa strony"
                  value={pageName}
                  onChange={(e) => setPageName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <input
                  type="url"
                  className="form-control"
                  placeholder="Podłącz link do video / link do dokumentu"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                placeholder="Opis"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <div className="input-group-append">
                <button className="btn btn-success" onClick={handleSave}>
                  Zapisz stronę
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormDescription;
