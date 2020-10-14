import React, { useState, useEffect } from "react";
import RadioButton from "./RadioButton";
import Switcher from "../../Switcher";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css";
import 'react-summernote/lang/summernote-pl-PL';
import $ from 'jquery';

window.$ = $;
window.jQuery = $;
// import $ from 'jquery';
import 'popper.js/dist/popper';
// import 'bootstrap';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/tooltip';
import 'summernote/dist/summernote-bs4.min.css';
import 'summernote/dist/summernote-bs4.js';
// import 'bootstrap/dist/css/bootstrap.css';

// import "react-summernote/dist/summernote.woff2";

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
  changeAnswersOrder,
  provided,
  innerRef,
}) => {
  const onDragEnd = (result) => {
    // destination, source -> objects in which you can find the index of the destination and index of source item
    const { destination, source, reason } = result;
    // Not a thing to do...
    if (!destination || reason === "CANCEL") return;
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

  // useEffect(() => {
  //   // Update the document title using the browser API
  //     $('#summernote').summernote();
  // });

  const onChange = (content) => {
    console.log("onChange", content);
  };

  return (
    <div className="card-body" {...provided.draggableProps} ref={innerRef}>
      <div className="task-issue">
        <div className="card">
          <div className="card-header" {...provided.dragHandleProps}>
            <span className="drag-indicator"></span> Jedna odpowiedź
          </div>
          <div className="card-body">
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
            
            {/* <div id="summernote">Hello Summernote</div>
            
            <div className="card card-fluid">
              <div
                data-toggle="summernote"
                data-placeholder="Write here..."
                data-height="200"
              ></div>
            </div>
            <div className="card card-fluid">
              <div id="summernote-click2edit" className="card-body">
                <h5>Hi,</h5>
                <blockquote>We are summernote.</blockquote>
                <p>Click edit button to change me.</p>
                <p className="lead">
                  Super simple WYSIWYG editor on bootstrap.
                </p>
              </div>
              <div className="card-body rounded-bottom border-top">
                <button id="summernote-edit" className="btn btn-primary">
                  Edit
                </button>
                <button id="summernote-save" className="btn btn-primary d-none">
                  Save Change
                </button>
              </div>
            </div> */}

            <ReactSummernote
              value="Default value"
              options={{
                lang: "pl-PL",
                height: 250,
                dialogsInBody: true,
                placeholder:"Opis (markdown)",
                toolbar: [
                  ["style", ["style"]],
                  ["font", ["bold", "underline", "clear"]],
                  ["fontname", ["fontname"]],
                  ["para", ["ul", "ol", "paragraph"]],
                  ["table", ["table"]],
                  ["insert", ["link", "picture", "video"]],
                ],
              }}
              onChange={onChange}
            />

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
                            <RadioButton
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
                >
                  Dodaj odpowiedź
                </button>
              </div>
            </div>
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
              <button className="btn" id={'copy-' + id} onClick={copyForm}>
                <i className="fa fa-files-o fa-lg">&#61637;</i> Duplikuj pytanie
              </button>
            </div>
            <div className="col">
              <button className="btn text-danger" onClick={deleteForm}>
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

export default FormChoiceEdit;
