import React from "react";
import { Link } from "react-router-dom";
import ProgressBar from "../ProgressBar";
import "../../static/css/UsersList.scss";

const Employee = ({ employee }) => {
  let avatar = "/onboarding/static/images/unknown-profile.jpg";
  if (employee.avatar && employee.avatar.length > 1)
    avatar = employee.avatar;

  let percentage = employee.percentage || "";
  let progress;
  if (employee.progress)
    progress = employee.progress;
  else if (employee.sent)
    progress = "0 / " + employee.sent;
  else
    progress = "0 / 0";

  //if(employee.hasOwnProperty("percentage") )/ / using  employee.percentage  would be false when employee.percentage = 0;
  //  percentage = "(" + employee.percentage + "%  formularzy)";

  return (
    <div className="EmployeeProfileUser UserListRow">
      <div className="UserListRow__employee-info">
        <div className="UserListRow__column">
          <div className="UserListRow__avatar-box">
            <Link to={{ pathname: `/employee/${employee.id}`, state: { user: employee } }} className="user-avatar user-avatar-xl">
              <img className="UserListRow__avatar" src={avatar} alt="avatar" />
            </Link>
          </div>
          <div className="UserListRow__personal-box">
            <h3 className="UserListRow__header">
              <Link className="Employee__personal-link" to={{ pathname: `/employee/${employee.id}`, state: { user: employee } }}>
                {`${employee.first_name} ${employee.last_name}`}
              </Link>
            </h3>
            <p className="UserListRow__data">
              Stanowisko:
              {employee.job_position
                ? <b> {employee.job_position}</b>
                : <i> brak</i>
              }
            </p>
            <div className="UserListRow__data-wrapper">
              <div className="">
                <p className="UserListRow__data">
                  Dział:
                  {employee.team
                    ? <b> {employee.team}</b>
                    : <i> brak</i>
                  }
                </p>
                <p className="UserListRow__data">
                  Lokalizacja:
                  {employee.location
                    ? <b> {employee.location}</b>
                    : <i> brak</i>
                  }
                </p>
              </div>
              <div className="">
                <p className="UserListRow__data">
                  e-mail:
                  {employee.email
                    ? <b> {employee.email}</b>
                    : <i> brak</i>
                  }
                </p>
                <p className="UserListRow__data">
                  tel.:
                  {employee.phone_number
                    ? <b> {employee.phone_number}</b>
                    : <i> brak</i>
                  }
                </p>
              </div>
            </div>
            <div className="UserListRow__progress">
              <ProgressBar color="blue" backgroundSize={percentage ? `${percentage}%` : "0%"} />
              <p className="UserListRow__data text-nowrap m-0">
                {progress}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
