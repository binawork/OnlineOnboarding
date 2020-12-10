import React, { useState } from "react";
import { addCombo } from "../hooks/Packages";

function PackagesAddNew(props) {
    const [title, setTitle] = useState("");


    /*var addSuccess = (result) => {
        props.handleUpdate();/ / update list of packages;
        console.log(result);
    };*/

    var handleClick = function(e){
        let accepted = addCombo(props.handleUpdate, title);
        console.log('accepted:', accepted);
        setTitle("");
        e.target.value = "";
    };

    var handleInput = function(e){
        setTitle(e.target.value);
    }

    const clickAddNewPackage = (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          document.getElementById("add-new-package").click();
        }
      };

    return(
        <div className="row mb-4">
            <div className="col">
                <div className="has-clearable">
                    <button type="button" className="close" aria-label="Close"><span aria-hidden="true"/></button>
                    <input type="text" className="form-control" placeholder="Wpisz nazwę" value={title} onChange={ handleInput } onKeyDown={ clickAddNewPackage } autoFocus />
                </div>{/* dodać liste rozwijaną: wybierz rodzaj formuarza; - wybieranie jaki dodać; */}
            </div>
            <div className="col-auto">
                <div className="dropdown">
                    <button id={"add-new-package"} className="btn btn-secondary" data-display="static" aria-expanded="false" onClick={ handleClick }>Dodaj do listy</button>
                </div>{/* zrobienie przejścia do listy formularzy - package_page; */}
            </div>
        </div>
    )
}
export default PackagesAddNew;

