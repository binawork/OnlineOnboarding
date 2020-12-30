import React, { useState } from "react";
import PropTypes from "prop-types";
import FormSectionsAPI from "../hooks/FormSectionsAPI";

const AnswerRow = ({ sectionId, answerId, index, changeAnswer, removeAnswer, name, text, type, answers, setAnswers }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(text);
  // console.log(answerId, title)

  const onEditTitleMode = (e) => {
    e.preventDefault();
    setEditing(true);
    const timer = setTimeout(() => {
      const editingInput = document.getElementById("edit-" + answerId);
      editingInput.focus();
      editingInput.select();
    }, 0);
    return () => clearTimeout(timer);
  };
  const offEditTitleMode = (e) => {
    e.preventDefault();
    setEditing(false);
    saveAnswer();
  };
  const saveAnswer = () => {
    setAnswers(
      answers.map((answer) => {
        if (answer.id === answerId) answer.data.title = title;
        return answer;
      })
    );
    changeAnswer(title, sectionId, index);
  };
  const editAnswer = (e) => {
    setTitle(e.target.value);
  };
  const deleteAnswer = (e) => {
    e.preventDefault();
    FormSectionsAPI.deleteAnswer(answerId);
    removeAnswer(sectionId, index);
    setAnswers(answers.filter((answer) => answer.id !== answerId));
  };
  const onEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.getElementById(`save-button-${answerId}`).click();
    }
  };
  return (
    <tr>
      <td className="d-flex justify-content-between align-items-center pr-0">
        <div className="w-100">
          {editing === true ? (
            <div className="input-group">
              <input
                key={`edit-answ-input-${answerId}`}
                className="form-control"
                id={`edit-${answerId}`}
                name={name}
                type="text"
                value={title}
                onChange={editAnswer}
                onKeyDown={onEnter}
              />
            </div>
          ) : (
            <div
              className={`custom-control custom-control-inline custom-${
                type === "osa" ? "radio" : "checkbox"
              }`}
            >
              <input
                key={`saved-answ-input-${answerId}`}
                className={"custom-control-input"}
                id={answerId}
                name={name}
                type={type === "osa" ? "radio" : "checkbox"}
              />
              <label className="custom-control-label" htmlFor={answerId}>
                {text}
              </label>
            </div>
          )}
        </div>
        <div className="d-flex justify-content-end">
          {editing === true ? (
            <button
              key={`save-answer-btn-${answerId}`}
              id={`save-button-${answerId}`}
              className="btn"
              onClick={offEditTitleMode}
              title="Zapisz"
            >
              <i className="fas fa-save"></i>
            </button>
          ) : (
            <button
              key={`edit-answer-btn-${answerId}`}
              className="btn"
              onClick={onEditTitleMode}
              title="Edytuj"
            >
              <i className="fas fa-edit"></i>
            </button>
          )}
          <button
            className="btn text-danger"
            name={name}
            onClick={deleteAnswer}
            title="Usuń"
          >
            <i className="fa fa-trash-o fa-md">&#61944;</i>
          </button>
        </div>
      </td>
    </tr>
  );
};

AnswerRow.propTypes = {
  answerId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired,
  setAnswers: PropTypes.func.isRequired,
};

export default React.memo(AnswerRow);
