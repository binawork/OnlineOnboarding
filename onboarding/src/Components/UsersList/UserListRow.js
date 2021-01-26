import React from "react";
import { Link } from 'react-router-dom';

function UserListRow(props) {
    let avatar = "/onboarding/static/images/unknown-profile.jpg";

    if(props.user.avatar && props.user.avatar.length > 1)
        avatar = props.user.avatar;

    return(
        <div className="card mb-2">
            <div className="card-body">
                <div className="row align-items-center">

                    <div className="col-auto">
                        <Link to={{ pathname: `/employee/${props.user.id}`, state: { user: props.user } }} className="user-avatar user-avatar-xl">
                            <img src={ avatar } alt="avatar" />
                        </Link>
                    </div>

                    <div className="col">
                        <h3 className="card-title">
                            <Link to={{ pathname: `/employee/${props.user.id}`, state: { user: props.user } }}>
                                { props.user.name }
                            </Link>
                        </h3>
                        <p className="card-subtitle text-muted">
                            { props.user.email }
                        </p>
                        { props.user.position && 
                            props.user.position !== "-" &&
                            <>
                            <small className="text-muted">
                                { props.user.position }
                            </small>
                            <br />
                            </>
                        }
                        { props.user.tel && (
                            <small className="text-muted">
                                { props.user.tel }
                            </small>
                        )}
                    </div>

                    <div className="col">
                        <p className="card-title mb-2">
                            <small className="text-muted">Dział: </small>
                            { props.user.department
                                ? props.user.department
                                : <small className="text-muted"><i>brak</i></small>
                            }
                        </p>
                        <p className="card-title mb-0">
                            <small className="text-muted">Lokalizacja: </small>
                            { props.user.location
                                ? props.user.location
                                : <small className="text-muted"><i>brak</i></small>
                            }
                        </p>
                    </div>

                    <div className="col">
                        <p className="card-title mb-2">
                            <small className="text-muted">Wysłane katalogi: </small>
                            { props.user.sent
                                ? props.user.sent
                                : <small className="text-muted"><i>brak</i></small>
                            }
                        </p>
                        <p className="card-title mb-0">
                            <small className="text-muted">Skończone katalogi: </small>
                            { props.user.finished
                                ? props.user.finished
                                : <small className="text-muted"><i>brak</i></small>
                            }
                        </p>

                    </div>
                    <div className="col-auto d-flex flex-column">
                        <Link to={{ pathname: `/employee/${props.user.id}`, state: { user: props.user } }}
                            className="btn btn-secondary mb-1" 
                            data-toggle="tooltip"
                        >
                            Dodaj formularz
                        </Link>
                        <div>
                            <Link to={{ pathname: `/edit_employee/${props.user.id}`, state: { user: props.user } }}
                                className="btn btn-secondary mr-1" 
                                data-toggle="tooltip"
                            >
                                Edytuj profil
                            </Link>
                            <button
                                type="button"
                                value={ props.user.id }
                                onClick={ props.handleRemove }
                                className="btn btn-warning"
                                data-toggle="tooltip"
                            >
                                Usuń
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserListRow;

