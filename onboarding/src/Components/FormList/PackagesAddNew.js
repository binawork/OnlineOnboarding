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
                    <input type="text" className="form-control" placeholder="New Package" onChange={ handleInput } />
                </div>
            </div>
            <div className="col-auto">
                <div className="dropdown">
                    <button className="btn btn-secondary" data-display="static" aria-expanded="false" style={{color: "black"}} onClick={ handleClick }>Add New Package</button>
                </div>
            </div>
        </div>
    )
}
export default PackagesAddNew;

