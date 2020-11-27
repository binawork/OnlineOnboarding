import React, { useState } from "react";
import PropTypes from "prop-types";
import FormSectionsAPI from "../hooks/FormSectionsAPI";

const AnswerRow = ({ answerId, name, text, type, answers, setAnswers }) => {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(text);

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
    saveAnswers();
  };
  const saveAnswers = () => {
    setAnswers(
      answers.map((answer) => {
        if (answer.id === answerId) answer.data = data;
        return answer;
      })
    );
  };
  const editAnswer = (e) => {
    setData(e.target.value);
  };
  const deleteAnswer = (e) => {
    e.preventDefault();
    FormSectionsAPI.deleteAnswer(answerId);
    setAnswers(answers.filter((answer) => answer.id !== answerId));
  };
  const onEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.getElementById(`saveButton-${answerId}`).click();
    }
  };
  return (
    <tr>
      <td>
        {editing === true ? (
          <div className="input-group">
            <input
              className="form-control"
              id={`edit-${answerId}`}
              name={name}
              type="text"
              value={data}
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
      </td>
      <td>
        {editing === true ? (
          <button
            id={`saveButton-${answerId}`}
            className="btn"
            onClick={offEditTitleMode}
          >
            &#9997; Zapisz
          </button>
        ) : (
          <button className="btn" onClick={onEditTitleMode}>
            &#9997; Edytuj
          </button>
        )}
      </td>
      <td>
        <button className="btn text-danger" name={name} onClick={deleteAnswer}>
          <i className="fa fa-trash-o fa-md">&#61944;</i> Usuń
        </button>
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

export default AnswerRow;
