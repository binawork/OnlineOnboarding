import React from "react";
import { Link } from "react-router-dom";


function EmployeeProfileUser({ user, goBackToMainProfilePage }) {
    let avatar = "/onboarding/static/images/unknown-profile.jpg";
    if(user.avatar && user.avatar.length > 1)
        avatar = user.avatar;
    // let avatarComponent, nameLink, emailLink;

    // if(typeof props.loggedUser !== 'undefined'){
    //     avatarComponent = <img src={ avatar } alt="avatar" /> ;
        
    //     nameLink = props.user.name;

    //     emailLink = props.user.email;
        // avatarComponent = <Link to={{ pathname: `/employee/${props.user.id}`, state: { packageId: props.packageId, user: props.user } }} className="user-avatar user-avatar-xxl">
        //                      <img src={ avatar } alt="avatar" /> <span className="avatar-badge idle" title="idle"></span>
        //                  </Link>;
        
        // nameLink = <Link to={{ pathname: `/employee/${props.user.id}`, state: { packageId: props.packageId, user: props.user } }}>{ props.user.name }</Link>;

        // emailLink = <Link to={{ pathname: `/employee/${props.user.id}`, state: { packageId: props.packageId, user: props.user } }}>{ props.user.email }</Link>;
    // } else {
    //     avatarComponent = <a href="#" className="user-avatar user-avatar-xl"><img src={ avatar } alt="avatar" /> <span className="avatar-badge idle" title="idle"></span></a>;
    //     nameLink = <a href="#">{ props.user.name }</a>;
    //     emailLink = <a href="#">{ props.user.email }</a>;
    // }


    return(
        <div className="card card-fluid">
            <div className="card-header"> Status procesu </div>
            <div className="card-body">
                <div className="row align-items-center">
                    <div className="col-auto">
                        {/* <Link to={{ pathname: `/employee/${props.user.id}`, state: { packageId: props.packageId, user: props.user } }} className="user-avatar user-avatar-xl"> */}
                            <a className="user-avatar user-avatar-xl" onClick={ goBackToMainProfilePage } style={{ cursor: "pointer" }}><img src={ avatar } alt="avatar" /></a>
                        {/* </Link> */}
                    </div>
                    <div className="col">
                        {/* <Link to={{ pathname: `/employee/${props.user.id}`, state: { packageId: props.packageId, user: props.user } }}> */}
                        <h3 className="card-title mb-1">
                            <a onClick={ goBackToMainProfilePage } style={{ cursor: "pointer" }}>
                                { `${user.first_name} ${user.last_name}` }
                            </a>
                        </h3>
                        {/* </Link> */}
                        
                        <p className="mb-1">{ user.email }</p>
                        <p className="mb-0">{ user.tel }</p>
                    </div>
                    <div className="col">
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
                        <h3 className="card-title m-0">
                            <small className="text-muted">Stanowisko: </small> 
                            { user.position 
                                ? user.position 
                                : <small className="text-muted"><i>brak</i></small> 
                            }
                        </h3>
                    </div>

                    <div className="col-auto">
                        <h3 className="card-title">
                            <small className="text-muted">Wysłane katalogi:</small> { user.sent }
                        </h3>
                        <h3 className="card-title">
                            <small className="text-muted">Skończone katalogi: </small>
                            { user.finished 
                                ? user.department 
                                : "0" 
                            }
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeProfileUser;

