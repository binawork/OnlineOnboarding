import React, { useRef, useEffect } from "react";
import MarkdownArea from "../MarkdownArea";
import SectionAnswers from "./SectionAnswers";
import { Draggable } from "react-beautiful-dnd";
import FormSectionsAPI from "../hooks/FormSectionsAPI";
import uuid from "uuid";
import FormsSectionsPreview from "./FormsSectionsPreview";

function FormSection({
  sections,
  setSections,
  maxOrder,
  updateMaxOrder,
  editMode
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
    copiedSection.data = JSON.parse(JSON.stringify(section.data) );// fast cloning with data loss (slice() was not enough)! No problem for numbers, strings and bools;

    const updatedSections = sections.map((section) => {
      if (section.order > order) {
        section.order = section.order + 1;
      }
      return section;
    });
    updatedSections.splice(order, 0, copiedSection);
    setSections(updatedSections);
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
    FormSectionsAPI.deleteSection(sectionId);
    setSections(updatedSections.filter((item) => item.id !== sectionId));
    updateMaxOrder(maxOrder - 1);
  };

  const inputAnswer = function(sectionId){
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId){
        let maxId = section.data.length - 1, i = section.data.length - 1, intId;
        for(; i >= 0; i--){// = max(section.data[...].id,  data.length - 1);
          if(typeof section.data[i].id !== 'undefined' ){// 'id' in section.data[i];
            intId = parseInt(section.data[i].id, 10);
            if(intId > maxId) maxId = intId;
          }
        }

        section.data.push({id: maxId + 1, title: "Odpowiedź", is_checked: false});
      }

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
  const setUnsetChecked = function(sectionId, answerId){
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId){
        let i = section.data.length - 1;

        if(section.type === 'osa'){
          for(; i >= 0; i--){
            if(typeof section.data[i].id !== 'undefined'){// 'id' in section.data[i];
              section.data[i].is_checked = section.data[i].is_checked 
                ? false 
                : (section.data[i].id === answerId)
                  ? true : false;
            }
          }
        } else {
          for(; i >= 0; i--){
            if(typeof section.data[i].id !== 'undefined' && section.data[i].id === answerId){// 'id' in section.data[i];
              section.data[i].is_checked = !section.data[i].is_checked;
              break;
            }
          }

        }
      }

      return section;
    });

    setSections(updatedSections);
  };


  return (
    <>
      {sections && sections.map((section, index) => editMode 
        ? (
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
                    setUnsetChecked={ setUnsetChecked }
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
      ) : (
        <FormsSectionsPreview key={section.id} section={ section } />
      )
      )}
    </>
  );
}

export default FormSection;
