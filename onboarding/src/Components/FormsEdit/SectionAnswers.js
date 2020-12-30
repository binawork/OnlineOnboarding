import React from "react";
import uuid from "uuid";
import AnswerRow from "./AnswerRow";

function SectionAnswers({ inputAnswer, editAnswer, removeAnswer, sectionId, answers, setAnswers, name, type }) {
  const addAnswer = (e) => {
    e.preventDefault();
    const answerToAdd = {
      id: uuid.v4(),
      section: sectionId,
      data: {title: "Odpowiedź", is_checked: false},
    };
    setAnswers([...answers, answerToAdd]);
    inputAnswer(sectionId);
  };

  const answersList = answers
    .filter((answer) => answer.section === sectionId)
    .map((answer, i) => {
      try {
        if (type === "osa" || type === "msa") {
          return (
            <AnswerRow
              key={answer.id}
              index={ i }
              sectionId={ sectionId }
              changeAnswer={ editAnswer }
              removeAnswer={ removeAnswer }
              answerId={answer.id}
              name={name}
              text={answer.data.title || ""}
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
      <div className="input-group-append">
        <button className="btn btn-secondary" onClick={addAnswer}>
          Dodaj odpowiedź
        </button>
      </div>
    </>
  );
}

export default SectionAnswers;
