import React, { useState, useEffect, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import { getPath, getCookie } from "../utils.js";
import Qa from "../QA/Qa";

function QnA({
  qaList,
  setQaList,
  count,
  handleUpdate,
  updateMaxOrder,
  editMode,
}) {
  const [loaded, isLoaded] = useState(false);

  const url = getPath();
  const fetchProps = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": "",
    },
  };

  useEffect(() => {
    fetch(url + "api/q_and_a/", fetchProps)
      .then((res) => res.json())
      .then((result) => {
        isLoaded(true);
        const sortedResult = result.sort((a, b) => a.order - b.order);
        const orders = result
          .map((i) => i.order)
          .filter((i) => i >= 0 && typeof i === "number");
        // console.log("orders", orders);
        // console.log("get result: ", sortedResult);
        setQaList(sortedResult);
        updateMaxOrder(orders[orders.length - 1]);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [count]);

  if (!loaded) {
    return <div>Ładowanie...</div>;
  } else {
    return (
      <>
        {qaList.map((element, index) =>
          editMode ? (
            <Draggable
              key={element.id}
              draggableId={"draggable-" + element.id}
              index={index}
            >
              {(provided) => (
                <Qa
                  key={element.id}
                  id={element.id}
                  question={element.question}
                  answer={element.answer}
                  order={element.order}
                  qaList={qaList}
                  setQaList={setQaList}
                  handleUpdate={handleUpdate}
                  draggableProps={provided.draggableProps}
                  innerRef={provided.innerRef}
                  dragHandleProps={provided.dragHandleProps}
                  editMode={editMode}
                />
              )}
            </Draggable>
          ) : (
            <Qa
              key={element.id}
              id={element.id}
              question={element.question}
              answer={element.answer}
              order={element.order}
              qaList={qaList}
              editMode={editMode}
            />
          )
        )}
      </>
    );
  }
}

export function addQnA(handleUpdate, maxOrder) {
  const url = getPath();
  const token = getCookie("csrftoken");
  const fetchProps = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": token,
    },
    body: null,
  };
  const data = { question: "", answer: "", order: maxOrder + 1 };
  fetchProps.body = JSON.stringify(data);

  fetch(url + "api/q_and_a/", fetchProps)
    .then((res) => res.json())
    .then((result) => {
      handleUpdate(result);
      // console.log("add result: ", result);
    })
    .catch((error) => {
      console.log(error);
    });
  return true;
}

export function copyQnA(qnaToCopy, qaList, handleUpdate) {
  const url = getPath();
  const token = getCookie("csrftoken");
  const fetchProps = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": token,
    },
    body: null,
  };
  const data = {
    question: qnaToCopy.question,
    answer: qnaToCopy.answer,
    order: qnaToCopy.order + 1,
  };
  fetchProps.body = JSON.stringify(data);

  fetch(url + "api/q_and_a/", fetchProps)
    .then((res) => res.json())
    .then((result) => {
      qaList.map((item) => {
        if (item.order >= qnaToCopy.order + 1) {
          fetchProps.method = "PATCH";
          fetchProps.body = JSON.stringify({ order: item.order + 1 });

          fetch(url + "api/q_and_a/" + item.id + "/", fetchProps).catch(
            (error) => {
              console.log(error);
            }
          );
        }
      });
      handleUpdate(result);
    })
    .catch((error) => {
      console.log(error);
    });

  return true;
}

export function saveQnA(element, id, content, handleUpdate, setSaved) {
  if (
    typeof content !== "string" ||
    (typeof content === "string" && content.length < 1)
  )
    return false;

  const url = getPath();
  const token = getCookie("csrftoken");
  const fetchProps = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": token,
    },
  };
  const data = {};
  element === "question" ? (data.question = content) : (data.answer = content);

  fetchProps.body = JSON.stringify(data);

  fetch(url + "api/q_and_a/" + id + "/", fetchProps)
    .then((res) => res.json())
    .then((result) => {
      handleUpdate(result);
      setSaved(true);
    })
    .catch((error) => {
      console.log(error);
    });
  return true;
}

export function deleteQnA(id, qaList, handleUpdate) {
  const url = getPath();
  const token = getCookie("csrftoken");
  const fetchProps = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": token,
    },
  };
  fetch(url + "api/q_and_a/" + id, fetchProps)
    .then((res) => res.text())
    .then(() => {
      handleUpdate();

      let order = 0;
      qaList.map((item) => {
        if (item.id !== id) {
          order += 1;
          item.order = order;
          fetchProps.method = "PATCH";
          fetchProps.body = JSON.stringify(item);

          fetch(url + "api/q_and_a/" + item.id + "/", fetchProps)
            .then((res) => res.json())
            .then((result) => {
              handleUpdate(result);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
  return true;
}

export function dndQnA(
  qaList,
  droppedSection,
  destinationSection,
  handleUpdate
) {
  const url = getPath();
  const token = getCookie("csrftoken");
  const fetchProps = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": token,
    },
    body: null,
  };
  const droppedData = { order: destinationSection.order };
  fetchProps.body = JSON.stringify(droppedData);

  fetch(url + "api/q_and_a/" + droppedSection.id + "/", fetchProps)
    .then((res) => res.json())
    .then((result) => {
      qaList.map((item) => {
        if (
          (item.order >= destinationSection.order &&
            item.order < droppedSection.order &&
            item.id !== droppedSection.id) ||
          (item.order <= destinationSection.order &&
            item.order > droppedSection.order &&
            item.id !== droppedSection.id)
        ) {
          const newOrder =
            droppedSection.order > destinationSection.order
              ? item.order + 1
              : item.order - 1;
          fetchProps.body = JSON.stringify({ order: newOrder });

          fetch(url + "api/q_and_a/" + item.id + "/", fetchProps)
            .then((res) => res.json())
            .then((response) => {
              handleUpdate(response);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });

  return true;
}

export function saveQnaSet(qaList) {
  const url = getPath();
  const token = getCookie("csrftoken");
  const fetchProps = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": token,
    },
  };
  qaList.map((qa) => {
    fetchProps.body = JSON.stringify(qa);
    fetch(url + "api/q_and_a/" + qa.id + "/", fetchProps)
      .then((res) => res.json())
      .catch((error) => {
        console.log(error);
      });
  });
  // console.log(data)
  return true;
}

export default QnA;
