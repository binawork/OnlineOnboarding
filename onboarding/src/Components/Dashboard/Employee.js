import React from "react";
import { Link } from "react-router-dom";
import ProgressBar from "../ProgressBar";

const Employee = ({ employee }) => {
  let avatar = "/onboarding/static/images/unknown-profile.jpg";
  if(employee.avatar && employee.avatar.length > 1)
    avatar = employee.avatar;

  let percentage = employee.percentage || "";
  let progress;
  if(employee.progress)
    progress = employee.progress;
  else if(employee.sent)
    progress = "0 / " + employee.sent;
  else
    progress = "0 / 0";

    //if(employee.hasOwnProperty("percentage") )/ / using  employee.percentage  would be false when employee.percentage = 0;
  //  percentage = "(" + employee.percentage + "%  formularzy)";

    return (
      <div className="Employee">
          <div className="Employee__personal">
            <div className="Employee__avatar-wrapper">
              <Link to={{ pathname: `/employee/${employee.id}`, state: {user: employee } }} className="">
                <img className="Employee__avatar" src={ avatar } alt="avatar" />
              </Link>
            </div>
            <div className="Employee__personal-data">
              <h3 className="Employee__personal-header">
                <Link className="Employee__personal-link" to={{ pathname: `/employee/${employee.id}`, state: {user: employee } }}>{`${employee.first_name} ${employee.last_name}`}</Link>{" "}
              </h3>
              <small className="Employee__personal-element Employee__personal-element--break">
                {employee.email}
              </small>
              <small className="Employee__personal-element">
                {employee.phone_number}
              </small>
            </div>
          </div>
          <div className="Employee__labour-box">
            <div className="Employee__labour">
              <div className="Employee__labour-data">
                <p className="m-0">
                  <span className="text-muted">Dział:</span> {employee.team || <span className="text-muted"><i>brak</i></span>}
                </p>
              </div>
              <div className="Employee__labour-data">
                <p className="m-0">
                  <span className="text-muted">Stanowisko:</span> {employee.job_position || <span className="text-muted"><i>brak</i></span>}
                </p>
              </div>
              <div className="Employee__labour-data">
                <p className="m-0">
                  <span className="text-muted">Lokalizacja:</span> {employee.location || <span className="text-muted"><i>brak</i></span>}
                </p>
              </div>
            </div>
            <div className="Employee__progress">
              <span className="Employee__progress-text">Postępy:</span>
              <ProgressBar color="blue" backgroundSize={ percentage ? `${percentage}%` : "0%" } />
              <span className="text-nowrap">{ progress }</span>
            </div>
          </div>
      </div>
  );
};

export default Employee;
