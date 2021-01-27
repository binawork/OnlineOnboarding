import React, { useState } from "react";
import { validEmail } from "../../utils";

function EmployeeProfile(props) {
    let userCp = {id: 0, first_name: "", last_name: "", email: "", phone_number: "", team: "-", location: "-", job_position: "-"};
    if(props.loggedUser)
        userCp = {...props.loggedUser};
    const [user, setUser] = useState(userCp);

    const handleChangeName = e => {
        setUser({...user, first_name: e.target.value});
    };
    const handleChangeLName = function(e){
        setUser({...user, last_name: e.target.value});
    };

    const handleEmail = function(e){
        setUser({...user, email: e.target.value});
    };

    const handleTel = e => {
        setUser({...user, phone_number: e.target.value});
    };
    const handleSave = (e) => {
        e.preventDefault();
        if(validEmail(user.email) )
            props.handleEdit(user);
        else
            props.showMessage("Format e-mail'a jest nieprawidłowy");
    };

    const handleGoToPackages = (e) => {
        e.preventDefault();
        props.loadFormList();
    }

    return (
      <div className="card-body">
        <form>
            <div className="form-group">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Imie" value={ user.first_name } onChange={ handleChangeName } />
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
                    <input type="tel" className="form-control" placeholder="telefon" value={ user.phone_number } onChange={ handleTel } />
                </div>
            </div>
            <div className="form-group">
                <div>
                    Dział: { user.team /*department*/}
                </div>
            </div>
            <div className="form-group">
                <div>
                    Lokalzacja: { user.location }
                </div>
            </div>
            <div className="form-group">
                <div>
                    Stanowisko: { user.job_position }
                </div>
            </div>
            <div className="form-group">
                <div className="input-group-append">
                    <button className="btn btn-secondary mr-2" onClick={ handleSave }>Zapisz zmiany</button>
                    <button className="btn btn-success" onClick={ handleGoToPackages }>Wdrożenia</button>
                </div>
            </div>
        </form>
      </div>
    );
}

export default EmployeeProfile;

