import React from "react";

const EmployeeAnswerRow = ({ id, data, type }) => {
  return (
    <tr>
      <td className="d-flex justify-content-between align-items-center pr-0">
        <div className="w-100">
          <div
            className={`custom-control custom-control-inline custom-${
              type === "osa" ? "radio" : "checkbox"
            }`}
          >
            <input
              className={"custom-control-input"}
              id={id}
              name={""}
              type={type === "osa" ? "radio" : "checkbox"}
            />
            <label className="custom-control-label" htmlFor={id}>
              {data.title}
            </label>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default EmployeeAnswerRow;
