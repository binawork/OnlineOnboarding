import React, { useState, useEffect } from "react";
import { savePackageDetails } from "../hooks/PackagePage";


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
        setPackage({title: e.target.value, description: pack.description, packageId: pack.packageId});
    }
    var handleInputDesc = function(e){
        //pack.description = e.target.value;
        setPackage({title: pack.title, description: e.target.value, packageId: pack.packageId});
    }
    var handleSave = (e) => {
        savePackageDetails(function(res){}, pack.packageId, pack.title, pack.description);// pack as one argument;
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
                        <button className="btn btn-secondary" data-display="static" aria-expanded="false" onClick = { handleSave }>Zapisz</button>
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
                        <button className="btn btn-secondary" data-display="static" aria-expanded="false" onClick = { handleSave }>Zapisz</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormPackageEdit;

