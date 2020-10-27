import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Qa from "./Qa";

const Questions = ({ qaList, setQaList }) => {
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
    <form>
      <div className="form-group">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="dp1">
            {(provided) => (
              <div
                // className="col"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {qaList.map((element, index) => (
                  <Draggable
                    key={element.id}
                    draggableId={"draggable-" + element.id}
                    index={index}
                  >
                    {(provided) => (
                      <Qa 
                      id={element.id}
                      question={element.question}
                      answer={element.answer}
                      qaList={qaList}
                      setQaList={setQaList}
                      innerRef={provided.innerRef} 
                      provided={provided} />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </form>
  );
};

export default Questions;
