import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import QnA from "./QnA";
import { getQnA, saveAll } from "../hooks/QnAAPI";
import ModalWarning from "../ModalWarning";

const QnAList = () => {
  const [maxOrder, setMaxOrder] = useState(0);
  const [qaList, setQaList] = useState([]);
  const [editMode, changeEditMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  useEffect(() => {
    const accepted = getQnA(setQaList, setMaxOrder, setLoading, setError);
    if(accepted) setError(false);
  }, []);

  useEffect(() => {
    if (editMode) {
      // Save changes after 3 sec. form last change
      const saveInterval = setTimeout(
        () => saveAll(qaList, setQaList, setSaved),
        3000
      );
      return () => clearTimeout(saveInterval);
    } 
  }, [qaList]);

  useEffect(() => {
    // Show info "Zapisano zmiany" for 3 sec. when the changes were saved
    if (saved) {
      const timer = setTimeout(setSaved, 3000, false);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [saved]);

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
  };

  const handleSaveAll = (e) => {
    e.preventDefault();
    saveAll(qaList, setQaList);
    setShowSaveModal(true);
  };

  const handleShowPreview = (e) => {
    e.preventDefault();
    changeEditMode(!editMode);
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

    const droppedSection = qaList[source.index];
    const pageSections = [...qaList];

    pageSections.splice(source.index, 1);
    pageSections.splice(destination.index, 0, droppedSection);

    const updatedList = pageSections.map((qa, index) => {
      qa.order = index + 1;
      return qa;
    });

    setQaList(updatedList);
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
          <DragDropContext onDragEnd={onDragEnd}>
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

      {saved ? (
        <div
          className="fixed-bottom d-flex justify-content-center show-and-hide"
          style={{ display: "fixed-bottom", left: "240px" }}
        >
          <div
            className="m-2 p-2"
            style={{
              width: "150px",
              backgroundColor: "rgba(226, 232, 238, 0.57)",
              color: "black",
              textAlign: "center",
              borderRadius: "4px",
            }}
          >
            Zapisano zmiany
          </div>
        </div>
      ) : (
        <></>
      )}
      {showSaveModal ? (
        <ModalWarning
          handleAccept={hideModal}
          title={"Zapisywanie Q&A"}
          message={
            error
              ? "Nie udało się zapisać"
              : "Zmiany zostały pomyślnie zapisane"
          }
          show={true}
          acceptText={"Ok"}
          id={0}
        />
      ) : null}
    </div>
  );
};

export default QnAList;
