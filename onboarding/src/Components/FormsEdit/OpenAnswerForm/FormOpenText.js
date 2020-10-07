import React, { useState } from "react";
import PropTypes from "prop-types";
import Switcher from "../../Switcher";

// import "../../../static/looper/stylesheets/theme.min.css";
// import "../../../static/looper/stylesheets/theme-dark.min.css";
// import "../../../static/looper/vendor/fontawesome/all.min.css";

const FormOpenText = ({
  id,
  title,
  userAnswer,
  copyForm,
  deleteForm,
  answRequired,
  titleChange,
  editOpenAnswer,
  switcherChange,
}) => {

  return (
    <div className="card-body">
      <div className="task-issue">
        <div className="card">
          <div className="card-header">
            <span className="drag-indicator"></span> Pytanie otwarte
          </div>
          <div className="card-body">
            {/* <form> */}
              <div className="form-group">
                <div className="input-group">
                  <input
                    id={'title' + id}
                    type="text"
                    className="form-control"
                    placeholder="Wpisz pytanie"
                    value={title}
                    onChange={titleChange}
                    required
                  />
                </div>
              </div>
              <hr />
              <div className="form-group">
                <textarea
                  id={'answer' + id}
                  className="form-control"
                  placeholder="Tekst odpowiedzi użytkownika"
                  rows="4"
                  value={userAnswer}
                  onChange={editOpenAnswer}
                  // required={answRequired}
                ></textarea>
              </div>
            {/* </form> */}
          </div>
          <div className="card-footer align-items-center">
            <div className="col">
              <Switcher
                id={id}
                answRequired={answRequired}
                switcherChange={switcherChange}
              />
              {" "}Odp. wymagana
            </div>
            <div className="col">
              <button
                className="btn"
                id={id}
                onClick={copyForm}
                // style={{ color: "#000" }}
              >
                <i className="fa fa-files-o fa-lg">&#61637;</i> Duplikuj pytanie
              </button>
            </div>
            <div className="col">
              <button
                className="btn text-danger"
                onClick={deleteForm}
                // style={{ color: "#000" }}
              >
                <i className="fa fa-trash-o fa-lg">&#61944;</i>
                Usuń
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FormOpenText.propTypes = {
  id: PropTypes.string.isRequired,
  copyForm: PropTypes.func.isRequired,
  deleteForm: PropTypes.func.isRequired,
  answRequired: PropTypes.bool.isRequired,
  switcherChange: PropTypes.func.isRequired,
}

export default FormOpenText;
