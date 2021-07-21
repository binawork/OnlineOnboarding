import React, { useEffect, useState } from "react";
import { addCombo } from "../hooks/Packages";
import { clickButtonAfterPressingEnter } from "../utils";
import '../../static/css/Modal.scss';
import closeIcon from "../../static/icons/close.svg";

function PackagesAddNew(props) {
    const [title, setTitle] = useState("");

    /*var addSuccess = (result) => {
        props.handleUpdate();/ / update list of packages;
        console.log(result);
    };*/

    const handleClick = function(e){
        if(title) {
            let accepted = addCombo(props.handleUpdate, title, props.popUpAddPackageError);
            console.log('accepted:', accepted);
            setTitle("");
            e.target.value = "";
            props.setShowAddCatalogueBox(false);
        }
    };

    const handleInput = function(e){
        setTitle(e.target.value);
    }

    return(
        <section className="Modal modal modal-alert fade show d-flex flex-column justify-content-center" style={{ backdropFilter: "brightness(55%)"}} onClick={() => props.setShowAddCatalogueBox(false)}>
            <div className="Modal__dialog modal-dialog"  onClick={ e => e.stopPropagation() }>
                <div className="Modal__content">
                    <img className="Modal__close-icon" src={ closeIcon } onClick={() => props.setShowAddCatalogueBox(false)} style={{cursor: "pointer"}} />
                    <header className="Modal__header">
                        Dodaj tytuł wdrożenia (np. BHP, Szkolenia produktowe, Osoby kluczowe etc.)
                    </header>
                    <div className="card-body"></div>
                        <input 
                            type="text"
                            className="Modal__input"
                            value={title}
                            onChange={ handleInput }
                            onKeyUp={ (e) => clickButtonAfterPressingEnter(e, "btn-add-package") }
                            autoFocus
                            aria-label="Wpisz tytuł wdrożenia" />
                        <button
                            id="btn-add-package"
                            className="Modal__button btn btn-secondary"
                            data-display="static"
                            aria-expanded="false"
                            aria-label="Dodaj"
                            onClick={ handleClick }
                        >
                            Dodaj
                        </button>
                 </div>
            </div>
        </section>
    )
}
export default PackagesAddNew;

