import React, { useState } from "react";


function UserListSearch({ users, setSearchResult }) {
    // const [searchName]
    const locations = [
        "Białystok", 
        "Bydgoszcz", 
        "Gdańsk", 
        "Katowice",
        "Kielce",
        "Kraków",
        "Lublin",
        "Łódź",
        "Olsztyn",
        "Opole",
        "Poznań",
        "Rzeszów",
        "Szczecin",
        "Warszawa",
        "Wrocław",
        "Zielona Góra"
    ];
    const dataOptions = locations.map( (city, i) =>
        <option key={ i } value={ city } />
    );

    const handleSearch = (e) => {
        // e.preventDefault();
        console.log(users)
        // users = users.filter(a => a.name?.includes("Fael"))
        setSearchResult(users.filter(a => a.name?.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    return (
      <>
        <div className="row mb-4">
          <div className="col-4">
            <input
              type="text"
              className="form-control"
              placeholder="Szukaj pracownika"
              onChange={handleSearch}
            />
          </div>
          {/* <div className="col-auto">
                <div className="dropdown">
                    <button className="btn btn-secondary" onClick={ handleSearch }>Wyszukaj</button>
                </div>
            </div> */}
        </div>

        <div className="row mb-4">
          <div className="col">
            <div className="has-clearable">
              <input type="text" className="form-control" placeholder="Dział" />
            </div>
          </div>
          <div className="col">
            <div className="has-clearable">
              <input
                type="text"
                className="form-control"
                placeholder="Stanowisko"
              />
            </div>
          </div>
          <div className="col">
            <div className="has-clearable">
              <input
                type="text"
                className="form-control"
                placeholder="Lokalizacja"
                list="location"
              />
              <datalist id="location">{dataOptions}</datalist>
            </div>
          </div>
          <div className="col-auto">
            <div className="dropdown"></div>
          </div>
        </div>
      </>
    );
}

export default UserListSearch;

