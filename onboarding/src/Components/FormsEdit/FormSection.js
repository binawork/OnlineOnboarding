import React, { useEffect, useState } from "react";
import MarkdownArea from "../MarkdownArea";
import SaveInfo from "../SaveInfo";
// import Switcher from "../Switcher";
import AnswerRow from "./AnswerRow";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// import {
//   copySection,
//   updateSection,
//   deleteSection,
// } from "../hooks/FormSectionsAPI";

function FormSection({
  provided,
  innerRef,
  order,
  id,
  name,
  title,
  description,
  type,
  sections,
  setSections,
}) {
  const [sectionTitle, setTitle] = useState(title);
  const [sectionDescription, setDescription] = useState(description);
  // const [saved, setSaved] = useState(false);

  const cardHeader =
    type === "oa"
      ? "Pytanie otwarte"
      : type === "osa"
      ? "Jednokrotny wybór"
      : type === "msa"
      ? "Wielokrotny wybór"
      : "";
  // const answerRequired = true;

  // useEffect(() => {
  //   // Show info "Zapisano zmiany" for 3sec when the changes were saved
  //   if (saved) {
  //     setTimeout(setSaved, 3000, false);
  //   }
  // }, [saved]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (sectionTitle !== title) {
  //       title = sectionTitle;
  //       // updateSection("title", id, sectionTitle, updateSections, setSaved);
  //     }
  //     if (sectionDescription !== description) {
  //       description = sectionDescription;
  //       // updateSection(
  //       //   "description",
  //       //   id,
  //       //   sectionDescription,
  //       //   updateSections,
  //       //   setSaved
  //       // );
  //     }
  //   }, 4000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [sectionTitle, sectionDescription]);

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleCopySection = (e) => {
    e.preventDefault();
    const sectionToCopy = {
      title: sectionTitle,
      description: sectionDescription,
      order: order,
      type: type,
      // answers: answers,
      // page: page,
    };
    // copySection(sectionToCopy, sections, updateSections);
  };

  const handleDeleteSection = (e) => {
    e.preventDefault();
    console.log(1);
    // deleteSection(id, sections, updateSections);
    setSections(sections.filter((item) => item.id !== id));
  };

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

    // changeAnswersOrder(id, sectionAnswers);
  };

  // const answersList = answers.map((answer, index) => {
  //   try {
  //     if (type === "osa" || type === "msa") {
  //       return (
  //         <Draggable
  //           key={answer.id}
  //           draggableId={"draggable-" + answer.id}
  //           index={index}
  //         >
  //           {(provided) => (
  //             <AnswerRow
  //               innerRef={provided.innerRef}
  //               provided={provided}
  //               key={"answer" + answer.id}
  //               id={answer.id}
  //               name={name}
  //               title={answer.title}
  //               type={type}
  //               // answChecked={checked}
  //               // changeChecked={changeChecked}
  //               // deleteAnswer={deleteAnswer}
  //               // editAnswer={editAnswer}
  //             />
  //           )}
  //         </Draggable>
  //       );
  //     } else if (type !== "oa") {
  //       throw new Error(
  //         "Wrong type of section. The proper section type is one of: 'oa', 'osa' or 'msa'."
  //       );
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // });

  return (
    <section className="card my-3" {...provided.draggableProps} ref={innerRef}>
          <header className="card-header" {...provided.dragHandleProps}>
            <span className="drag-indicator"></span> {cardHeader}
          </header>
          <div className="card-body">
            <div className="form-group">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tytuł"
                  value={sectionTitle}
                  onChange={changeTitle}
                />
              </div>
            </div>
            <MarkdownArea
              id={id}
              content={sectionDescription}
              contentChange={setDescription}
              simple={false}
            />
            <hr />

            {type === "oa" ? (
              <div className="form-group">
                <textarea
                  // id={answers[0].id}
                  className="form-control"
                  placeholder="Odpowiedź pracownika"
                  rows="4"
                ></textarea>
              </div>
            ) : (
              <>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="dp1">
                    {(provided) => (
                      <table className="table table-hover">
                        <tbody
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {/* {answersList} */}
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
                      // onClick={addAnswer}
                    >
                      Dodaj odpowiedź
                    </button>
                  </div>
                </div>
              </>
            )}

          </div>
            <footer className="card-footer d-flex justify-content-end">
              <button className="btn" onClick={handleCopySection}>
                <i className="fa fa-files-o fa-lg">&#61637;</i> Duplikuj pytanie
              </button>
              <button className="btn text-danger" onClick={handleDeleteSection}>
                <i className="fa fa-trash-o fa-lg">&#61944;</i> Usuń
              </button>
            </footer>
      {/* {saved ? <SaveInfo /> : <></>} */}
    </section>
  );
}

export default FormSection;
