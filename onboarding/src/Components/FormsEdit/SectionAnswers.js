import React from "react";
import uuid from "uuid";
import AnswerRow from "./AnswerRow";

/**
 *
 * @param inputAnswer
 * @param editAnswer
 * @param removeAnswer
 * @param sectionId
 * @param sectionData - array of objects like [{id: maxId + 1, title: "Odpowiedź", is_checked: false}, ...];
 * @param setUnsetChecked - function to change is_checked value: setUnsetChecked(sectionId, answerId);
 * @param name
 * @param type
 * @returns {JSX.Element}
 * @constructor
 */
function SectionAnswers({ inputAnswer, editAnswer, removeAnswer, sectionId, sectionData, setUnsetChecked, name, type }) {
  const addAnswer = (e) => {
    e.preventDefault();
    inputAnswer(sectionId);
  };

  const answersList = sectionData?.map((answer, i) => {
      try {
        if (type === "osa" || type === "msa") {
          return (
            <AnswerRow
              key={ i }
              index={ i }
              sectionId={ sectionId }
              changeAnswer={ editAnswer }
              removeAnswer={ removeAnswer }
              answerId={ answer.id }
              isChecked={ answer.is_checked }
              setUnsetChecked={ setUnsetChecked }
              name={name}
              text={answer.title || ""}
              type={type}
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
        <thead>
          <tr className="FormsEdit__thr">
            <th className="FormsEdit__th"></th>
            <th className="FormsEdit__th" title="Zaznacz prawidłowe odpowiedzi">Szablon odpowiedzi</th>
            <th className="FormsEdit__th"></th>
          </tr>
        </thead>
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
