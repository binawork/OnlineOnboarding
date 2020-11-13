import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import QnA, { addQnA, dndQnA, saveQnaSet } from "../hooks/QnA";

const QAList = () => {
  const [countUpdate, update] = useState(0);
  const [maxOrder, updateMaxOrder] = useState(0);
  const [qaList, setQaList] = useState([]);
  const [editMode, changeEditMode] = useState(true);

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
    <div className="card card-fluid">
      <div className="">
        <div className="card-body rounded-bottom border-top">
          {editMode ? (
            <button className="btn btn-success" onClick={handleSave}>
              Zapisz
            </button>
          ) : (
            <button className="btn btn-success" onClick={handleEdit}>
              Edytuj
            </button>
          )}
        </div>
      </div>
      <div className="card-body">
        <div className="form-group">
          {editMode ? (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="dp1">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <QnA
                      count={countUpdate}
                      handleUpdate={updateQnA}
                      updateMaxOrder={updateMaxOrder}
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
            <QnA
              qaList={qaList}
              editMode={editMode}
              setQaList={setQaList}
              updateMaxOrder={updateMaxOrder}
            />
          )}
        </div>
      </div>
      {editMode ? (
        <div className="card-footer">
          <a href="#" className="card-footer-item" onClick={handleAddQnA}>
            <i className="fa fa-plus-circle mr-1"></i>
            Dodaj Q&A
          </a>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default QAList;
