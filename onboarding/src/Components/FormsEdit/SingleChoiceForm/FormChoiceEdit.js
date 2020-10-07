import React, { useState } from "react";
import RadioButton from "./RadioButton";
import Switcher from "../../Switcher";

// import "../../../static/looper/stylesheets/theme.min.css";
// import "../../../static/looper/stylesheets/theme-dark.min.css";
// import "../../../static/looper/vendor/fontawesome/all.min.css";

const FormChoiceEdit = ({
  id,
  name,
  title,
  description,
  choices,
  checked,
  copyForm,
  deleteForm,
  answRequired,
  switcherChange,
  titleChange,
  descriptionChange,
  addAnswer,
  deleteAnswer,
  editAnswer,
  changeChecked,
}) => {
 
  return (
    <div className="card-body">
      <div className="task-issue">
        <div className="card">
          <div className="card-header">
            <span className="drag-indicator"></span> Jedna odpowiedź
          </div>
          <div className="card-body">
            {/* <form> */}
              {" "}
              <div className="form-group">
                <div className="input-group">
                  <input
                    id={'title' + id}
                    type="text"
                    className="form-control"
                    placeholder="Tytuł"
                    value={title}
                    onChange={titleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <textarea
                  id={'descr' + id}
                  className="form-control"
                  placeholder="Opis (markdown)"
                  rows="4"
                  value={description}
                  onChange={descriptionChange}
                ></textarea>
              </div>
              <hr />
              <table className="table table-hover">
                <tbody>
                  {choices.map((choice) => (
                    <RadioButton
                      key={choice.id}
                      id={choice.id}
                      name={name}
                      title={choice.title}
                      answChecked={checked}
                      changeChecked={changeChecked}
                      deleteAnswer={deleteAnswer}
                      editAnswer={editAnswer}
                      // answRequired={answRequired}
                    />
                  ))}
                </tbody>
              </table>
              <hr />
              <div className="form-group">
                <div className="input-group-append">
                  <button
                    className="btn btn-secondary"
                    id={'addansw' + id}
                    onClick={addAnswer}
                    // style={{ color: "#000" }}
                  >
                    Dodaj odpowiedź
                  </button>
                </div>
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
  // }
};

export default FormChoiceEdit;
