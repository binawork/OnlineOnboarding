import React from "react";
import { Link } from 'react-router-dom';

function UserListRow(props) {
    return(
        <div className="card mb-2">
            <div className="card-body">
                <div className="row align-items-center">

                    <div className="col-auto">
                        <Link to="/employee_profile" className="user-avatar user-avatar-xl"><img src="/onboarding/static/images/unknown-profile.jpg" alt="" /> <span className="avatar-badge idle" title="idle"></span></Link>
                    </div>

                    <div className="col">
                        <h3 className="card-title">
                            <Link to="/employee_profile">{ props.user.name }</Link> <small className="text-muted"><a href="#">{ props.user.email }</a></small>
                        </h3>
                        <h6 className="card-subtitle text-muted"> { props.user.position } </h6>
                    </div>

                    <div className="col">
                        <h3 className="card-title">
                            <small className="text-muted">Dział:</small> { props.user.department }
                        </h3>
                        <h3 className="card-title">
                            <small className="text-muted">Lokalizacja:</small> { props.user.localization }
                        </h3>
                    </div>

                    <div className="col-auto">
                        <h3 className="card-title">
                            <small className="text-muted">Wysłane formularze:</small> { props.user.sent }
                        </h3>
                        <h3 className="card-title">
                            <small className="text-muted">Skończone formularze:</small> { props.user.finished }
                        </h3>
                        <Link to={{ pathname: "/add_user", state: { user: props.user } }} className="btn btn-secondary" data-toggle="tooltip">Edytuj profil</Link>
                        <Link to={{ pathname: "/employee_profile", state: { user: props.user } }} className="btn btn-secondary" data-toggle="tooltip">Dodaj "formularz"</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserListRow;
