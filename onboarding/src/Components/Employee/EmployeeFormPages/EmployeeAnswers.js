import React from "react";
import EmployeeAnswerRow from "./EmployeeAnswerRow";
import OpenAnswer from "./OpenAnswer";
import PropTypes from "prop-types";

const EmployeeAnswers = ({
  sectionAnswers,
  type,
  name,
  toggleChecked,
  changeOpenAnswerText,
}) => {
  return (
    <table className="table table-hover">
      <tbody>
        {sectionAnswers.map((answer) =>
          type === "osa" || type === "msa" ? (
            <EmployeeAnswerRow
              key={answer.id}
              id={answer.id}
              data={answer.title || {}}
              type={type}
              name={name}
              toggleChecked={toggleChecked}
            />
          ) : (
            <></>
          )
        )}
      </tbody>
    </table>
  );
};

EmployeeAnswers.propTypes = {
  sectionAnswers: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  toggleChecked: PropTypes.func,
  changeOpenAnswerText: PropTypes.func,
};

export default EmployeeAnswers;
