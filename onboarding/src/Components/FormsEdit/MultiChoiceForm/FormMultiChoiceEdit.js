import React, { useState } from "react";
import Checkbox from "./Checkbox";
import Switcher from "../../Switcher";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// import "../../../static/looper/stylesheets/theme.min.css";
// import "../../../static/looper/stylesheets/theme-dark.min.css";
// import "../../../static/looper/vendor/fontawesome/all.min.css";

const FormMultiChoiceEdit = ({
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
  changeAnswersOrder,
  provided,
  innerRef,
}) => {
  const onDragEnd = (result) => {
    // destination, source -> objects in which you can find the index of the destination and index of source item
    const { destination, source, reason } = result;
    // Not a thing to do...
    if (!destination || reason === "CANCEL") {
      return;
    }
    //If drop an element to the same place, it should do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const sectionAnswers = Object.assign([], choices);
    const droppedAnswers = choices[source.index];
    sectionAnswers.splice(source.index, 1);
    sectionAnswers.splice(destination.index, 0, droppedAnswers);

    changeAnswersOrder(id, sectionAnswers);
  };

  return (
    <div className="card-body" {...provided.draggableProps} ref={innerRef}>
      <div className="task-issue">
        <div className="card">
          <div className="card-header" {...provided.dragHandleProps}>
            <span className="drag-indicator"></span> Wiele odpowiedzi
          </div>
          <div className="card-body">
            {/* <form> */}
            <div className="form-group">
              <div className="input-group">
                <input
                  id={"title" + id}
                  type="text"
                  className="form-control"
                  placeholder="Tytuł"
                  value={title}
                  onChange={titleChange}
                  autoFocus
                />
              </div>
            </div>
            <div className="form-group">
              <textarea
                id={"descr" + id}
                className="form-control"
                placeholder="Opis (markdown)"
                rows="4"
                value={description}
                onChange={descriptionChange}
              ></textarea>
            </div>
            {/* <hr /> */}
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="dp1">
                {(provided) => (
                  <table className="table table-hover">
                    <tbody ref={provided.innerRef} {...provided.droppableProps}>
                      {choices.map((choice, index) => (
                        <Draggable
                          key={choice.id}
                          draggableId={"draggable-" + choice.id}
                          index={index}
                        >
                          {(provided) => (
                            <Checkbox
                              innerRef={provided.innerRef}
                              provided={provided}
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
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </tbody>
                  </table>
                )}
              </Droppable>
            </DragDropContext>
            <hr />
            <div className="form-group">
              <div className="input-group-append">
                <button
                  className="btn btn-secondary"
                  id={"addansw" + id}
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
              />{" "}
              Odp. wymagana
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

export default FormMultiChoiceEdit;
