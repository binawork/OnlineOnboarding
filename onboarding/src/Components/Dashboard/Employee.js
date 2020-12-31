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
              <img src={ avatar } alt="avatar" />
            </Link>
          </div>
          <div className="col">
            <h3 className="card-title">
              <Link to={{ pathname: "/employee_profile", state: {user: employee, loggedUser: loggedUserCp } }}>{`${employee.first_name} ${employee.last_name}`}</Link>{" "}
            </h3>
            <h6 className="card-subtitle text-muted">
              {employee.job_position}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
