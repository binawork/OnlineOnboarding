import React, { useEffect, useState } from "react";
import { addPage } from "../hooks/PackagePage";
import ModalWarning from "../ModalWarning";
import { clickButtonAfterPressingEnter } from "../utils";

function FormTableAddNew(props) {
    const [title, setTitle] = useState("");
    const [packageModal, setPackageModal] = useState();
    const [button, setButton] = useState();

    useEffect(() => {
        handleWindowResize();
        window.addEventListener("resize", handleWindowResize);
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
                title={ "Dodanie formularza" }
                message={ message }
                id={ 0 }
                show={ true }
                acceptText={ "Ok" } />
        );
    }

    return(
        <div className="row mb-4">
            <div className="col pr-0">
                <div className="has-clearable">
                    <button
                        type="button"
                        className="close"
                        aria-label="Close">
                        <span aria-hidden="true"/>
                    </button>
                    <input
                        type="text"
                        value={ title }
                        onChange={ handleInputTitle }
                        onKeyUp={ (e) => clickButtonAfterPressingEnter(e, "btn-add-page") }
                        className="form-control"
                        placeholder="Nowa nazwa formularza" />
                </div>
            </div>
            <div className="col-auto">
                <div className="dropdown">
                    <button
                        id="btn-add-page"
                        className="btn btn-secondary"
                        data-display="static"
                        aria-haspopup="true"
                        aria-expanded="false"
                        title="Dodaj"
                        onClick={ handleClick }
                    >
                        { button }
                    </button>
                </div>
            </div>
            { packageModal }
        </div>
    )
}
export default FormTableAddNew;

