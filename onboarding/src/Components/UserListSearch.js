import React from "react";


function UserListSearch() {
    let locations = ["Warszawa", "Łódź", "Poznań", "Gdańsk", "Wrocław"], dataOptions = [];
    dataOptions = locations.map( (city, i) =>
        <option key={ i } value={ city } />
    )

    return(
        <>
        <div className="row mb-4">
            <div className="col">
                <div className="has-clearable">
                    <button type="button" className="close" aria-label="Close"><span aria-hidden="true"><i className="fa fa-times-circle"></i></span></button>
                    <input type="text" className="form-control" placeholder="Szukaj" />
                </div>
            </div>
            <div className="col-auto">
                <div className="dropdown">
                    <button className="btn btn-secondary" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">Wyszukaj</button>
                </div>
            </div>
        </div>

        <div className="row mb-4">
            <div className="col">
                <div className="has-clearable">
                    <button type="button" className="close" aria-label="Close"><span aria-hidden="true"><i className="fa fa-times-circle"></i></span></button>
                    <input type="text" className="form-control" placeholder="Dział" />
                </div>
            </div>
            <div className="col">
                <div className="has-clearable">
                    <button type="button" className="close" aria-label="Close"><span aria-hidden="true"><i className="fa fa-times-circle"></i></span></button>
                    <input type="text" className="form-control" placeholder="Stanowisko" />
                </div>
            </div>
            <div className="col">
                <div className="has-clearable">
                    <button type="button" className="close" aria-label="Close"><span aria-hidden="true"><i className="fa fa-times-circle"></i></span></button>
                    <input type="text" className="form-control" placeholder="Lokalizacja" list="location" />
                    <datalist id="location">{ dataOptions }</datalist>
                </div>
            </div>
            <div className="col-auto">
                <div className="dropdown"></div>
            </div>
        </div>
        </>
    )
}

export default UserListSearch;

