import React, { Component } from "react";
import Switcher from "../Switcher";
import RadioButton from "./RadioButton";
import { v4 as uuidv4 } from "uuid";

class FormChoiceEdit extends Component {
  state = {
    title: "",
    description: "",
    singleChoices: [],
    answChecked: "",
    answRequired: true,
  };

  handleChangeChecked = (e) => {
    this.setState({ answChecked: e.target.id });
  };

  handleTitleChange = (e) => {
    console.log(e.target);
    this.setState({ title: e.target.value });
  };

  handleDescriptionChange = (e) => {
    console.log(e.target);
    this.setState({ description: e.target.value });
  };

  handleSwitcherChange = () => {
    this.setState({
      answRequired: this.state.answRequired === true ? false : true,
    });
  };

  handleEditAnswer = (id) => {
    console.log(id);
  };
  
  handleDeleteAnswer = (id) => {
    this.setState((prevState) => {
      const singleChoices = prevState.singleChoices.filter(
        (choice) => choice.id !== id
      );
      return { singleChoices };
    });
  };

  handleAddAnswer = (e) => {
    e.preventDefault();
    const { singleChoices } = this.state;
    let i = singleChoices.length ? singleChoices.length + 1 : 1;

    const choice = { id: uuidv4(), title: "Odpowiedź " + i };
    this.setState({
      singleChoices: [...this.state.singleChoices, choice],
    });
  };

  render() {
    const {
      title,
      description,
      answChecked,
      answRequired,
      singleChoices,
    } = this.state;

    return (
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
                    onChange={this.handleTitleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  placeholder="Opis (markdown)"
                  rows="4"
                  value={description}
                  onChange={this.handleDescriptionChange}
                ></textarea>
              </div>
              <hr />
              <table className="table table-hover">
                <tbody>
                  {singleChoices.map((choice) => (
                    <RadioButton
                      key={choice.id}
                      id={choice.id}
                      name={this.props.name}
                      title={choice.title}
                      answChecked={answChecked}
                      handleRadioChange={this.handleChangeChecked}
                      deleteAnswer={() => this.handleDeleteAnswer(choice.id)}
                      editAnswer={() => this.handleEditAnswer(choice.id)}
                    />
                  ))}
                </tbody>
              </table>
              <hr />
              <div className="form-group">
                <div className="input-group-append">
                  <button
                    className="btn btn-secondary"
                    onClick={this.handleAddAnswer}
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
                answRequired={answRequired}
                handleSwitcherChange={this.handleSwitcherChange}
              />{" "}
              Odp. wymagana
            </div>
            <div className="col">
              <button
                className="btn"
                // onClick={ this.handleCopyForm }
                // style={{ color: "#000" }}
              >
                &#61637; Duplikuj pytanie
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-outline-danger"
                // onClick={ this.handleDeleteForm }
                // style={{ color: "#000" }}
              >
                &#61944; Usuń
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FormChoiceEdit;
