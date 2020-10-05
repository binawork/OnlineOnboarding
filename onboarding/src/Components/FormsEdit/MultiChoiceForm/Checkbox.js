import React, { useState } from "react";
import PropTypes from "prop-types";

const Checkbox = ({
  id,
  classes,
  name,
  title,
  answChecked,
  handleCheck,
  deleteAnswer,
  editAnswer,
}) => {
  const [editing, setEditing] = useState(false);

  return (
    <tr>
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
              className={
                answChecked.includes(id) ? classes.checked : classes.unchecked
              }
              id={id}
              name={name}
              type="checkbox"
              value={title}
              onChange={handleCheck}
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
        <button className="btn text-danger" onClick={deleteAnswer}>
          <i className="fa fa-trash-o fa-lg">&#61944;</i> Usuń
        </button>
      </td>
    </tr>
  );
};

export default Checkbox;
