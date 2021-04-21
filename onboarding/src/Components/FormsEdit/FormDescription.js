import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { savePageDetails } from "../hooks/FormsEdit";
import ModalWarning from "../ModalWarning";
import { isValidUrl } from "../utils";

const FormDescription = ({ formId, formData }) => {
  const location = useLocation();
  const [formName, setFormName] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [saveModal, setSaveModal ] = useState(<></>);

  useEffect(() => {
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
  }, [formData]);

  const hideModal = () => {
    setSaveModal(<></>);
  };

  const popUpSaveFormDetails = (message) => {
    setSaveModal(
      <ModalWarning
        handleAccept={hideModal}
        title={"Zmiana danych formularza"}
        message={message}
        show={true}
        acceptText={"Ok"}
        id={0}
      />
    );
  };

  const handleSave = (e) => {
    e.preventDefault();
    const isValid = isValidUrl(link);
    if(isValid || !link) {
      const isSaved = savePageDetails(
        popUpSaveFormDetails,
        formId,
        formName,
        link,
        description
        ); // pack as one argument;
    } else {
      popUpSaveFormDetails("Błąd: Wprowadzono nieprawidłowy adres url")
    }
  };

  return (
    <form onSubmit={ handleSave }>
      <section className="page-section">
        <div className="card card-fluid">
          <header className="card-header">Formularz</header>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="title">Nazwa formularza</label>
              <div className="input-group">
                <input
                  id="title"
                  type="text"
                  className="form-control"
                  placeholder="Nazwa formularza"
                  value={ formData ? formName : "Ładowanie..." }
                  onChange={ (e) => setFormName(e.target.value) }
                  maxLength="200"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="link">Link do wideo / dokumentu</label>
              <div className="input-group">
                <input
                  id="link"
                  type="url"
                  className="form-control"
                  placeholder="https://example.com"
                  value={ formData ? link : "Ładowanie..." }
                  onChange={ (e) => setLink(e.target.value) }
                  maxLength="200"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="desc">Opis</label>
              <textarea
                id="desc"
                className="form-control"
                placeholder="Opis"
                rows="4"
                value={ formData ? description : "Ładowanie..." }
                onChange={ (e) => setDescription(e.target.value) }
                maxLength="1500"
              ></textarea>
            </div>
            <div className="form-group">
              <div className="input-group-append">
                <button className="btn btn-success" type="submit" style={{ zIndex: "0" }}>
                  Zapisz opis
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
