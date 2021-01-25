import React, { useEffect, useState } from "react";
import { validEmail } from "../utils";

function UserProfileManage(props) {
    const [user, setUser] = useState(props.user);

    useEffect(() => {
        setUser(props.user)
    }, [props.user]);

    const handleChangeName = e => {
        setUser({...user, name: e.target.value});
    };
    const handleChangeLName = function(e){
        setUser({...user, last_name: e.target.value});
    };

    const handleEmail = function(e){
        setUser({...user, email: e.target.value});
    };

    const handleTel = e => {
        setUser({...user, tel: e.target.value});
    };
    const handleLocation = function(e){
        setUser({...user, location: e.target.value});
    };


    const handleSave = function(e){
        e.preventDefault();
        if(validEmail(user.email) )
            props.handleSaveEdit(user);
        else
            props.showMessage("Format e-mail'a jest nieprawidłowy");
    };

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
      <div className="card-body">
        <form>
            <div className="form-group">
                <label htmlFor="first-name" className="m-0">Imię</label>
                <input id="first-name" type="text" className="form-control" placeholder="Imie" value={ user.name } onChange={ handleChangeName } />
            </div>
            <div className="form-group">
                <label htmlFor="last-name" className="m-0">Nazwisko</label>
                <input id="last-name" type="text" className="form-control" placeholder="Nazwisko" value={ user.last_name } onChange={ handleChangeLName } />
            </div>
            <hr />
            <div className="form-group">
                <label htmlFor="email" className="m-0">E-mail</label>
                <input id="email" type="email" className="form-control" placeholder="e-mail" value={ user.email } onChange={ handleEmail } />
            </div>
            <div className="form-group">
                <label htmlFor="telephone" className="m-0">Telefon</label>
                <input id="telephone" type="tel" className="form-control" placeholder="telefon" value={ user.tel } onChange={ handleTel } />
            </div>
            <div className="form-group">
                <label htmlFor="department" className="m-0">Dział</label>
                <input id="department" type="text" className="form-control" placeholder="dział" value={ user.department } />{/* może lista rozwijana/do wyboru */}
            </div>
            <div className="form-group">
                <label htmlFor="location" className="m-0">Lokalizacja</label>
                <input id="location" type="text" className="form-control" placeholder="lokalizacja" value={ user.location } onChange={ handleLocation } list="location" />
                <datalist id="location">{ dataOptions }</datalist>
            </div>
            <div className="form-group">
                <label htmlFor="position" className="m-0">Stanowisko</label>
                <input id="position" type="text" className="form-control" placeholder="stanowisko" value={ user.position } />
            </div>
            <div className="form-group">
				<div className="input-group-append">
					<button className="btn btn-secondary" onClick={ handleSave }>{ props.buttonTitle }</button>
				</div>
			</div>
        </form>
      </div>
    );
}

export default UserProfileManage;

