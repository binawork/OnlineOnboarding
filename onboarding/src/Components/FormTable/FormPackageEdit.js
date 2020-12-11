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
        console.log('saved')
    }
    const clickEnter = (e, buttonId) => {
        if (e.key === "Enter") {
            e.preventDefault();
            document.getElementById(buttonId).click();
        }
    };

    return(
        <div>
            <div className="row mb-4">
                <div className="col">
                    <div className="has-clearable">
                        <input type="text" value={ pack.title } onChange = { handleInputTitle } onKeyUp={ (e) => clickEnter(e, "save-form-name") } className="form-control" placeholder="Nazwa formularza" />
                    </div>
                </div>
                <div className="col-auto">
                    <div className="dropdown">
                        <button id="save-form-name" className="btn btn-secondary" data-display="static" aria-expanded="false" onClick = { handleSave }>Zapisz</button>
                    </div>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <div className="has-clearable">
                        <input type="text" value={ pack.description } onChange = { handleInputDesc } onKeyUp={ (e) => clickEnter(e, "save-form-description") } className="form-control" placeholder="Opis Formularza" />
                    </div>
                </div>
                <div className="col-auto">
                    <div className="dropdown">
                        <button id="save-form-description" className="btn btn-secondary" data-display="static" aria-expanded="false" onClick = { handleSave }>Zapisz</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormPackageEdit;

