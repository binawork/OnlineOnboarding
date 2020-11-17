import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import QnAAPI, { addQnA, dndQnA, saveQnaSet } from "../hooks/QnAAPI";

const QnAList = () => {
  const [countUpdate, update] = useState(0);
  const [maxOrder, setMaxOrder] = useState(0);
  const [qaList, setQaList] = useState([]);
  const [editMode, changeEditMode] = useState(true);
  // console.log(qaList)

  const updateQnA = () => {
    update(countUpdate + 1);
  };

  const handleAddQnA = (e) => {
    e.preventDefault();
    addQnA(updateQnA, maxOrder);
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveQnaSet(qaList);
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
    //If dorp an element to the same place, it should do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const destinationSection = qaList[destination.index];
    const droppedSection = qaList[source.index];

    dndQnA(qaList, droppedSection, destinationSection, updateQnA);

    const pageSections = Object.assign([], qaList);
    pageSections.splice(source.index, 1);
    pageSections.splice(destination.index, 0, droppedSection);
    setQaList(pageSections);
  };

  return (
    <div>
      <div className="card-body rounded-bottom border-top">
        {editMode ? (
          <button className="btn btn-success mr-3" onClick={handleSave}>
            Zapisz
          </button>
        ) : (
          <button className="btn btn-success mr-3" onClick={handleEdit}>
            Edytuj
          </button>
        )}

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
      </div>
      <section className="card-body">
        {editMode ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="dp1">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <QnAAPI
                    count={countUpdate}
                    handleUpdate={updateQnA}
                    maxOrder={maxOrder}
                    setMaxOrder={setMaxOrder}
                    qaList={qaList}
                    setQaList={setQaList}
                    editMode={editMode}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <QnAAPI
            qaList={qaList}
            editMode={editMode}
            setQaList={setQaList}
            setMaxOrder={setMaxOrder}
          />
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
    </div>
  );
};

export default QnAList;
