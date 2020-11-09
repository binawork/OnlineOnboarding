import React, { useState } from "react";
// import PropTypes from "prop-types";

const AnswerToChoose = ({
  innerRef,
  provided,
  id,
  name,
  title,
  type,
}) => {
  const [editing, setEditing] = useState(false);

  const onEditTitleMode = (e) => {
      e.preventDefault();
      setEditing(true);
      setTimeout(() => {
        document.getElementById("edit" + id).focus();
        document.getElementById("edit" + id).select()
      }, 0);
  }
  const offEditTitleMode = (e) => {
      e.preventDefault();
      setEditing(false);
  }
  const clickSave = (e) => {
    if(e.key === 'Enter') {
      e.preventDefault(); 
      document.getElementById('saveInput' + id).click();
    }
  }

  return (
    <tr
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={innerRef}
    >
      <td>
        {editing === true ? (
          <div className="input-group">
            <input
              className="form-control"
              // id={"edit" + id}
              name={name}
              type="text"
              // value={title}
              // onChange={editAnswer}
              // onKeyDown={clickSave}
            />
          </div>
        ) : (
          <div className="custom-control custom-control-inline custom-checkbox">
            <input
              className={`custom-control-input ${
                false ? "is-valid" : ""
              }`}
              // className={`custom-control-input ${
              //   answChecked.includes(id) ? "is-valid" : ""
              // }`}
              id={id}
              name={name}
              type={type === "osa" ? "radio" : "checkbox"}
              // value={title}
              // onChange={changeChecked}
              // checked={answChecked.includes(id)}
            />
            <label className="custom-control-label" htmlFor={id}>
              {title}
            </label>
          </div>
        )}
      </td>
      <td>
        {editing === true ? (
          <button
            id={'saveInput' + id}
            className="btn"
            onClick={ offEditTitleMode }
          >
            &#9997; Zapisz
          </button>
        ) : (
          <button
            className="btn"
            onClick={ onEditTitleMode }
            onMouseDown={e=> e.preventDefault}
          >
            &#9997; Edytuj
          </button>
        )}
      </td>
      <td>
        <button
          className="btn text-danger"
          // id={"del" + id}
          name={name}
          // onClick={deleteAnswer}
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

export default AnswerToChoose;
