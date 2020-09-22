import React, { useState } from "react";

function PackagesAddNew() {
	const [title, setTitle] = useState("");

	var handleInput = function(e){
		setTitle(e.target.value);
	}

	var handleClick = function(e){
		console.log(title);
	}

    return(
        <div className="row mb-4">
            <div className="col">
                <div className="has-clearable">
                    <button type="button" className="close" aria-label="Close"><span aria-hidden="true"/></button>
                    <input type="text" className="form-control" placeholder="Wpisz nazwę" onChange={ handleInput } />
                </div>{/* dodać liste rozwijaną: wybierz rodzaj formuarza; - wybieranie jaki dodać; */}
            </div>
            <div className="col-auto">
                <div className="dropdown">
                    <button className="btn btn-secondary" data-display="static" aria-expanded="false" style={{color: "black"}} onClick={ handleClick }>Dodaj do listy</button>
                </div>{/* zrobienie przejścia do listy formularzy - package_page; */}
            </div>
        </div>
    )
}
export default PackagesAddNew;

