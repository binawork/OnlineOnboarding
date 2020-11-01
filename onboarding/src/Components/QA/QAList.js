import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Qa from "./Qa";
import QnA, { addQnA, saveQnA } from "../hooks/QnA";

const QAList = () => {
  // const [blankQnA, setBlankOnA] = useState([]);
  const [countUpdate, update] = useState(0);
  const updateQnA = () => {
    update(countUpdate + 1);
  }

  const handleAddQnA = (e) => {
    e.preventDefault();
    // setBlankOnA(
    // <Qa
    //   key={0}
    //   id={0}
    //   question={""}
    //   answer={""}
    //   handleUpdate={updateQnA}
      // draggableProps={provided.draggableProps}
      // innerRef={provided.innerRef}
      // dragHandleProps={provided.dragHandleProps}
    // />
    // );
    addQnA(updateQnA);
  }

  //   const handleSave = (e) => {
  //   e.preventDefault();
  //   let accepted = addQnA(updatePackages, qaList, qaList[0].question, qaList[0].answer, qaIdRef.current);
  // }

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

    const pageSections = Object.assign([], qaList);
    const droppedSection = qaList[source.index];
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
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {/* {qaList.map((element, index) => ( */}
                    {/* <Draggable
                      key={element.id}
                      draggableId={"draggable-" + element.id}
                      index={index}
                    >
                      {(provided) => ( */}

                        <QnA
                          count={countUpdate}
                          handleUpdate={updateQnA}
                          // setQaList={setQaList}
                          // qaList={qaList}
                          // provided={provided}
                          // innerRef={provided.innerRef}
                          // handleSave={handleSave}
                          // handleAddQa={handleAddQa}
                        />
                        
                      
                      {/* )} */}
                    {/* </Draggable> */}
                  {/* ))} */}
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
