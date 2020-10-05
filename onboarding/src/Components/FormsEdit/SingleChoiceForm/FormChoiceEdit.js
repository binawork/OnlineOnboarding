import React, { useState } from "react";
import RadioButton from "./RadioButton";
import Switcher from "../../Switcher";
import { v4 as uuidv4 } from "uuid";

// import "../../../static/looper/stylesheets/theme.min.css";
// import "../../../static/looper/stylesheets/theme-dark.min.css";
// import "../../../static/looper/vendor/fontawesome/all.min.css";

const FormChoiceEdit = ({
  id,
  name,
  copyForm,
  deleteForm,
  answRequired,
  switcherChange,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [singleChoices, setSingleChoices] = useState([
    { id: uuidv4(), title: "Odpowiedź 1" },
    { id: uuidv4(), title: "Odpowiedź 2" },
    { id: uuidv4(), title: "Odpowiedź 3" },
  ]);
  const [checked, setChecked] = useState("");

  const handleRadioChange = (id) => {
    setChecked(id);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleEditAnswer = (e) => {
    const id = (e.target.id).slice(4);
    const choices = singleChoices.map(choice => {
      if(choice.id === id) choice.title = e.target.value;
      return choice;
    });
    setSingleChoices(choices);
  };

  const handleDeleteAnswer = (id) => {
    const choices = singleChoices.filter((choice) => choice.id !== id);
    setSingleChoices(choices);
  };

  const handleAddAnswer = (e) => {
    e.preventDefault();
    const i = singleChoices.length ? singleChoices.length + 1 : 1;
    const choice = { id: uuidv4(), title: "Odpowiedź " + i };
    setSingleChoices([...singleChoices, choice]);
  };

  return (
    <div className="card-body">
      <div className="task-issue">
        <div className="card">
          <div className="card-header">
            <span className="drag-indicator"></span> Jedna odpowiedź
          </div>
          <div className="card-body">
            <form>
              {" "}
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
                  {singleChoices.map((choice) => (
                    <RadioButton
                      key={choice.id}
                      id={choice.id}
                      name={name}
                      title={choice.title}
                      answChecked={checked}
                      handleRadioChange={() => handleRadioChange(choice.id)}
                      deleteAnswer={() => handleDeleteAnswer(choice.id)}
                      editAnswer={handleEditAnswer}
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
              Odp. wymagana
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
