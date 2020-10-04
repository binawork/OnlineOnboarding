import React from "react";
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
  return (
    <tr>
      <td>
        <i className="fa fa-arrows">&#10018;</i>
      </td>
      <td>
        <div className="custom-control custom-control-inline custom-checkbox">
          <input
            type="checkbox"
            className={answChecked.includes(id) ? classes.checked : classes.unchecked}
            id={id}
            name={name}
            value={title}
            onChange={handleCheck}
            checked={answChecked.includes(id)}
          />{" "}
          <label className="custom-control-label" htmlFor={id}>
            {title}
          </label>
        </div>
      </td>
      <td>
        {" "}
        <button className="btn" onClick={editAnswer}>
          &#9997; Edytuj
        </button>{" "}
      </td>
      <td>
        {" "}
        <button className="btn text-danger" onClick={deleteAnswer}>
          <i className="fa fa-trash-o fa-lg">&#61944;</i> Usuń
        </button>{" "}
      </td>
    </tr>
  );
};

export default Checkbox;
