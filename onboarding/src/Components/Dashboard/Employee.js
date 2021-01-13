import React from "react";
import { Link } from "react-router-dom";
import LoggedUser from "../hooks/LoggedUser.js";


const Employee = ({ employee, loggedUser }) => {
  let avatar = "/onboarding/static/images/unknown-profile.jpg", loggedUserCp;
  if(employee.avatar && employee.avatar.length > 1)
    avatar = employee.avatar;

  if(loggedUser){
    loggedUserCp = loggedUser;
  } else
    loggedUserCp = LoggedUser();

  return (
    <div className="card mb-2">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-auto">
            <Link to={{ pathname: "/employee_profile", state: {user: employee, loggedUser: loggedUserCp } }} className="user-avatar user-avatar-lg">
              <img src={ avatar } alt="avatar" />{" "}
              <span className="avatar-badge idle" title="idle"></span>
            </Link>
          </div>
          <div className="col">
            <h3 className="card-title mb-1">
              <Link to={{ pathname: "/employee_profile", state: {user: employee, loggedUser: loggedUserCp } }}>{`${employee.first_name} ${employee.last_name}`}</Link>{" "}
            </h3>
            <small className="">
              {employee.email}
            </small>
            <br />
            <small className="">
              {employee.phone_number}
            </small>
          </div>
          <div className="col">
            <p className="mb-0">
              <span className="text-muted">Dział:</span> {employee.team || <span className="text-muted"><i>brak</i></span>}
            </p>
          </div>
          <div className="col">
            <p className="mb-0">
            <span className="text-muted">Stanowisko:</span> {employee.job_position || <span className="text-muted"><i>brak</i></span>}
            </p>
          </div>
          <div className="col">
            <p className="mb-0">
            <span className="text-muted">Lokalizacja:</span> {employee.location || <span className="text-muted"><i>brak</i></span>}
            </p>
          </div>
          <div className="col">
            <p className="m-0">
            <span className="text-muted">Postęp wdrożenia:</span> 0 / {employee.sent || "0"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
