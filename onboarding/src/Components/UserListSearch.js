import React, { useState, useEffect } from "react";

function UserListSearch({ users, setSearchResult }) {
    const [searchName, setSearchName] = useState("");
    const [searchDepartment, setSearchDepartment] = useState("");
    const [searchPosition, setSearchPosition] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
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

    useEffect(() => {
      setSearchResult(
        users.filter(
          (user) =>
            user.name?.toLowerCase().includes(searchName.toLowerCase())
            && user.department?.toLowerCase().includes(searchDepartment.toLowerCase())
            && user.position?.toLowerCase().includes(searchPosition.toLowerCase())
            && user.location?.toLowerCase().includes(searchLocation.toLowerCase())
        )
      );
    }, [searchName, searchDepartment, searchPosition, searchLocation]);

    const filterByName = (e) => {
        setSearchName(e.target.value);
    }
    const filterByDepartment = (e) => {
        setSearchDepartment(e.target.value);
    }
    const filterByPosition = (e) => {
        setSearchPosition(e.target.value);
    }
    const filterByLocation = (e) => {
        setSearchLocation(e.target.value);
    }

    return (
      <>
        <div className="mb-3">
          <div className="col-sm-4 col-10">
            <input
              type="text"
              className="form-control"
              placeholder="Szukaj pracownika"
              onChange={ filterByName }
            />
          </div>
        </div>
        <p style={{ marginBottom: ".5rem" }}>Filtry</p>
        <div className="d-flex flex-sm-row flex-column mb-4">
          <div className="col-sm-4 col-10 mb-1">
            <div className="has-clearable">
              <input type="text" className="form-control" placeholder="Dział" onChange={ filterByDepartment }/>
            </div>
          </div>
          <div className="col-sm-4 col-10 mb-1">
            <div className="has-clearable">
              <input
                type="text"
                className="form-control"
                placeholder="Stanowisko"
                onChange={ filterByPosition }
              />
            </div>
          </div>
          <div className="col-sm-4 col-10">
            <div className="has-clearable">
              <input
                type="text"
                className="form-control"
                placeholder="Lokalizacja"
                list="location"
                onChange={ filterByLocation }
              />
              <datalist id="location">{ dataOptions }</datalist>
            </div>
          </div>
        </div>
      </>
    );
}

export default UserListSearch;

