import React, { useEffect, useState } from "react";
import { addPage } from "../hooks/PackagePage";
import ModalWarning from "../ModalWarning";
import { clickButtonAfterPressingEnter } from "../utils";
import bookOpenedIcon from "../../static/icons/book-opened.svg";

function FormTableAddNew(props) {
    const [title, setTitle] = useState("");
    const [packageModal, setPackageModal] = useState();
    const [button, setButton] = useState();

    useEffect(() => {
        handleWindowResize();
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize)
    }, []);

    const handleWindowResize = () => {
        setButton(window.innerWidth > 460
            ? "Dodaj"
            : <i className="bi bi-plus-circle"></i>
        )
    };

    const handleClick = function(e){
        let order = props.getOrder();
        let accepted = addPage(props.handleUpdate, title, props.id, order+1, props.companyId, popUpAddPackageError);
        setTitle("");
        console.log(accepted)
    }
    
    const handleInputTitle = (e) => {
        setTitle(e.target.value);
    }

    const hidePopUp = () => {
        setPackageModal(<></>);
    };

    const popUpAddPackageError = (message) => {
        setPackageModal(
            <ModalWarning
                handleAccept={ hidePopUp }
                title={ "Dodanie rozdziału" }
                message={ message }
                id={ 0 }
                show={ true }
                acceptText={ "Ok" } />
        );
    }

    return(
        <section className="FormTableAddNew">
            <header className="FormTableAddNew__header-wrapper">
                <img className="FormTable__icon" src={ bookOpenedIcon } alt="#" />
                <h2 className="FormTableAddNew__header">
                    <i>Stwórz rozdział wdrożenia</i>
                </h2>
            </header>
            <div className="FormTableAddNew__input-wrapper">
                <input
                    type="text"
                    value={ title }
                    onChange={ handleInputTitle }
                    onKeyUp={ (e) => clickButtonAfterPressingEnter(e, "btn-add-page") }
                    className="FormTableAddNew__input form-control"
                    placeholder="Nazwa rozdziału" />
                <button
                    id="btn-add-page"
                    className="FormTableAddNew__button btn"
                    data-display="static"
                    aria-haspopup="true"
                    aria-expanded="false"
                    title="Dodaj"
                    onClick={ handleClick }
                >
                    { button }
                </button>
            </div>
            { packageModal }
        </section>
    )
}
export default FormTableAddNew;

