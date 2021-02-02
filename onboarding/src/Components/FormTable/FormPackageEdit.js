import React, { useState, useEffect } from "react";
import { savePackageDetails } from "../hooks/PackagePage";
import { clickButtonAfterPressingEnter } from "../utils";
import ModalWarning from "../ModalWarning";

function FormPackageEdit(props) {
    if(! props.pack){
            return (
                <div>
                    Ładowanie ...
                </div>
            )
    }
    const [saveModal, setSaveModal] = useState(<></>);
    const [pack, setPackage] = useState(props.pack);
    const [editTitle, setEditTitle] = useState(false);

    useEffect(() => {
        setPackage(props.pack);
    }, [props.pack])


    var handleInputTitle = function(e){
        //pack.title = e.target.value;
        setPackage({title: e.target.value, description: pack.description, packageId: pack.packageId});
    }
    var handleInputDesc = function(e){
        //pack.description = e.target.value;
        setPackage({title: pack.title, description: e.target.value, packageId: pack.packageId});
    }
    
    const hideModal = () => {
        setSaveModal(<></>);
    }

    const handleSave = (e) => {
        const isSaved = savePackageDetails(function(res){}, pack.packageId, pack.title, pack.description);// pack as one argument;
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
        setEditTitle(false);
    }

    return(
        <div>
            <div className="row mb-4">
                <div className="col d-flex align-items-center">
                    <div className="has-clearable w-100">
                    { editTitle
                        ? <input type="text" value={ pack.title } onChange = { handleInputTitle } onKeyUp={ (e) => clickButtonAfterPressingEnter(e, "btn-save-form-name") } className="form-control" placeholder="Nazwa katalogu" />
                        : <b className="font-weight-light font-size-lg" style={{ paddingLeft: "12px" }}>{ pack.title }</b>
                    }
                    </div>
                </div>
                <div className="col-auto">
                    <div className="dropdown">
                    { editTitle
                        ? <button id="btn-save-form-name" className="btn btn-secondary" data-display="static" aria-expanded="false" onClick = { handleSave }>Zapisz</button>
                        : <button id="btn-save-form-name" className="btn btn-secondary" data-display="static" aria-expanded="false" onClick = { () => setEditTitle(true) }>Zmień</button>
                    }
                    </div>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col d-flex align-items-center">
                    <div className="has-clearable w-100">
                    <small style={{ paddingLeft: "12px" }}>Opis katalogu (tu możesz opisać w kilku słowach zawartość tego katalogu, np. wytyczne do tworzonych treści, zawartości etc.)</small>
                        <input type="text" value={ pack.description } onChange = { handleInputDesc } onKeyUp={ (e) => clickButtonAfterPressingEnter(e, "btn-save-form-description") } className="form-control" placeholder="Opis katalogu" />
                    </div>
                </div>
                <div className="col-auto d-flex align-items-end">
                    <div className="dropdown">
                        <button id="btn-save-form-description" className="btn btn-secondary" data-display="static" aria-expanded="false" onClick = { handleSave }>Zapisz</button>
                    </div>
                </div>
                { saveModal }
            </div>
        </div>
    )
}

export default FormPackageEdit;

