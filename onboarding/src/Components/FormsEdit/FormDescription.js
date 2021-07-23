import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { savePageDetails } from "../hooks/FormsEdit";
import ModalWarning from "../ModalWarning";
import { isValidUrl } from "../utils";
import bookOpenedIcon from "../../static/icons/book-opened.svg";

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
        title={"Zmiana danych rozdziału"}
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
    <form className="FormDescription" onSubmit={ handleSave }>
      <header className="FormDescription__header">
        <p className="FormDescription__text">
          <i>Tytuł rozdziału:</i>
        </p>
        <div className="FormDescription__title-wrapper">
          <img className="FormDescription__icon" src={ bookOpenedIcon } alt="#" />
          {/* TODO: stan normalny i stan edycji nazwy rozdziału */}
          <input
            id="title"
            type="text"
            className="FormDescription__input form-control m-0"
            placeholder="Tytuł"
            value={ formData ? formName : "Ładowanie..." }
            onChange={ (e) => setFormName(e.target.value) }
            maxLength="200"
            required
            />
            {/* TODO */}
            {/* <h1 className="FormDescription__title">{ formData ? formName : "Ładowanie..." }</h1> */}
            {/* <button className="FormDescription__button">Edytuj</button> */}
        </div>
      </header>

      <section className="FormDescription__content">
        <label className="FormDescription__label" htmlFor="link">Link do wideo / dokumentu</label>
        <div className="FormDescription__content-box">
          <input
              id="link"
              type="url"
              className="FormDescription__input form-control"
              placeholder="https://example.com"
              value={ formData ? link : "Ładowanie..." }
              onChange={ (e) => setLink(e.target.value) }
              maxLength="200"
            />
            {/* TODO: funkcjonalność przycisku */}
            <button className="FormDescription__button btn">
              Dołącz plik
            </button>
          </div>
        <label className="FormDescription__label" htmlFor="desc">Tekst (liczba znaków: 1500)</label>
        <textarea
          id="desc"
          className="FormDescription__input form-control"
          placeholder="Tekst"
          rows="4"
          value={ formData ? description : "Ładowanie..." }
          onChange={ (e) => setDescription(e.target.value) }
          maxLength="1500"
        ></textarea>
        <div className="FormDescription__button-wrapper">
          <button className="FormDescription__button FormDescription__button--right btn" type="submit">
            Zapisz opis
            {/* Po dodaniu funkcjonalności edycji samego tytułu zmienić treść przycisku na:  */}
            {/* Zapisz tekst */}
          </button>
        </div>
      </section>
      { saveModal }
    </form>
  );
};

export default FormDescription;
