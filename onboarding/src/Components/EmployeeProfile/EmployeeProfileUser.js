import React from "react";


function EmployeeProfileUser(props) {
    let avatar = "/onboarding/static/images/unknown-profile.jpg";
    if(props.user.avatar && props.user.avatar.length > 1)
        avatar = props.user.avatar;

    return(
        <div className="card card-fluid">
            <div className="card-header"> Status procesu </div>
            <div className="card-body">
                <div className="card m-0">
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-auto">
                                <p className="user-avatar user-avatar-xl"><img src={ avatar } alt="avatar" /></p>
                            </div>

                            <div className="col">
                                <h3 className="card-title mb-1">
                                    { props.user.name }
                                </h3>
                                <p className="mb-1">{ props.user.email }</p>
                                <p className="mb-0">{ props.user.tel }</p>
                            </div>

                            <div className="col">
                                <h3 className="card-title">
                                    <small className="text-muted">Dział:</small> { props.user.department }
                                </h3>
                                <h3 className="card-title">
                                    <small className="text-muted">Lokalizacja:</small> { props.user.location }
                                </h3>
                                <h3 className="card-title m-0">
                                    <small className="text-muted">Stanowisko:</small> { props.user.position }
                                </h3>
                            </div>

                            <div className="col-auto">
                                <h3 className="card-title">
                                    <small className="text-muted">Wysłane formularze:</small> { props.user.sent }
                                </h3>
                                <h3 className="card-title">
                                    <small className="text-muted">Skończone formularze:</small> { props.user.finished }
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeProfileUser;

