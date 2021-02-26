import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { savePageDetails } from "../hooks/FormsEdit";
import ModalWarning from "../ModalWarning";

const FormDescription = ({ formId, formData }) => {
  const location = useLocation();
  const [formName, setFormName] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [saveModal, setSaveModal ] = useState(<></>);

  if(location.state && !formName) {
    location.state.formName && setFormName(location.state.formName);
    location.state.description && setDescription(location.state.description);
    location.state.link && setLink(location.state.link);
  } else {
    if(formData && !formName) {
      formData.title && setFormName(formData.title);
      formData.description && setDescription(formData.description);
      formData.link && setLink(formData.link);
    };
  };

  const handleSave = (e) => {
    e.preventDefault();
    const isSaved = savePageDetails((res) => {},
      formId,
      formName,
      link,
      description
    ); // pack as one argument;
    if(isSaved) {
      setSaveModal(
        <ModalWarning
          handleAccept={hideModal}
          title={"Zmiana danych formularza"}
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
      <section className="page-section">
        <div className="card card-fluid">
          <header className="card-header">Formularz</header>
          <div className="card-body">
            { !formData && <p>Ładowanie...</p> }
            <div className="form-group">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nazwa formularza"
                  value={ formName }
                  onChange={ (e) => setFormName(e.target.value) }
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
                  value={ link }
                  onChange={ (e) => setLink(e.target.value) }
                />
              </div>
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                placeholder="Opis"
                rows="4"
                value={ description }
                onChange={ (e) => setDescription(e.target.value) }
              ></textarea>
            </div>
            <div className="form-group">
              <div className="input-group-append">
                <button className="btn btn-success" onClick={ handleSave }>
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
