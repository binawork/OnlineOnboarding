import React, { useEffect, useState } from "react";
import MarkdownArea from "../MarkdownArea";
import Switcher from "../Switcher";
import RadioButton from "./SingleChoiceForm/RadioButton";
import AnswerToChoose from "./AnswerToChoose";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// import { copyQnA, saveQnA, deleteQnA } from "../hooks/QnA";

function FormSection({
  provided,
  innerRef,
  order,
  id,
  name,
  title,
  description,
  type,
  answers,
  sections,
  setSections,
  updateSections,
}) {
  // const [q, setQuestion] = useState("");
  // const [a, setAnswer] = useState("");
  // const [saved, setSaved] = useState(false);

  // useEffect(() => {
  //   // Show info "Zapisano zmiany" for 3sec when the changes were saved
  //   if (saved) {
  //     setTimeout(setSaved, 3000, false);
  //   }
  // }, [saved]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (q !== question) {
  //       question = q;
  //       saveQnA("question", id, q, updateSections, setSaved);
  //     }
  //     if (a !== answer) {
  //       answer = a;
  //       saveQnA("answer", id, a, updateSections, setSaved);
  //     }
  //   }, 4000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [q, a]);

  // const changeQuestion = (content) => {
  //   setQuestion(content);
  // };

  // const changeAnswer = (content) => {
  //   setAnswer(content);
  // };

  // const handleCopyQA = (e) => {
  //   e.preventDefault();
  //   const qnaToCopy = { question: q, answer: a, order: order };
  //   copyQnA(qnaToCopy, qaList, updateSections);
  // };

  // const handleDeleteQnA = (e) => {
  //   e.preventDefault();
  //   deleteQnA(id, qaList, updateSections);
  //   setQaList(qaList.filter((item) => item.id !== id));
  // };

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

  const cardHeader =
    type === "oa"
      ? "Pytanie otwarte"
      : type === "osa"
      ? "Jednokrotny wybór"
      : type === "msa"
      ? "Wielokrotny wybór"
      : "";
  // const answerRequired = true;

  const answersList = answers.map((answer, index) => {
    try {
      // if (type === "oa") {
      //   return (
      //     <div key={answer.id} className="form-group">
      //       <textarea
      //         id={answer.id}
      //         className="form-control"
      //         placeholder="Odpowiedź pracownika"
      //         rows="4"
      //         // value={userAnswer}
      //         // onChange={editOpenAnswer}
      //       ></textarea>
      //     </div>
      //   );
      // } else
      if (type === "osa" || type === "msa") {
        return (
          <Draggable
            key={answer.id}
            draggableId={"draggable-" + answer.id}
            index={index}
          >
            {(provided) => (
              <AnswerToChoose
                innerRef={provided.innerRef}
                provided={provided}
                // key={"answer" + answer.id}
                id={answer.id}
                name={name}
                title={answer.title}
                type={type}
                // answChecked={checked}
                // changeChecked={changeChecked}
                // deleteAnswer={deleteAnswer}
                // editAnswer={editAnswer}
              />
            )}
          </Draggable>
        );
      } else {
        throw new Error(
          "Wrong type of section. The proper section type is one of: 'oa', 'osa' or 'msa'."
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  });

  return (
    <div className="card-body" {...provided.draggableProps} ref={innerRef}>
      <div className="task-issue">
        <div className="card">
          <div className="card-header" {...provided.dragHandleProps}>
            <span className="drag-indicator"></span> {cardHeader}
          </div>
          <div className="card-body">
            <div className="form-group">
              <div className="input-group">
                <input
                  // id={"section-title-" + id}
                  type="text"
                  className="form-control"
                  placeholder="Tytuł"
                  // value={title}
                  // onChange={titleChange}
                  // required
                  autoFocus
                />
              </div>
            </div>
            <MarkdownArea
              id={id}
              content={description}
              // contentChange={descriptionChange}
              simple={false}
            />
            <hr />

            {type === "oa" ? (
              <div key={answers[0].id} className="form-group">
                <textarea
                  id={answers[0].id}
                  className="form-control"
                  placeholder="Odpowiedź pracownika"
                  rows="4"
                  // value={userAnswer}
                  // onChange={editOpenAnswer}
                ></textarea>
              </div>
            ) : (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="dp1">
                  {(provided) => (
                    <table className="table table-hover">
                      <tbody
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {answersList}
                        {provided.placeholder}
                      </tbody>
                    </table>
                  )}
                </Droppable>
              </DragDropContext>
            )}

            <hr />
            <div className="form-group">
              <div className="input-group-append">
                <button
                  className="btn btn-secondary"
                  // id={"add-answer-butt-" + id}
                  // onClick={addAnswer}
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
                // answRequired={answerRequired}
                // switcherChange={switcherChange}
              />{" "}
              Odp. wymagana
            </div>
            <div className="col">
              <button
                className="btn"
                // id={"copy-" + id}
                // onClick={copyForm}
              >
                <i className="fa fa-files-o fa-lg">&#61637;</i> Duplikuj pytanie
              </button>
            </div>
            <div className="col">
              <button
                className="btn text-danger"
                // onClick={deleteForm}
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
}

export default FormSection;
