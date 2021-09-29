import React from "react";
import { Link } from 'react-router-dom';
import ProgressBar from "../ProgressBar";

function AddUserTableRow(props) {
    const defaultAvatar = "/onboarding/static/images/unknown-profile.jpg";
    const percentage = (parseInt(props.row.finished) / props.row.sent * 100).toString();

    return (
        <div className="UserListRow">
            <div className="UserListRow__employee-info">
                <div className="UserListRow__column">
                    <div className="UserListRow__avatar-box">
                        <Link to={{ pathname: `/employee/${props.row.id}`, state: { user: props.row } }} className="user-avatar user-avatar-xl">
                            <img className="UserListRow__avatar" src={props.row.avatar || defaultAvatar} alt="avatar" />
                        </Link>
                    </div>

                    <div className="UserListRow__personal-box">
                        <h3 className="UserListRow__header">
                            <Link to={{ pathname: `/employee/${props.row.id}`, state: { user: props.row } }}>
                                {props.row.name}
                            </Link>
                        </h3>
                        <p className="UserListRow__data">
                            Stanowisko:
                            {props.row.position
                                ? <b> {props.row.position}</b>
                                : <i> brak</i>
                            }
                        </p>
                        <div className="UserListRow__data-wrapper">
                            <div className="">
                                <p className="UserListRow__data">
                                    Dział:
                                    {props.row.department
                                        ? <b> {props.row.department}</b>
                                        : <i> brak</i>
                                    }
                                </p>
                                <p className="UserListRow__data">
                                    Lokalizacja:
                                    {props.row.location
                                        ? <b> {props.row.location}</b>
                                        : <i> brak</i>
                                    }
                                </p>
                            </div>
                            <div className="">
                                <p className="UserListRow__data">
                                    e-mail:
                                    {props.row.email
                                        ? <b> {props.row.email}</b>
                                        : <i> brak</i>
                                    }
                                </p>
                                <p className="UserListRow__data">
                                    tel.:
                                    {props.row.tel
                                        ? <b> {props.row.tel}</b>
                                        : <i> brak</i>
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="UserListRow__progress">
                            <ProgressBar color="blue" backgroundSize={`${isNaN(percentage) ? 0 : percentage}%`} />
                            <p className="UserListRow__data text-nowrap m-0">
                                {props.row.finished || "0"}/{props.row.sent || "0"}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="UserListRow__buttons">
                    <button
                        type="button"
                        value={props.row.id}
                        onClick={props.handleSendPackage}
                        className="UserListRow__button btn"
                    >
                        Wyślij
                    </button>
                </div>
            </div>
        </div>
    )
}
export default AddUserTableRow;

