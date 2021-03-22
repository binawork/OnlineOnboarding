import React from "react";
import { Link } from "react-router-dom";

const Employee = ({ employee }) => {
  let avatar = "/onboarding/static/images/unknown-profile.jpg";
  if(employee.avatar && employee.avatar.length > 1)
    avatar = employee.avatar;

  let percentage = "", progress;
  if(employee.progress)
    progress = employee.progress;
  else if(employee.sent)
    progress = "0 / " + employee.sent;
  else
    progress = "0 / 0";

  if(employee.hasOwnProperty("percentage") )// using  employee.percentage  would be false when employee.percentage = 0;
    percentage = "(" + employee.percentage + "%)";

    return (
    <div className="card mb-2">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-auto">
            <Link to={{ pathname: `/employee/${employee.id}`, state: {user: employee } }} className="user-avatar user-avatar-lg">
              <img src={ avatar } alt="avatar" />
            {/* <Link to={{ pathname: "/employee_profile", state: {user: employee, loggedUser: loggedUserCp } }} className="user-avatar user-avatar-lg"> */}
            </Link>
          </div>
          <div className="col">
            <h3 className="card-title mb-1">
              <Link to={{ pathname: `/employee/${employee.id}`, state: {user: employee } }}>{`${employee.first_name} ${employee.last_name}`}</Link>{" "}
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
            <span className="text-muted">Postęp wdrożenia:</span> { progress } { percentage }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
