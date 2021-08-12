import React, { useState } from "react";
import PropTypes from "prop-types";
import Switcher from "../Switcher";
import trashIcon from "../../static/icons/trash.svg";

/**
 *
 * @param sectionId
 * @param answerId - id value of answer from list: [{id: maxId + 1, title: "Odpowiedź", is_checked: false}, ...];
 * @param index - index of element in list like above;
 * @param changeAnswer
 * @param removeAnswer
 * @param setUnsetChecked - function to modify is_checked property: setUnsetChecked(sectionId, answerId);
 * @param isChecked
 * @param name
 * @param text
 * @param type
 * @returns {JSX.Element}
 * @constructor
 */
const AnswerRow = ({ sectionId, answerId, index, changeAnswer, removeAnswer, setUnsetChecked, isChecked, name, text, type }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(text);
  // console.log(answerId, title)
  const domIdIndex = "" + sectionId + "-" + index;

  const onEditTitleMode = (e) => {
    e.preventDefault();
    setEditing(true);
    const timer = setTimeout(() => {
      const editingInput = document.getElementById("edit-" + domIdIndex);
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
    /*setAnswers(
      answers.map((answer) => {
        if (answer.id === answerId) answer.data.title = title;
        return answer;
      })
    );*/
    changeAnswer(title, sectionId, index);
  };
  const editAnswer = (e) => {
    setTitle(e.target.value);
  };
  const deleteAnswer = (e) => {
    e.preventDefault();
    //FormSectionsAPI.deleteAnswer(answerId);
    removeAnswer(sectionId, index);
    //setAnswers(answers.filter((answer) => answer.id !== answerId));
  };
  const onEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.getElementById(`save-button-${domIdIndex}`).click();
    }
  };

  const checkAnswer = function(){
    setUnsetChecked(sectionId, answerId);
  };

  return (
    <tr className="FormsEdit__tr">
      <td className="FormsEdit__td">
        {editing === true ? (
          <input
            key={`edit-answ-input-${domIdIndex}`}
            className="FormSection__input form-control"
            id={`edit-${domIdIndex}`}
            name={name}
            type="text"
            value={title}
            onChange={editAnswer}
            onKeyDown={onEnter}
          />
        ) : (
          <div
            className={`custom-control custom-control-inline custom-${
              type === "osa" ? "radio" : "checkbox"
            }`}
          >
            <input
              key={`saved-answ-input-${domIdIndex}`}
              className={"custom-control-input"}
              id={domIdIndex}
              name={name}
              type={type === "osa" ? "radio" : "checkbox"}
              disabled
            />
            <label className="custom-control-label" htmlFor={domIdIndex}>
              {text}
            </label>
          </div>
        )}
      </td>
      <td className="FormsEdit__td FormsEdit__td--middle">
        <Switcher 
          id={`switch-${domIdIndex}`}
          isChecked={ isChecked }
          switcherChange={ checkAnswer } />
      </td>
      <td className="FormsEdit__td FormsEdit__td--middle">
        {editing === true ? (
          <button
            key={`save-answer-btn-${domIdIndex}`}
            id={`save-button-${domIdIndex}`}
            className="btn"
            onClick={offEditTitleMode}
            title="Zapisz"
          >
            <i className="fas fa-save"></i>
          </button>
        ) : (
          <button
            key={`edit-answer-btn-${domIdIndex}`}
            className="btn"
            onClick={onEditTitleMode}
            title="Edytuj"
          >
            <i className="fas fa-edit"></i>
          </button>
        )}
        <button
          className="btn"
          name={name}
          onClick={deleteAnswer}
          title="Usuń"
        >
          <img className="FormSection__button-icon" src={ trashIcon } alt="Usuń" />
        </button>
      </td>
    </tr>
  );
};

AnswerRow.propTypes = {
  /*answerId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,*/
  index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  //answers: PropTypes.array.isRequired,
  //setAnswers: PropTypes.func.isRequired,
};

export default React.memo(AnswerRow);
