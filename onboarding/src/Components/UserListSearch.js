import React, { useState, useEffect } from "react";
import "../static/css/UsersList.scss";

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
    }, [searchName, searchDepartment, searchPosition, searchLocation, users]);

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
      <section className="UsersListSearch">
        <p>Szukaj pracownika po:</p>
        <div className="UsersListSearch__content">
          <div className="UsersListSearch__inputs-wrapper form-label-group">
            <input
              id="search-name"
              type="text"
              className="UsersListSearch__input form-control"
              placeholder="Imię Nazwisko"
              onChange={ filterByName }
            />
            <label htmlFor="search-name">Imię Nazwisko</label>
          </div>
          <div className="UsersListSearch__inputs-wrapper form-label-group">
            <input
              id="search-department"
              type="text"
              className="UsersListSearch__input form-control"
              placeholder="Dział"
              onChange={ filterByDepartment }
            />
            <label htmlFor="search-department">Dział</label>
          </div>
          <div className="UsersListSearch__inputs-wrapper form-label-group">
            <input
              id="search-position"
              type="text"
              className="UsersListSearch__input form-control"
              placeholder="Stanowisko"
              onChange={ filterByPosition }
            />
            <label htmlFor="search-position">Stanowisko</label>
          </div>
          <div className="UsersListSearch__inputs-wrapper form-label-group">
            <input
              id="search-location"
              type="text"
              className="UsersListSearch__input form-control"
              placeholder="Lokalizacja"
              list="location"
              onChange={ filterByLocation }
            />
            <label htmlFor="search-location">Lokalizacja</label>
            <datalist id="location">{ dataOptions }</datalist>
          </div>
        </div>
      </section>
    );
}

export default UserListSearch;

