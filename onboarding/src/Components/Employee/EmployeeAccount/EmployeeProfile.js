import React, { useEffect, useState } from "react";
import { validEmail } from "../../utils";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../../../static/css/EmployeeProfile.scss";

function EmployeeProfile(props) {
    const [user, setUser] = useState({
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        team: "-",
        location: "-",
        job_position: "-"
    });

    useEffect(() => {
        setUser(props.loggedUser);
    },[props.loggedUser]);

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

    return (
        <form className="UserAccount__form">
            <div className="form-label-group mb-2">
                <input
                    id="first-name"
                    type="text"
                    className="UserAccount__input form-control"
                    placeholder="Imię"
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
            <hr />
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
                    value={ user.phone_number }
                    onChange={ handleTel }
                    maxLength="15" />
                <label htmlFor="telephone">Telefon</label>
            </div>
            <div className="form-group mt-3">
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
            <div className="UserAccount__button-wrapper input-group-append justify-content-center">
                <div className="Employee-Profile__buttons input-group-append justify-content-end">
                    <div className="UserAccount__button-background d-flex justify-content-center">
                        <button
                            className="UserAccount__button Employee-Profile__button--save btn mr-2 text-nowrap"
                            onClick={ handleSave }
                            disabled={ validEmail(user.email) ? false : true }
                        >
                            Zapisz zmiany
                        </button>
                    </div>
                    <div className="UserAccount__button-background d-flex justify-content-center">
                        <Link to="/" className="UserAccount__button btn">
                            Wdrożenia
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
}

EmployeeProfile.propTypes = {
    loggedUser: PropTypes.object.isRequired,
    handleEdit: PropTypes.func.isRequired,
    showMessage: PropTypes.func,
};

export default EmployeeProfile;

