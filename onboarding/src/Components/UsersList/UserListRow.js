import React from "react";
import { Link } from 'react-router-dom';

function UserListRow(props) {
    return(
        <div className="card mb-2">
            <div className="card-body">
                <div className="row align-items-center">

                    <div className="col-auto">
                        <a href="#" className="user-avatar user-avatar-xl"><img src="/onboarding/static/images/unknown-profile.jpg" alt="" /> <span className="avatar-badge idle" title="idle"></span></a>
                    </div>

                    <div className="col">
                        <h3 className="card-title">
                            <Link to="/profile/employee">{ props.user.name }</Link> <small className="text-muted"><a href="#">{ props.user.email }</a></small>
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
                        <Link to="/add_user" className="btn btn-secondary" data-toggle="tooltip" style={{color: '#000'}}>Edytuj profil</Link>
                        <button type="button" className="btn btn-secondary" data-toggle="tooltip" style={{color: '#000'}}>Dodaj "formularz"</button>{/* do listy formularzy */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserListRow;

