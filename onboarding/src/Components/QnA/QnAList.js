import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import QnA from "./QnA";
import { getQnA, saveAll } from "../hooks/QnAAPI";

const QnAList = () => {
  const [maxOrder, setMaxOrder] = useState(0);
  const [qaList, setQaList] = useState([]);
  const [editMode, changeEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const accepted = getQnA(setQaList, setMaxOrder, setLoading, setError);
    accepted ? setError(false) : null;
  }, []);

  useEffect(() => {
    if (editMode) {
      const saveInterval = setInterval(
        () => saveAll(qaList, setQaList, setSaved),
        15000
      );
      return () => clearInterval(saveInterval);
    } else {
      window.refreshIntervalId;
    }
  }, [editMode, qaList]);

  useEffect(() => {
    // Show info "Zapisano zmiany" for 3sec when the changes were saved
    if (saved){
      const timer = setTimeout(setSaved, 3000, false);
      return () => {clearTimeout(timer);}
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

  const handleSaveAll = (e) => {
    e.preventDefault();
    saveAll(qaList, setQaList, setSaved);
    changeEditMode(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    changeEditMode(true);
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
          editMode={editMode}
        />
      )
    );

  if (error) return <div>{error}</div>;
  return (
    <div>
      <div className="card-body rounded-bottom border-top">
        {editMode ? (
          <>
            <button className="btn btn-success mr-3" onClick={handleSaveAll}>
              Zapisz
            </button>
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-info-circle mr-2"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z" />
              <circle cx="8" cy="4.5" r="1" />
            </svg>
            <small>
              <i>Zapisane Q&A pojawi się automatycznie u pracowników</i>
            </small>
          </>
        ) : (
          <button className="btn btn-success mr-3" onClick={handleEdit}>
            Edytuj
          </button>
        )}
      </div>
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
    </div>
  );
};

export default QnAList;
