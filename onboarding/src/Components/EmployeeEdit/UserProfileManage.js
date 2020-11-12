import React, { useState } from "react";
import { validEmail } from "../utils";

//import "../static/looper/stylesheets/theme.min.css";
//import "../static/looper/stylesheets/theme-dark.min.css";


function UserProfileManage(props) {
    let userCp = {id: 0, name: "", last_name: "", email: "", tel: "", department: "", location: "", position: ""};
    if(props.user)
        userCp = {...props.user};
    const [user, setUser] = useState(userCp);

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

    let locations = ["Warszawa", "Łódź", "Poznań", "Gdańsk", "Wrocław"], dataOptions = [];
    dataOptions = locations.map( (city, i) =>
        <option key={ i } value={ city } />
    );


    return (
      <div className="card-body">
        <form>
            <div className="form-group">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Imie" value={ user.name } onChange={ handleChangeName } />
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Nazwisko" value={ user.last_name } onChange={ handleChangeLName } />
                </div>
            </div>
            <hr />
            <div className="form-group">
                <div className="input-group">
                    <input type="email" className="form-control" placeholder="e-mail" value={ user.email } onChange={ handleEmail } />
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <input type="tel" className="form-control" placeholder="telefon" value={ user.tel } onChange={ handleTel } />
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="dział" value={ user.department } />{/* może lista rozwijana/do wyboru */}
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="lokalizacja" value={ user.location } onChange={ handleLocation } list="location" />
                    <datalist id="location">{ dataOptions }</datalist>
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="stanowisko" value={ user.position } />
                </div>
            </div>
            <div className="form-group">
				<div className="input-group-append">
					<button className="btn btn-secondary" onClick={ handleSave }>Dodaj/edytuj</button>
				</div>
			</div>
        </form>
      </div>
    );
}

export default UserProfileManage;

