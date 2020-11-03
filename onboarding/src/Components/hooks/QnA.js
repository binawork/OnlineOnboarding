import React, { useState, useEffect, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import { getPath, getCookie } from "../utils.js";
import Qa from "../QA/Qa";

function QnA({ count, handleUpdate, updateMaxOrder }) {
  const [qaList, setQaList] = useState([]);
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
          .map(i => i.order)
          .filter(i => i >= 0 && typeof i === "number");
        const maxOrder = Math.max(...orders);
        console.log('orders', orders)
        console.log("get result: ", sortedResult);
        setQaList(sortedResult);
        updateMaxOrder(maxOrder)
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
        {qaList.map((element, index) => (
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
                // getOrder={getOrder}
                handleUpdate={handleUpdate}
                draggableProps={provided.draggableProps}
                innerRef={provided.innerRef}
                dragHandleProps={provided.dragHandleProps}
              />
            )}
          </Draggable>
        ))}
      </>
    );
  }
}

export function addQnA(handleUpdate, getMaxOrder) {
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
  const data = { question: "", answer: "", order: getMaxOrder() + 1 };
  console.log("data: ", data);
  fetchProps.body = JSON.stringify(data);

  fetch(url + "api/q_and_a/", fetchProps)
    .then((res) => res.json())
    .then((result) => {
      handleUpdate(result);
      console.log("add result: ", result);
    })
    .catch((error) => {
      console.log(error);
    });
  return true;
}

export function copyQnA(qnaToCopy, handleUpdate) {
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

  const data = { question: qnaToCopy.question, answer: qnaToCopy.answer, order: qnaToCopy.order + 1 };
  console.log("data: ", data);
  fetchProps.body = JSON.stringify(data);

  fetch(url + "api/q_and_a/", fetchProps)
    .then((res) => res.json())
    .then((result) => {
      handleUpdate(result);
      console.log("copy result: ", result);
    })
    .catch((error) => {
      console.log(error);
    });
  return true;
}

export function saveQnA(element, id, content, handleUpdate) {
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
      handleUpdate();
      console.log("save result: ", result);
    })
    .catch((error) => {
      console.log(error);
    });
  return true;
}

export function deleteQnA(id, handleUpdate) {
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
    .then(() => handleUpdate())
    .catch((error) => {
      console.log(error);
    });
  return true;
}

export default QnA;
