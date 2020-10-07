import React, { useState } from "react";
import FormTableAddNew from "./FormTableAddNew";


function FormPackageEdit(props) {
   if(! props.pack){
        return (
            <div>
                Ładowanie ...
            </div>
        )
   }

    const [title, setTitle] = useState(props.pack.title),
        [desc, setDesc] = useState(props.pack.description);

    var handleInputTitle = function(e){
        setTitle(e.target.value);
    }
    var handleInputDesc = function(e){
        setDesc(e.target.value);
    }

    return(
        <div>
            <div className="row mb-4">
                <div className="col">
                    <div className="has-clearable">
                        <input type="text" value={ props.pack.title } onChange = { handleInputTitle } className="form-control" placeholder="Nazwa formularza" />
                    </div>
                </div>
                <div className="col-auto">
                    <div className="dropdown">
                        <button className="btn btn-secondary" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">Zapisz</button>
                    </div>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <div className="has-clearable">
                        <input type="text" value={ props.pack.description } onChange = { handleInputDesc } className="form-control" placeholder="Opis Formularza" />
                    </div>
                </div>
                <div className="col-auto">
                    <div className="dropdown">
                        <button className="btn btn-secondary" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">Zapisz</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormPackageEdit;

