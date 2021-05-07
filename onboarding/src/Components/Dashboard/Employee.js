import React from "react";
import { Link } from "react-router-dom";

const Employee = ({ employee }) => {
  let avatar = "/onboarding/static/images/unknown-profile.jpg";
  if(employee.avatar && employee.avatar.length > 1)
    avatar = employee.avatar;

  let /*percentage = "",*/ progress;
  if(employee.progress)
    progress = employee.progress;
  else if(employee.sent)
    progress = "0 / " + employee.sent;
  else
    progress = "0 / 0";

  //if(employee.hasOwnProperty("percentage") )/ / using  employee.percentage  would be false when employee.percentage = 0;
  //  percentage = "(" + employee.percentage + "%  formularzy)";

    return (
    <div className="card mb-2">
      <div className="Employee__card card-body">
        <div className="Employee d-flex">
          <div className="Employee__personal d-flex">
            <div className="Employee__avatar-wrapper">
              <Link to={{ pathname: `/employee/${employee.id}`, state: {user: employee } }} className="user-avatar user-avatar-lg">
                <img src={ avatar } alt="avatar" />
              </Link>
            </div>
            <div className="Employee__personal-data d-flex flex-column">
              <h3 className="Employee__personal-element card-title mb-1">
                <Link to={{ pathname: `/employee/${employee.id}`, state: {user: employee } }}>{`${employee.first_name} ${employee.last_name}`}</Link>{" "}
              </h3>
              <small className="Employee__personal-element">
                {employee.email}
              </small>
              <small className="Employee__personal-element">
                {employee.phone_number}
              </small>
            </div>
          </div>
          <div className="Employee__labour-box d-flex">
            <div className="Employee__labour d-flex">
              <div className="Employee__labour-data">
                <p className="mb-0">
                  <span className="text-muted">Dział:</span> {employee.team || <span className="text-muted"><i>brak</i></span>}
                </p>
              </div>
              <div className="Employee__labour-data">
                <p className="mb-0">
                <span className="text-muted">Stanowisko:</span> {employee.job_position || <span className="text-muted"><i>brak</i></span>}
                </p>
              </div>
              <div className="Employee__labour-data">
                <p className="mb-0">
                <span className="text-muted">Lokalizacja:</span> {employee.location || <span className="text-muted"><i>brak</i></span>}
                </p>
              </div>
            </div>
            <div className="Employee__progress">
              <span className="text-muted text-nowrap mr-1">Postęp wdrożenia:</span>
              <span className="text-nowrap">{ progress }</span>  {/* percentage */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
