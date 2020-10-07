import React, { useState, useEffect } from "react";
import FormTableAddNew from "./FormTableAddNew";


function FormPackageEdit(props) {
   if(! props.pack){
        return (
            <div>
                Ładowanie ...
            </div>
        )
   }

    const [pack, setPackage] = useState(props.pack);

    useEffect(() => {
        setPackage(props.pack);
    }, [props.pack])


    var handleInputTitle = function(e){
        //pack.title = e.target.value;
        setPackage({title: e.target.value, description: pack.description});
    }
    var handleInputDesc = function(e){
        //pack.description = e.target.value;
        setPackage({title: pack.title, description: e.target.value});
    }

    return(
        <div>
            <div className="row mb-4">
                <div className="col">
                    <div className="has-clearable">
                        <input type="text" value={ pack.title } onChange = { handleInputTitle } className="form-control" placeholder="Nazwa formularza" />
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
                        <input type="text" value={ pack.description } onChange = { handleInputDesc } className="form-control" placeholder="Opis Formularza" />
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

