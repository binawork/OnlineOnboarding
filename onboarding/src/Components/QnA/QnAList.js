/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import QnA from "./QnA";
import { getQnA, saveAll } from "../hooks/QnAAPI";
import ModalWarning from "../ModalWarning";
import SaveInfo from "../SaveInfo";
import { onDragEnd } from "../utils";

const QnAList = () => {
  const [maxOrder, setMaxOrder] = useState(0);
  const [qaList, setQaList] = useState([]);
  const [editMode, changeEditMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saveError, setSaveError] = useState(null);
  const [autosave, setAutosave] = useState(false);
  const [saveOnDemand, setSaveOnDemand] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  useEffect(() => {
    const accepted = getQnA(setQaList, setMaxOrder, setLoading, setError);
    if(accepted) setError(false);
  }, []);
  
  useEffect(() => {
    if(editMode && saveOnDemand !== true) {
      // Save changes after 3 sec. form last change
      const saveInterval = setTimeout(
        () => {
          if(saveOnDemand !== true) {
            const accepted = saveAll(qaList, setSaveError);
            if(accepted) {
              setAutosave(true);
            }
          }
        },
        3000
      );
      return () => clearTimeout(saveInterval);
    } 
  }, [qaList]);

  useEffect(() => {
    // Show info "Zapisano zmiany" for 3 sec. when the changes were saved
    if(autosave && saveOnDemand !== true) {
      const timer = setTimeout(() => {
          setAutosave(false);
      }, 3000);
      return () => {
          clearTimeout(timer);
      };
    }
  }, [autosave]);

  const handleAddQnA = (e) => {
    e.preventDefault();
    const newQnA = {
      id: uuidv4(),
      question: "",
      answer: "",
      order: maxOrder + 1,
    };
    setQaList([...qaList, newQnA]);
    setMaxOrder(maxOrder + 1);
  };
  
  const hideModal = () => {
    setShowSaveModal(false);
    setSaveError(null);
    setSaveOnDemand(false);
  };

  const handleSaveAll = (e) => {
    e.preventDefault();
    setAutosave(false);
    const accepted = saveAll(qaList, setSaveError);
    if(accepted) {
      setSaveOnDemand(true);
      setQaList(accepted);
      setShowSaveModal(true);
    }
  };

  const handleShowPreview = (e) => {
    e.preventDefault();
    changeEditMode(!editMode);
  };

  const questionsAndAnswers = qaList
    .sort((a, b) => a.order - b.order)
    .map((element, index) =>
      editMode ? (
        <Draggable
          key={element.id}
          draggableId={"draggable-" + element.id}
          index={index}
        >
          {(provided) => (
            <QnA
              id={element.id}
              question={element.question}
              answer={element.answer}
              order={element.order}
              qaList={qaList}
              setQaList={setQaList}
              maxOrder={maxOrder}
              setMaxOrder={setMaxOrder}
              draggableProps={provided.draggableProps}
              innerRef={provided.innerRef}
              dragHandleProps={provided.dragHandleProps}
              editMode={editMode}
            />
          )}
        </Draggable>
      ) : (
        <QnA
          key={element.id}
          question={element.question}
          answer={element.answer}
          order={element.order}
          editMode={editMode}
        />
      )
    );

  if (error) return <div>{error}</div>;
  return (
    <div className="card card-fluid">
      <div className="card-header">Najczęstsze pytania i odpowiedzi (Q&A)</div>
      <section className="card-body">
        {loading ? (
          <div>Ładowanie...</div>
        ) : qaList.length === 0 && !editMode ? (
          <div>
            Wciśnij przycisk "Edytuj", aby móc dodawać pytania i odpowiedzi
          </div>
        ) : editMode ? (
          <DragDropContext onDragEnd={(result) => onDragEnd(result, qaList, setQaList)}>
            <Droppable droppableId="dp1">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {questionsAndAnswers}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          questionsAndAnswers
        )}
      </section>

      {editMode ? (
        <footer className="card-footer">
          <a href="#" className="card-footer-item" onClick={handleAddQnA}>
            <i className="fa fa-plus-circle mr-1"></i>
            Dodaj Q&A
          </a>
        </footer>
      ) : (
        <></>
      )}
      <div className="card-body rounded-bottom border-top">
        <button
          className="btn btn-success mr-3"
          onClick={handleSaveAll}
          title="Zapisane Q&A pojawi się automatycznie u pracowników"
        >
          Zapisz
        </button>
        <button className="btn btn-success mr-3" onClick={handleShowPreview}>
          {editMode ? "Podgląd" : "Edytuj"}
        </button>
      </div>

      {autosave && (
        <SaveInfo message={saveError ? "Nie udało się zapisać - któreś z pól może zawierać za dużo znaków." : "Zapisano zmiany"} />
      )}
      {showSaveModal && saveOnDemand && (
        <ModalWarning
          handleAccept={hideModal}
          title={"Zapisywanie Q&A"}
          message={
            saveError
              ? saveError
              : "Zmiany zostały pomyślnie zapisane"
          }
          show={true}
          acceptText={"Ok"}
          id={0}
        />
      )}
    </div>
  );
};

export default QnAList;
