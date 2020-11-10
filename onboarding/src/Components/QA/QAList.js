import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import QnA, { addQnA, dndQnA } from "../hooks/QnA";

const QAList = () => {
  const [countUpdate, update] = useState(0);
  const [maxOrder, updateMaxOrder] = useState(0);
  const [qaList, setQaList] = useState([]);

  const updateQnA = () => {
    update(countUpdate + 1);
  };

  const handleAddQnA = (e) => {
    e.preventDefault();
    addQnA(updateQnA, maxOrder);
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
      <div className="card-body">
        <div className="form-group">
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
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
      <div className="card-footer">
        <a href="#" className="card-footer-item" onClick={handleAddQnA}>
          <i className="fa fa-plus-circle mr-1"></i>
          Dodaj Q&A
        </a>
      </div>
    </div>
  );
};

export default QAList;