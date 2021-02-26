import React, { useState, useEffect } from "react";
import { savePackageDetails } from "../hooks/PackagePage";
import { clickButtonAfterPressingEnter } from "../utils";
import ModalWarning from "../ModalWarning";

function FormPackageEdit({ title, description, packageId, setPackageTitleInAddressBar, handleEditTitle }) {
    const [saveModal, setSaveModal] = useState(<></>);
    const [packageTitle, setPackageTitle] = useState("");
    const [packageDescription, setPackageDescription] = useState("");
    const [editTitle, setEditTitle] = useState(false);
    useEffect(() => {
        title && setPackageTitle(title);
        description ? setPackageDescription(description) : setPackageDescription("");
    }, [title, description])

    const handleInputTitle = function(e){
        setPackageTitle(e.target.value);
    }
    const handleInputDesc = function(e){
        setPackageDescription(e.target.value);
    }
    
    const hideModal = () => {
        setSaveModal(<></>);
    }

    const handleSave = () => {
        const isSaved = savePackageDetails(function(){}, packageId, packageTitle, packageDescription);// pack as one argument;
        if(isSaved) {
            setSaveModal(
                <ModalWarning
                    handleAccept={hideModal}
                    title={"Zmiana danych katalogu"}
                    message={"Zapisano zmiany"}
                    show={true}
                    acceptText={"Ok"}
                    id={0}
                />
            );
        }
        setEditTitle(false);
        setPackageTitleInAddressBar(packageTitle);
        handleEditTitle(packageId, packageTitle);
    }

    return(
        <div>
            <div className="row mb-4">
                <div className="col d-flex align-items-center">
                    <div className="has-clearable w-100">
                    { editTitle
                        ? <input
                            type="text"
                            value={ packageTitle }
                            onChange = { handleInputTitle }
                            onKeyUp={ (e) => clickButtonAfterPressingEnter(e, "btn-save-form-name") } 
                            className="form-control"
                            placeholder="Nazwa katalogu" />
                        : <b className="font-weight-light font-size-lg" style={{ paddingLeft: "12px" }}>
                            { packageTitle }
                          </b>
                    }
                    </div>
                </div>
                <div className="col-auto">
                    <div className="dropdown">
                    { editTitle
                        ? (
                            <button 
                                id="btn-save-form-name"
                                className="btn btn-secondary"
                                data-display="static"
                                aria-expanded="false"
                                onClick = { handleSave }
                            >
                                Zapisz
                            </button>
                        ) : (
                            <button
                                id="btn-save-form-name"
                                className="btn btn-secondary"
                                data-display="static"
                                aria-expanded="false"
                                onClick = { () => setEditTitle(true) }
                            >
                                Zmień
                            </button>
                        )
                    }
                    </div>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col d-flex align-items-center">
                    <div className="has-clearable w-100">
                    <small style={{ paddingLeft: "12px" }}>
                        Opis katalogu (tu możesz opisać w kilku słowach zawartość tego katalogu, np. wytyczne do tworzonych treści, zawartości etc.)
                    </small>
                    <input
                        type="text"
                        value={ packageDescription }
                        onChange={ handleInputDesc }
                        onKeyUp={ (e) => clickButtonAfterPressingEnter(e, "btn-save-form-description") }
                        className="form-control"
                        placeholder="Opis katalogu"
                    />
                    </div>
                </div>
                <div className="col-auto d-flex align-items-end">
                    <div className="dropdown">
                        <button
                            id="btn-save-form-description"
                            className="btn btn-secondary"
                            data-display="static"
                            aria-expanded="false"
                            onClick = { handleSave }
                        >
                            Zapisz
                        </button>
                    </div>
                </div>
                { saveModal }
            </div>
        </div>
    )
}

export default FormPackageEdit;

