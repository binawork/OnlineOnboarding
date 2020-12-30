import React, { useRef, useEffect } from "react";
import MarkdownArea from "../MarkdownArea";
import SectionAnswers from "./SectionAnswers";
import { Draggable } from "react-beautiful-dnd";
import FormSectionsAPI from "../hooks/FormSectionsAPI";
import uuid from "uuid";

function FormSection({
  sections,
  setSections,
  maxOrder,
  updateMaxOrder,
  //answers,
  //setAnswers,
}) {
  const sectionsRef = useRef(sections);
  useEffect(() => {
    sectionsRef.current = sections;
  });

  const cardHeader = (type) =>
    type === "oa"
      ? "Pytanie otwarte"
      : type === "osa"
      ? "Jednokrotny wybór"
      : type === "msa"
      ? "Wielokrotny wybór"
      : "";

  const changeTitle = (e, sectionId) => {
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) section.title = e.target.value;
      return section;
    });
    setSections(updatedSections);
  };

  const changeDescription = (content, sectionId) => {
    const updatedSections = sectionsRef.current.map((section) => {
      if (section.id === sectionId) section.description = content;
      return section;
    });
    setSections(updatedSections);
  };

  const handleCopySection = (e, order, section) => {
    e.preventDefault();
    const copiedSection = { ...section, id: uuid.v4(), order: order + 1 };
    /*const copiedAnswers = answers
      .filter((answer) => answer.section === section.id)
      .map((answer) => {
        return { id: uuid.v4(), data: answer.data, section: copiedSection.id };
      });*/
    const updatedSections = sections.map((section) => {
      if (section.order > order) {
        section.order = section.order + 1;
      }
      return section;
    });
    updatedSections.splice(order, 0, copiedSection);
    setSections(updatedSections);
    //setAnswers([...answers, ...copiedAnswers]);
    updateMaxOrder(maxOrder + 1);
  };

  const handleDeleteSection = (e, order, sectionId) => {
    e.preventDefault();
    const updatedSections = sections.map((section) => {
      if (section.order > order) {
        section.order = section.order - 1;
      }
      return section;
    });
    FormSectionsAPI.deleteSection(sectionId/*, answers, setAnswers*/);
    setSections(updatedSections.filter((item) => item.id !== sectionId));
    /*setAnswers(
      answers.filter(
        (item) => item.section !== sectionId && item.section !== null
      )
    );*/
    updateMaxOrder(maxOrder - 1);
  };

  const inputAnswer = function(sectionId){
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) section.data.push({title: "Odpowiedź", is_checked: false});
      return section;
    });
    setSections(updatedSections);
  };
  const removeAnswer = function(sectionId, answerIndex){
    if(answerIndex < 0)
      return ;

    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) section.data.splice(answerIndex, 1);
      return section;
    });
    setSections(updatedSections);
  };
  const editAnswer = function(value, sectionId, answerIndex){
    if(answerIndex < 0)
      return ;

    const updatedSections = sections.map((section) => {
      if (section.id === sectionId && answerIndex < section.data.length)
        section.data[answerIndex].title = value;
      return section;
    });
    setSections(updatedSections);
  };


  return (
    <>
      {sections.map((section, index) => (
        <Draggable
          key={section.id}
          draggableId={"draggable-" + section.id}
          index={index}
        >
          {(provided) => (
            <section
              className="card my-3"
              {...provided.draggableProps}
              ref={provided.innerRef}
            >
              <header className="card-header" {...provided.dragHandleProps}>
                <span className="drag-indicator"></span>{" "}
                {cardHeader(section.type)}
              </header>
              <div className="card-body">
                <div className="form-group">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tytuł"
                      value={section.title}
                      onChange={(e) => changeTitle(e, section.id)}
                      autoFocus={typeof section.id === "string" ? true : false}
                      required
                    />
                  </div>
                </div>
                <MarkdownArea
                  id={section.id}
                  content={section.description}
                  contentChange={(content) =>
                    changeDescription(content, section.id)
                  }
                  simple={false}
                />
                <hr />

                {section.type === "oa" ? (
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      placeholder="Odpowiedź pracownika"
                      rows="4"
                    ></textarea>
                  </div>
                ) : (
                  <SectionAnswers
                    inputAnswer={ inputAnswer }
                    editAnswer={ editAnswer }
                    removeAnswer={ removeAnswer }
                    sectionId={section.id}
                    sectionData={ section.data }
                    /*answers={answers}
                    setAnswers={setAnswers}*/
                    name={section.type + section.id}
                    type={section.type}
                  />
                )}
              </div>
              <footer className="card-footer d-flex justify-content-end p-2">
                <button
                  className="btn"
                  onClick={(e) => handleCopySection(e, index + 1, section)}
                >
                  <i className="fa fa-files-o fa-lg" title="Duplikuj">
                    &#61637;
                  </i>
                </button>
                <button
                  className="btn text-danger"
                  onClick={(e) => handleDeleteSection(e, index + 1, section.id)}
                >
                  <i className="fa fa-trash-o fa-lg" title="Usuń">
                    &#61944;
                  </i>
                </button>
              </footer>
            </section>
          )}
        </Draggable>
      ))}
    </>
  );
}

export default FormSection;
