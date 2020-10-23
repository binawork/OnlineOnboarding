import React from "react";
import { Link } from "react-router-dom";

const Employee = ({ employee }) => {
  return (
    <div className="card mb-2">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-auto">
            <Link to="/employee_profile" className="user-avatar user-avatar-lg">
              <img src="/onboarding/static/images/unknown-profile.jpg" alt="" />{" "}
              <span className="avatar-badge idle" title="idle"></span>
            </Link>
          </div>
          <div className="col">
            <h3 className="card-title">
              <Link to="/employee_profile">{`${employee.first_name} ${employee.last_name}`}</Link>{" "}
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
