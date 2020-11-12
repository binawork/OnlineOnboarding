import React, { useState } from "react";
import { addPage } from "../hooks/PackagePage";

function FormTableAddNew(props) {
    const [title, setTitle] = useState("");

    var handleClick = function(e){
        let order = props.getOrder();
        let accepted = addPage(props.handleUpdate, title, props.id, order+1, props.loggedUser.company_id);
        setTitle("");
    }

    var handleInputTitle = (e) => {
        setTitle(e.target.value);
    }

    return(
        <div className="row mb-4">
            <div className="col">
                <div className="has-clearable">
                    <button type="button" className="close" aria-label="Close"><span aria-hidden="true"/></button>
                    <input type="text" value={ title } onChange = { handleInputTitle } className="form-control" placeholder="Nowa nazwa strony" />
                </div>
            </div>
            <div className="col-auto">
                <div className="dropdown">
                    <button className="btn btn-secondary" data-display="static" aria-haspopup="true" aria-expanded="false" onClick={ handleClick }>Dodaj</button>
                </div>
            </div>
        </div>
    )
}
export default FormTableAddNew;

