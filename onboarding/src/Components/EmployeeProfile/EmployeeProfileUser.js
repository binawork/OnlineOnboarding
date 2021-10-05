import React from "react";
import { validateURL } from "../utils";
import "../../static/css/EmployeeProfile.scss";
import ProgressBar from "../ProgressBar";

function EmployeeProfileUser({ user, goBackToMainProfilePage, sentAndFinished }) {
    let avatar = "/onboarding/static/images/unknown-profile.jpg";
    if(user.avatar && user.avatar.length > 1) {
        user.avatar = validateURL(user.avatar, "/onboarding/static/images/unknown-profile.jpg");
        avatar = user.avatar;
    }
    
    let sent = sentAndFinished.sent, finished = sentAndFinished.finished;
    let percentage = "0";
    if(sent < 0)
        sent = user.sent;
    if(finished < 0)
        finished = user.finished ? user.finished : 0;
    if(sent != 0)
        percentage = (parseInt(finished) / sent * 100).toString();

    return(
        <div className="EmployeeProfileUser UserListRow">
            <div className="UserListRow__employee-info">
                <div className="UserListRow__column">
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
                        <p className="UserListRow__data">
                            Stanowisko:
                            { user.position
                                ? <b> { user.position }</b>
                                : <i> brak</i>
                            }
                        </p>
                        <div className="UserListRow__data-wrapper">
                            <div className="">
                                <p className="UserListRow__data">
                                    Dział:
                                    { user.department
                                        ? <b> { user.department }</b>
                                        : <i> brak</i>
                                    }
                                </p>
                                <p className="UserListRow__data">
                                    Lokalizacja:
                                    { user.location
                                        ? <b> { user.location }</b>
                                        : <i> brak</i>
                                    }
                                </p>
                            </div>
                            <div className="">
                                <p className="UserListRow__data">
                                    e-mail:
                                    { user.email
                                        ? <b> { user.email }</b>
                                        : <i> brak</i>
                                    }
                                </p>
                                <p className="UserListRow__data">
                                    tel.:
                                    { user.tel
                                        ? <b> { user.tel }</b>
                                        : <i> brak</i>
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="UserListRow__progress">
                            <ProgressBar color="blue" backgroundSize={ `${percentage}%` } />
                            <p className="UserListRow__data text-nowrap m-0">
                                { finished }/{ sent }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeProfileUser;

