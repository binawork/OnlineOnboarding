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
  
  const showAutosaveInfo = () => {
    // Show info "Zapisano zmiany" for 3 sec. when the changes were saved
    if(saveOnDemand !== true) {
      setAutosave(true);
      const timer = setTimeout(() => {
          setAutosave(false);
      }, 3000);
      
      return () => {
          clearTimeout(timer);
      }
    };
  }
  
  useEffect(() => {
    if(editMode && saveOnDemand !== true) {
      setSaveError(null);
      // Save changes after 3 sec. form last change
      const saveInterval = setTimeout(
        () => {
          if(saveOnDemand !== true) {
            saveAll(qaList, setSaveError, showAutosaveInfo);
          }
        },
        3000
      );
      return () => clearTimeout(saveInterval);
    } 
  }, [qaList]);

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
  const showModal = () => {
    setShowSaveModal(true);
  };
  const handleSaveAll = (e) => {
    e.preventDefault();
    setAutosave(false);
    setSaveOnDemand(true);
    const accepted = saveAll(qaList, setSaveError, showModal);
    if(accepted) {
      setQaList(accepted);
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
    <div className="QnA">
      <header className="QnA__header">
        <h1 className="QnA__header-text QnA__header-text--main">Q&A</h1>
        <p className="QnA__header-text">Najczęstsze pytania i odpowiedzi</p>
      </header>
      <section>
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
          <div className="mb-3">
            { questionsAndAnswers }
          </div>
        )}
      </section>

      {editMode ? (
        <div className="d-flex justify-content-center">
          <a
            href="#"
            className="QnA__button--add card-footer-item"
            onClick={handleAddQnA}
          >
            <i className="fa fa-plus-circle mr-1"></i>
            Dodaj Q&A
          </a>
        </div>
      ) : (
        <></>
      )}
      <footer className="QnA__footer card-body">
				<div className="QnA__button-background mr-3">
          <button
            className="QnA__button btn"
            onClick={handleSaveAll}
            title="Zapisane Q&A pojawi się automatycznie u pracowników"
            disabled={qaList.length ? false : true}
          >
            Zapisz
          </button>
				</div>
				<div className="QnA__button-background">
          <button
            className="QnA__button btn"
            onClick={handleShowPreview}
            disabled={qaList.length ? false : true}
          >
            {editMode ? "Podgląd" : "Edytuj"}
          </button>
				</div>
      </footer>

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
