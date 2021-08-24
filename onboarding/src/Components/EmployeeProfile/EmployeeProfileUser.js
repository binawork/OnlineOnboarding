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
        <div className="EmployeeProfileUser UserListRow">
            <div className="UserListRow__employee-info">
                <div className="UserListRow__column col">
                    <div className="UserListRow__avatar-box">
                        <a className="user-avatar user-avatar-xl" onClick={ goBackToMainProfilePage } style={{ cursor: "pointer" }}>
                            <img className="UserListRow__avatar" src={ avatar } alt="avatar" />
                        </a>
                    </div>
                    <div className="UserListRow__personal-box">
                        <h3 className="UserListRow__header">
                            <a onClick={ goBackToMainProfilePage } style={{ cursor: "pointer" }}>
                                { `${user.first_name} ${user.last_name}` }
                            </a>
                        </h3>
                        { user.position && user.position !== "-" && (
                            <p className="card-subtitle">
                                { user.position }
                            </p>
                        )}
                        <small className="">{ user.email }</small>
                        { user.tel &&  <small className="">{ user.tel }</small> }
                    </div>
                </div>

                <div className="UserListRow__column EmployeeProfileUser__column col">
                    <div className="col">
                        <p className="UserListRow__data">
                            Dział:
                            { user.department
                                ? <b> { user.department }</b>
                                : <i> brak</i>
                            }
                        </p>
                        <p className="UserListRow__data UserListRow__data--margin">
                            Lokalizacja:
                            { user.location
                                ? <b> { user.location }</b>
                                : <i> brak</i>
                            }
                        </p>
                    </div>

                    <div className="col">
                        <p className="UserListRow__data text-nowrap">
                            Wysłane katalogi:
                            <b> { sent }</b>
                        </p>
                        <p className="UserListRow__data text-nowrap">
                            Skończone katalogi: 
                            <b> { finished }</b>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeProfileUser;

