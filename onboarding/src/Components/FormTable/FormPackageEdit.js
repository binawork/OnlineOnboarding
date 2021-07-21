import React, { useState, useEffect } from "react";
import { savePackageDetails } from "../hooks/PackagePage";
import { clickButtonAfterPressingEnter } from "../utils";
import ModalWarning from "../ModalWarning";
import SaveIcon from "../../static/icons/SaveIcon";
import bookIcon from "../../static/icons/book.svg";

function FormPackageEdit({ title, description, packageId, setPackageTitleInAddressBar, handleEditTitle }) {
    const [saveModal, setSaveModal] = useState(<></>);
    const [packageTitle, setPackageTitle] = useState("");
    const [packageDescription, setPackageDescription] = useState("");
    const [editTitle, setEditTitle] = useState(false);
    const [buttonEdit, setButtonEdit] = useState();
    const [buttonSave, setButtonSave] = useState();

    useEffect(() => {
        handleWindowResize();
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    useEffect(() => {
        title && setPackageTitle(title);
        description ? setPackageDescription(description) : setPackageDescription("");
    }, [title, description]);

    const handleWindowResize = () => {
        setButtonEdit(window.innerWidth > 460
            ? "Zmień tytuł"
            : <i className="bi bi-pencil-square" />
        );
        setButtonSave(window.innerWidth > 460
            ? "Zapisz"
            : <SaveIcon />
        );
      }

    const handleInputTitle = function(e){
        setPackageTitle(e.target.value);
    }
    const handleInputDesc = function(e){
        setPackageDescription(e.target.value);
    }

    const hideModal = () => {
        setSaveModal(<></>);
    }

    const popUpSaveForm = (message) => {
        setSaveModal(
            <ModalWarning
                handleAccept={hideModal}
                title={"Zmiana danych wdrożenia"}
                message={message}
                show={true}
                acceptText={"Ok"}
                id={0}
            />
        );
    };

    const handleSave = () => {
        savePackageDetails(popUpSaveForm, packageId, packageTitle, packageDescription);// pack as one argument;
        setEditTitle(false);
        setPackageTitleInAddressBar(packageTitle);
        handleEditTitle(packageId, packageTitle);
    }

    return(
        <section className="FormPackageEdit">
            <div className="FormPackageEdit__content-wrapper">
                <div className="FormPackageEdit__header-wrapper">
                    <img className="FormPackageEdit__icon" src={ bookIcon } alt="#" />
                    { editTitle
                        ? <input
                            type="text"
                            value={ packageTitle }
                            onChange = { handleInputTitle }
                            onKeyUp={ (e) => clickButtonAfterPressingEnter(e, "btn-save-form-name") } 
                            className="FormPackageEdit__input form-control"
                            placeholder="Nazwa wdrożenia" />
                        : <h1 className="FormPackageEdit__header">
                            { packageTitle }
                        </h1>
                    }
                </div>
                { editTitle
                    ? (
                        <button 
                            id="btn-save-form-name"
                            className="FormPackageEdit__button"
                            data-display="static"
                            aria-expanded="false"
                            title="Zapisz"
                            onClick = { handleSave }
                        >
                            { buttonSave }
                        </button>
                    ) : (
                        <button
                            id="btn-save-form-name"
                            className="FormPackageEdit__button btn"
                            data-display="static"
                            aria-expanded="false"
                            title="Edytuj"
                            onClick = { () => setEditTitle(true) }
                        >
                            { buttonEdit }
                        </button>
                    )
                }
            </div>
            <div className="FormPackageEdit__description-wrapper">
                <i className="FormPackageEdit__description">
                    Opis wdrożenia (tu możesz opisać w kilku słowach zawartość tego wdrożenia, np. wytyczne do tworzonych treści, zawartości etc.)
                </i>
                <div className="FormPackageEdit__description-box">
                    <input
                        type="text"
                        value={ packageDescription }
                        onChange={ handleInputDesc }
                        onKeyUp={ (e) => clickButtonAfterPressingEnter(e, "btn-save-form-description") }
                        className="FormPackageEdit__description-input form-control"
                        placeholder="Opis wdrożenia" />
                    <button
                        id="btn-save-form-description"
                        className="FormPackageEdit__button btn"
                        data-display="static"
                        aria-expanded="false"
                        title="Zapisz"
                        onClick = { handleSave }
                    >
                        { buttonSave }
                    </button>
                </div>
            </div>
            { saveModal }
        </section>
    )
}

export default FormPackageEdit;

