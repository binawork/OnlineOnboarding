import React, { useEffect, useState } from "react";
import { validEmail } from "../utils";

function UserProfileManage(props) {
    const [user, setUser] = useState({
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        tel: "",
        department: "",
        location: "",
        position: "",
    });
    
    useEffect(() => {
        if(props.user?.email) {
            setUser(props.user);
        }
    }, [props.user]);

    const handleChangeName = function(e){
        setUser({...user, first_name: e.target.value});
    };
    const handleChangeLName = function(e){
        setUser({...user, last_name: e.target.value});
    };

    const handleEmail = function(e){
        setUser({...user, email: e.target.value});
    };

    const handleTel = function(e){
        setUser({...user, tel: e.target.value});
    };
    const handleDepartment = function(e){
        setUser({...user, department: e.target.value});
    };
    const handleLocation = function(e){
        setUser({...user, location: e.target.value});
    };
    const handlePosition = function(e){
        setUser({...user, position: e.target.value});
    };


    const handleSave = function(e){
        e.preventDefault();
        if(validEmail(user.email) )
            props.handleSaveEdit(user);
        else
            props.showMessage("Format e-mail'a jest nieprawidłowy");
        }
        
    let locations = [
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
    ], dataOptions = [];
    dataOptions = locations.map( (city, i) =>
        <option key={ i } value={ city } />
    );

    return (
        <form className="UserAccount__form">
            <div className="form-label-group mb-2">
                <input
                    id="first-name"
                    type="text" 
                    className="UserAccount__input form-control"               placeholder="Imię"
                    value={ user.first_name }
                    onChange={ handleChangeName }
                    maxLength="50" />
                <label htmlFor="first-name">Imię</label>
            </div>
            <div className="form-label-group mb-2">
                <input
                    id="last-name"
                    type="text"
                    className="UserAccount__input form-control"
                    placeholder="Nazwisko"
                    value={ user.last_name }
                    onChange={ handleChangeLName }
                    maxLength="50" />
                <label htmlFor="last-name">Nazwisko</label>
            </div>
            <hr className="UserAccount__line"/>
            <div className="form-label-group mb-2">
                <input
                    id="email"
                    type="email"
                    className="UserAccount__input form-control"
                    placeholder="e-mail"
                    value={ user.email }
                    onChange={ handleEmail }
                    maxLength="50" />
                <label htmlFor="email">E-mail</label>
            </div>
            <div className="form-label-group mb-2">
                <input
                    id="telephone"
                    type="tel"
                    className="UserAccount__input form-control"
                    placeholder="telefon"
                    value={ user.tel }
                    onChange={ handleTel }
                    maxLength="15" />
                <label htmlFor="telephone">Telefon</label>
            </div>
            <div className="form-label-group mb-2">
                <input
                    id="department"
                    type="text"
                    className="UserAccount__input form-control"
                    placeholder="dział"
                    value={ user.department }
                    onChange={ handleDepartment }
                    maxLength="50" />{/* może lista rozwijana/do wyboru */}
                <label htmlFor="department">Dział</label>
            </div>
            <div className="form-label-group mb-2">
                <input
                    id="location"
                    type="text"
                    className="UserAccount__input form-control" placeholder="lokalizacja"
                    value={ user.location }
                    onChange={ handleLocation }
                    list="location-list"
                    maxLength="50" />
                <label htmlFor="location">Lokalizacja</label>
                <datalist id="location-list">{ dataOptions }</datalist>
            </div>
            <div className="form-label-group mb-2">
                <input
                    id="position"
                    type="text"
                    className="UserAccount__input form-control"
                    placeholder="stanowisko"
                    value={ user.position }
                    onChange={ handlePosition }
                    maxLength="50" />
                <label htmlFor="position">Stanowisko</label>
            </div>
            <div className="UserAccount__button-wrapper input-group-append justify-content-center">
				<div className="UserAccount__button-background">
					<button
                        className="UserAccount__button btn"
                        onClick={ handleSave }
                        // disabled={ validEmail(user.email) ? false : true }
                    >
                        { props.buttonTitle }
                    </button>
				</div>
			</div>
        </form>
    );
}

export default UserProfileManage;

