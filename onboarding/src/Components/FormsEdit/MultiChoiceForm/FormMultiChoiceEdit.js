import React, { useState } from "react";
import Checkbox from "./Checkbox";
import Switcher from "../../Switcher";
import { v4 as uuidv4 } from "uuid";

//import "../../static/looper/stylesheets/theme.min.css";
//import "../static/looper/stylesheets/theme-dark.min.css";
//import "../static/looper/vendor/fontawesome/all.min.css";


const FormMultiChoiceEdit = ({
  id,
  name,
  copyForm,
  deleteForm,
  answRequired,
  switcherChange,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [multiChoices, setMultiChoices] = useState([
    { id: uuidv4(), title: "Odpowiedź 1" },
    { id: uuidv4(), title: "Odpowiedź 2" },
    { id: uuidv4(), title: "Odpowiedź 3" },
  ]);
  const [checked, setChecked] = useState([]);
  const classes = {
    checked: "custom-control-input is-valid",
    unchecked: "custom-control-input",
  };

  const handleAddAnswer = (e) => {
    e.preventDefault();
    const i = multiChoices.length ? multiChoices.length + 1 : 1;
    const choice = { id: uuidv4(), title: "Odpowiedź " + i };
    setMultiChoices([...multiChoices, choice]);
  };

  const handleTitleChange = (e) => {
    console.log(e.target);
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    console.log(e.target);
    setDescription(e.target.value);
  };

  const handleEditAnswer = (id) => {
    console.log(id);
  };

  const handleDeleteAnswer = (id) => {
    const choices = multiChoices.filter((choice) => choice.id !== id);
    setMultiChoices(choices);
  };

  const handleCheck = (id) => {
    checked.includes(id) 
      ? setChecked(checked.filter(checkedId => checkedId !== id))
      : setChecked([...checked, id])    
  }

  return (
    <div className="card-body">
      <div className="task-issue">
        <div className="card">
          <div className="card-header">
            <span className="drag-indicator"></span> Wiele odpowiedzi
          </div>
          <div className="card-body">
            <form>
              {" "}
              {/* form placeholder */}
              <div className="form-group">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tytuł"
                    value={title}
                    onChange={handleTitleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  placeholder="Opis (markdown)"
                  rows="4"
                  value={description}
                  onChange={handleDescriptionChange}
                ></textarea>
              </div>
              <hr />
              <table className="table table-hover">
                <tbody>
                  {multiChoices.map((choice) => (
                    <Checkbox
                      key={choice.id}
                      id={choice.id}
                      classes={classes}
                      name={name}
                      title={choice.title}
                      answChecked={checked}
                      handleCheck={() => handleCheck(choice.id)}
                      deleteAnswer={() => handleDeleteAnswer(choice.id)}
                      editAnswer={() => handleEditAnswer(choice.id)}
                    />
                  ))}
                </tbody>
              </table>
              <hr />
              <div className="form-group">
                <div className="input-group-append">
                  <button
                    className="btn btn-secondary"
                    onClick={handleAddAnswer}
                    style={{ color: "#000" }}
                  >
                    Dodaj odpowiedź
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="card-footer align-items-center">
            <div className="col">
              <Switcher
                id={id}
                answRequired={answRequired}
                switcherChange={switcherChange}
              />{" "}
              Odp. wymagane {/* form placeholder */}
            </div>
            <div className="col">
              <button
                className="btn"
                onClick={copyForm}
                // style={{ color: "#000" }}
              >
                <i className="fa fa-files-o fa-lg">&#61637;</i> Duplikuj pytanie
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-outline-danger"
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

export default FormMultiChoiceEdit;
