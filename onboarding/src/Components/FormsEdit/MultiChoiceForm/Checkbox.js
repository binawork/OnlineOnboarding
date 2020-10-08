import React, { useState } from "react";
import PropTypes from "prop-types";

const Checkbox = ({
  id,
  name,
  title,
  answChecked,
  changeChecked,
  deleteAnswer,
  editAnswer,
  answRequired,
  provided,
  innerRef,
}) => {
  const [editing, setEditing] = useState(false);

  return (
    <tr
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={innerRef}
    >
      <td>
        <i className="fa fa-arrows">&#10018;</i>
      </td>
      <td>
        {editing === true ? (
          <div className="input-group">
            <input
              className="form-control"
              id={"edit" + id}
              name={name}
              type="text"
              value={title}
              onChange={editAnswer}
            />
          </div>
        ) : (
          <div className="custom-control custom-control-inline custom-checkbox">
            <input
              className={`custom-control-input ${
                answChecked.includes(id) ? "is-valid" : ""
              }`}
              id={id}
              name={name}
              type="checkbox"
              value={title}
              onChange={changeChecked}
              checked={answChecked.includes(id)}
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
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              setEditing(false);
            }}
          >
            &#9997; Zapisz
          </button>
        ) : (
          <button
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              setEditing(true);
            }}
          >
            &#9997; Edytuj
          </button>
        )}
      </td>
      <td>
        <button
          className="btn text-danger"
          id={"del" + id}
          name={name}
          onClick={deleteAnswer}
        >
          <i className="fa fa-trash-o fa-lg">&#61944;</i> Usuń
        </button>
      </td>
    </tr>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  answChecked: PropTypes.array.isRequired,
  changeChecked: PropTypes.func.isRequired,
  deleteAnswer: PropTypes.func.isRequired,
  editAnswer: PropTypes.func.isRequired,
};

export default Checkbox;
