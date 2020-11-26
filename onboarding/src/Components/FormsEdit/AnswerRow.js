import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
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
    setAnswers(answers.map((answer) => {
      if (answer.id === answerId) answer.data = data;
      return answer;
    }))
  };
  const editAnswer = (e) => {
    setData(e.target.value);
    // setAnswers(answers.map((answer) => {
    //   if (answer.id === answerId) answer.data = e.target.value;
    //   return answer;
    // }))
  };
  const deleteAnswer = (e) => {
    e.preventDefault();
    FormSectionsAPI.deleteAnswer(answerId);
    setAnswers(answers.filter((answer) => answer.id !== answerId));
  };
  const onEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // document.getElementById(`saveButton-${answerId}`).click();
      offEditTitleMode(e)
    }
  };
console.log('text', text || "")
  return (
    <tr>
      <td>
        <div
          className={`custom-control custom-control-inline custom-${
            type === "osa" ? "radio" : "checkbox"
          }`}
        >
          {editing === true ? (
            <input
              className="form-control"
              id={`edit-${answerId}`}
              name={name}
              type="text"
              value={data || ""}
              onChange={editAnswer}
              onKeyDown={onEnter}
            />
          ) : (
            <>
              <input
                className={"custom-control-input"}
                id={answerId}
                name={name}
                type={type === "osa" ? "radio" : "checkbox"}
                // value={text}
              // onChange={console.log("hej")}

              />
              <label className="custom-control-label" htmlFor={answerId}>
                {text}
              </label>
            </>
          )}
        </div>
      </td>
      <td>
        {editing === true ? (
          <button
            // id={`saveButton-${answerId}`}
            className="btn"
            onClick={offEditTitleMode}
          >
            &#9997; Zapisz
          </button>
        ) : (
          <button
            className="btn"
            onClick={onEditTitleMode}
            // onMouseDown={(e) => e.preventDefault}
          >
            &#9997; Edytuj
          </button>
        )}
      </td>
      <td>
        <button
          className="btn text-danger"
          name={name}
          onClick={deleteAnswer}
        >
          <i className="fa fa-trash-o fa-md">&#61944;</i> Usuń
        </button>
      </td>
    </tr>
  );
};

// Checkbox.propTypes = {
//   id: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   answChecked: PropTypes.array.isRequired,
//   changeChecked: PropTypes.func.isRequired,
//   deleteAnswer: PropTypes.func.isRequired,
//   editAnswer: PropTypes.func.isRequired,
// };

export default React.memo(AnswerRow);
