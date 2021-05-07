import React from "react";
import { validateURL } from "../utils";
import "../../static/css/EmployeeProfile.scss";

function EmployeeProfileUser({ user, goBackToMainProfilePage, sentAndFinished }) {
    let avatar = "/onboarding/static/images/unknown-profile.jpg";
    if(user.avatar && user.avatar.length > 1) {
        user.avatar = validateURL(user.avatar, "/onboarding/static/images/unknown-profile.jpg");
        avatar = user.avatar;
    }

    let sent = sentAndFinished.sent, finished = sentAndFinished.finished;
    if(sent < 0)
        sent = user.sent;
    if(finished < 0)
        finished = user.finished ? user.finished : "0";


    return(
        <div className="card card-fluid">
            <div className="card-header"> Status procesu </div>
                <div className="EmployeeProfileUser d-flex card-body">
                    <div className="EmployeeProfileUser__data EmployeeProfileUser__data--fit d-flex">
                        <div className="EmployeeProfileUser__data-avatar">
                            <a className="user-avatar user-avatar-xl" onClick={ goBackToMainProfilePage } style={{ cursor: "pointer" }}><img src={ avatar } alt="avatar" /></a>
                        </div>
                        <div className="EmployeeProfileUser__data-personal">
                            <h3 className="card-title mb-1">
                                <a onClick={ goBackToMainProfilePage } style={{ cursor: "pointer" }}>
                                    { `${user.first_name} ${user.last_name}` }
                                </a>
                            </h3>
                            <p className="mb-1">{ user.email }</p>
                            <p className="mb-0">{ user.tel }</p>
                        </div>
                    </div>

                    <div className="EmployeeProfileUser__data d-flex">
                        <div className="EmployeeProfileUser__data-labour">
                            <h3 className="card-title">
                                <small className="text-muted">Dział: </small>
                                { user.department 
                                    ? user.department 
                                    : <small className="text-muted"><i>brak</i></small> 
                                }
                            </h3>
                            <h3 className="card-title">
                                <small className="text-muted">Lokalizacja: </small> 
                                { user.location 
                                    ? user.location 
                                    : <small className="text-muted"><i>brak</i></small> 
                                }
                            </h3>
                            <h3 className="card-title">
                                <small className="text-muted">Stanowisko: </small> 
                                { user.position 
                                    ? user.position 
                                    : <small className="text-muted"><i>brak</i></small> 
                                }
                            </h3>
                        </div>

                        <div className="EmployeeProfileUser__data-progress">
                            <h3 className="card-title text-nowrap">
                                <small className="text-muted">Wysłane katalogi:</small> { sent }
                            </h3>
                            <h3 className="card-title text-nowrap m-0">
                                <small className="text-muted">Skończone katalogi: </small>
                                { finished }
                            </h3>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default EmployeeProfileUser;

