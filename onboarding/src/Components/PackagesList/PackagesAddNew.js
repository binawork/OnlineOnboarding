import React, { useEffect, useState } from "react";
import { addCombo } from "../hooks/Packages";
import { clickButtonAfterPressingEnter } from "../utils";

function PackagesAddNew(props) {
    const [title, setTitle] = useState("");
    const [button, setButton] = useState(
        window.innerWidth > 420
            ? "Dodaj"
            : <i className="bi bi-plus-circle"></i>
    );

    useEffect(() => {
        window.addEventListener("resize", handleResize);
    }, []);

    /*var addSuccess = (result) => {
        props.handleUpdate();/ / update list of packages;
        console.log(result);
    };*/

    const handleResize = () => {
        setButton(window.innerWidth > 420
            ? "Dodaj"
            : <i className="bi bi-plus-circle"></i>
        )
    };

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
        <div className="row mb-4">
            <div className="col pr-0">
                <div className="has-clearable">
                    <button type="button" className="close" aria-label="Zamknij"><span aria-hidden="true"/></button>
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Wpisz nazwę"
                        value={title}
                        onChange={ handleInput }
                        onKeyUp={ (e) => clickButtonAfterPressingEnter(e, "btn-add-package") }
                        autoFocus />
                </div>{/* dodać liste rozwijaną: wybierz rodzaj formuarza; - wybieranie jaki dodać; */}
            </div>
            <div className="col-auto">
                <div className="dropdown">
                    <button
                        id="btn-add-package"
                        className="btn btn-secondary"
                        data-display="static"
                        aria-expanded="false"
                        aria-label="Dodaj"
                        onClick={ handleClick }
                    >
                        { button }
                    </button>
                </div>{/* zrobienie przejścia do listy formularzy - package_page; */}
            </div>
        </div>
    )
}
export default PackagesAddNew;

