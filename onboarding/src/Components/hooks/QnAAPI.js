import React, { useState, useEffect, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import { getPath, getCookie } from "../utils.js";
import QnA from "../QnA/QnA";

const url = getPath();
const token = getCookie("csrftoken");

const QnAAPI = ({
  qaList,
  maxOrder,
  setQaList,
  count,
  handleUpdate,
  setMaxOrder,
  editMode,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // const [fetchedList, setFetchedList] = useState([]);

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
        setLoading(false);
        const sortedResult = result.sort((a, b) => a.order - b.order);
        const orders = result
          .map((i) => i.order)
          .filter((i) => i >= 0 && typeof i === "number");
        console.log("orders", orders);
        console.log("get result: ", sortedResult);
        // setFetchedList(sortedResult);
        setQaList(sortedResult);
        setMaxOrder(orders[orders.length - 1]);
      })
      .catch((error) => {
        console.log(error.message);
        setError(true);
      });
  }, [count]);

  const questionsAndAnswers = qaList.map((element, index) =>
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
            handleUpdate={handleUpdate}
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
        id={element.id}
        question={element.question}
        answer={element.answer}
        order={element.order}
        qaList={qaList}
        editMode={editMode}
      />
    )
  );

  if (error) return <div>Nie udało się załadować Q&A</div>;
  if (loading) {
    return <div>Ładowanie...</div>;
  } else {
    return <>{questionsAndAnswers}</>;
  }
};

export function addQnA(handleUpdate, maxOrder) {
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
      handleUpdate();
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
      let order = 0;
      qaList.map((item) => {
        if (item.id !== id) {
          order = order + 1;
          fetchProps.method = "PATCH";
          fetchProps.body = JSON.stringify({ order: order });

          fetch(url + "api/q_and_a/" + item.id + "/", fetchProps)
            // .then(() => handleUpdate())
            .catch((error) => {
              console.log(error);
            });
        }
      });
      handleUpdate();
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
  const fetchProps = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": token,
    },
    body: null,
  };

  fetchProps.body = JSON.stringify({ order: destinationSection.order });
  fetch(url + "api/q_and_a/" + droppedSection.id + "/", fetchProps)
    .then(() => {
      qaList.map((item) => {
        if (
          (item.order >= destinationSection.order &&
            item.order < droppedSection.order) ||
          (item.order <= destinationSection.order &&
            item.order > droppedSection.order)
        ) {
          const newOrder =
            droppedSection.order > destinationSection.order
              ? item.order + 1
              : item.order - 1;

          fetchProps.body = JSON.stringify({ order: newOrder });

          fetch(url + "api/q_and_a/" + item.id + "/", fetchProps).catch(
            (error) => {
              console.log(error);
            }
          );
        }
        return item;
      });
      handleUpdate();
    })
    .catch((error) => {
      console.log(error);
    });

  return true;
}

export function saveQnaSet(qaList) {
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
  return true;
}

export default QnAAPI;
