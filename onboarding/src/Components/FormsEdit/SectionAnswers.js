import React, { useEffect, useState, useRef } from "react";
import uuid from "uuid";
import AnswerRow from "./AnswerRow";
import FormSectionsAPI from "../hooks/FormSectionsAPI";

function SectionAnswers({ sectionId, answers, setAnswers, name, type }) {
  const addAnswer = (e) => {
    e.preventDefault();
    const answerToAdd = {
      id: uuid.v4(),
      section: sectionId,
      data: "Odpowiedź",
    };
    setAnswers([...answers, answerToAdd]);
  };

  const answersList = answers
    .filter((answer) => answer.section === sectionId)
    .map((answer) => {
      try {
        if (type === "osa" || type === "msa") {
          return (
            <AnswerRow
              key={answer.id}
              answerId={answer.id}
              name={name}
              text={answer.data}
              type={type}
              answers={answers}
              setAnswers={setAnswers}
            />
          );
        } else if (type !== "oa") {
          throw new Error(
            "Wrong type of section. The proper section type is one of: 'oa', 'osa' or 'msa'."
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    });

  return (
    <>
      <table className="table table-hover">
        <tbody>{answersList}</tbody>
      </table>

      <hr />
      <div className="form-group">
        <div className="input-group-append">
          <button className="btn btn-secondary" onClick={addAnswer}>
            Dodaj odpowiedź
          </button>
        </div>
      </div>
    </>
  );
}

export default SectionAnswers;
