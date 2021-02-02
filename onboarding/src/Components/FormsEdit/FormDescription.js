import React, { useState } from "react";
import { savePageDetails } from "../hooks/FormsEdit";
import ModalWarning from "../ModalWarning";

const FormDescription = ({ location, pageId }) => {
  const [pageName, setPageName] = useState(
    location.state?.pageName || ""
  );
  const [link, setLink] = useState(
    location.state?.link || ""
  );
  const [description, setDescription] = useState(
    location.state?.description || ""
  );
  const [saveModal, setSaveModal ] = useState(<></>);

  const handleSave = (e) => {
    e.preventDefault();
    const isSaved = savePageDetails((res) => {},
      pageId,
      pageName,
      link,
      description
    ); // pack as one argument;
    if(isSaved) {
      setSaveModal(
        <ModalWarning
          handleAccept={hideModal}
          title={""}
          message={"Zapisano zmiany"}
          show={true}
          acceptText={"Ok"}
          id={0}
        />
      );
    }
  };

  const hideModal = () => {
    setSaveModal(<></>);
  }

  return (
    <form>
      {" "}
      {/* form placeholder */}
      <section className="page-section">
        <div className="card card-fluid">
          <header className="card-header">Formularz</header>
          <div className="card-body">
            <div className="form-group">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nazwa formularza"
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
                  Zapisz opis formularza
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      { saveModal }
    </form>
  );
};

export default FormDescription;
