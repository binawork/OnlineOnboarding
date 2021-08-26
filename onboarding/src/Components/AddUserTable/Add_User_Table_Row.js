import React from "react";
import { Link } from 'react-router-dom';

function AddUserTableRow(props) {
    const defaultAvatar = "/onboarding/static/images/unknown-profile.jpg";

    return(
        <div className="UserListRow">
            <div className="UserListRow__employee-info">
                <div className="UserListRow__column col">
                    <div className="UserListRow__avatar-box">
                        <Link to={{ pathname: `/employee/${props.row.id}`, state: { user: props.row } }} className="user-avatar user-avatar-xl">
                            <img className="UserListRow__avatar" src={ props.row.avatar || defaultAvatar } alt="avatar" />
                        </Link>
                    </div>

                    <div className="UserListRow__personal-box">
                        <h3 className="UserListRow__header">
                            <Link to={{ pathname: `/employee/${props.row.id}`, state: { user: props.row } }}>
                                { props.row.name }
                            </Link>
                        </h3>
                        { props.row.position &&
                            props.row.position !== "-" &&
                            <p className="card-subtitle">
                                { props.row.position }
                            </p>
                        }
                        <small className="">
                            { props.row.email }
                        </small>
                        { props.row.tel && (
                            <small className="">
                                { props.row.tel }
                            </small>
                        )}
                    </div>
                </div>

                <div className="UserListRow__column col">
                    <div className="col">
                        <p className="UserListRow__data">
                            Dział:
                            { props.row.department
                                ? <b> { props.row.department }</b>
                                : <i> brak</i>
                            }
                        </p>
                        <p className="UserListRow__data UserListRow__data--margin">
                            Lokalizacja:
                            { props.row.location
                                ? <b> { props.row.location }</b>
                                : <i> brak</i>
                            }
                        </p>
                    </div>

                    <div className="col">
                        <p className="UserListRow__data text-nowrap">
                            Wysłane:
                            { props.row.sent
                                ? <b> { props.row.sent }</b>
                                : <b> 0</b>
                            }
                        </p>
                        <p className="UserListRow__data text-nowrap">
                            Skończone: 
                            { props.row.finished
                                ? <b> { props.row.finished }</b>
                                : <b> 0</b>
                            }
                        </p>
                    </div>
                </div>
            </div>

            <div className="UserListRow__buttons">
                <button 
                    type="button"
                    value={ props.row.id }
                    onClick={ props.handleSendPackage }
                    className="UserListRow__button btn"
                >
                    Wyślij
                </button>
            </div>
        </div>
    )
}
export default AddUserTableRow;

