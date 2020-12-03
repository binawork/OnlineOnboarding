import React from "react";
import EmployeeAnswerRow from "./EmployeeAnswerRow";

const EmployeeAnswers = ({ answers, type }) => {
  const answersList = answers.map((answer) => {
    if (type === "osa" || type === "msa") {
      return (
        <EmployeeAnswerRow
          key={answer.id}
          id={answer.id}
          data={answer.data || {}}
          type={type}
        />
      );
    }
  });
  return (
    <>
      {type === "oa" ? (
        <div className="form-group">
          <textarea
            className="form-control"
            placeholder="Wpisz odpowiedź"
            rows="4"
          ></textarea>
        </div>
      ) : (
        <table className="table table-hover">
          <tbody>{answersList}</tbody>
        </table>
      )}
    </>
  );
};

export default EmployeeAnswers;
