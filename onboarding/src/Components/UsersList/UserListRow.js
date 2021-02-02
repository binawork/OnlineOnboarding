import React from "react";
import { Link } from 'react-router-dom';

function UserListRow(props) {
    let avatar = "/onboarding/static/images/unknown-profile.jpg";

    if(props.user.avatar && props.user.avatar.length > 1)
        avatar = props.user.avatar;

    let loggedUser = {};
    if(props.loggedUser)
        loggedUser = props.loggedUser;

    return(
        <div className="card mb-2">
            <div className="card-body">
                <div className="row align-items-center">

                    <div className="col-auto">
                        <Link to={{ pathname: "/employee_profile", state: { user: props.user, loggedUser: loggedUser } }} className="user-avatar user-avatar-xl">
                            <img src={ avatar } alt="avatar" />
                        </Link>
                    </div>

                    <div className="col">
                        <h3 className="card-title">
                            <Link to={{ pathname: "/employee_profile", state: { user: props.user, loggedUser: loggedUser } }}>
                                { props.user.name }
                            </Link>
                        </h3>
                        <p className="card-subtitle text-muted"> { props.user.position } </p>
                        <small className="text-muted">
                            <Link to={{ pathname: "/employee_profile", state: { user: props.user, loggedUser: loggedUser } }}>
                                { props.user.email }
                            </Link>
                        </small>
                    </div>

                    <div className="col">
                        <p className="card-title mb-2">
                            <small className="text-muted">Dział:</small> { props.user.department }
                        </p>
                        <p className="card-title mb-0">
                            <small className="text-muted">Lokalizacja:</small> { props.user.location }
                        </p>
                    </div>

                    <div className="col">
                        <p className="card-title mb-2">
                            <small className="text-muted">Wysłane formularze:</small> { props.user.sent }
                        </p>
                        <p className="card-title mb-0">
                            <small className="text-muted">Skończone formularze:</small> { props.user.finished }
                        </p>

                    </div>
                    <div className="col-auto d-flex flex-column">
                        <Link to={{ pathname: "/employee_profile", state: { user: props.user, packageId: props.packageId, loggedUser: loggedUser } }}
                            className="btn btn-secondary mb-1" 
                            data-toggle="tooltip"
                        >
                            Dodaj formularz
                        </Link>
                        <div>
                            <Link to={{ pathname: "/add_user", state: { user: props.user, packageId: props.packageId, loggedUser: loggedUser } }}
                                className="btn btn-secondary mr-1" 
                                data-toggle="tooltip"
                            >
                                Edytuj profil
                            </Link>
                            { props.user.id != loggedUser.id &&
                                <button type="button" value={ props.user.id } onClick={ props.handleRemove } className="btn btn-warning" data-toggle="tooltip">Usuń</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserListRow;

