import React from "react";
import PropTypes from "prop-types";

const EmployeeAnswerRow = ({ id, data, type, name, toggleChecked }) => {
  return (
    <tr>
      <td className="d-flex justify-content-between align-items-center pr-0">
        <div className="w-100">
          <div
            className={`w-100 custom-control custom-control-inline custom-${
              type === "osa" ? "radio" : "checkbox"
            }`}
          >
            <input
              className={"custom-control-input"}
              id={id}
              name={name}
              type={type === "osa" ? "radio" : "checkbox"}
              value={data.title}
              checked={data.is_checked}
              onChange={toggleChecked}
              required={type === "osa" ? true : false}
            />
            <label className="custom-control-label w-100" style={{cursor: "pointer"}} htmlFor={id}>
              {data.title}
            </label>
          </div>
        </div>
      </td>
    </tr>
  );
};

EmployeeAnswerRow.propTypes = {
  id: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  toggleChecked: PropTypes.func,
};

export default EmployeeAnswerRow;
