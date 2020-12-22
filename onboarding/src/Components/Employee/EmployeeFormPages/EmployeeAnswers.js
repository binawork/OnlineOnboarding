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
    <>
      {type === "oa" ? (
        <OpenAnswer
          key={sectionAnswers[0]?.id}
          id={sectionAnswers[0]?.id}
          data={sectionAnswers[0]?.data || {}}
          changeOpenAnswerText={changeOpenAnswerText}
        />
      ) : (
        <table className="table table-hover">
          <tbody>
            {sectionAnswers.map((answer) =>
              type === "osa" || type === "msa" ? (
                <EmployeeAnswerRow
                  key={answer.id}
                  id={answer.id}
                  data={answer.data || {}}
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
      )}
    </>
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
