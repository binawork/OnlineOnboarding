import { getPath, getCookie } from "../utils.js";

const url = getPath();
const token = getCookie("csrftoken");

export function getQnA(setQaList, setMaxOrder, setLoading, setError) {
  const fetchProps = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": "",
    },
  };

  fetch(url + "api/q_and_a/", fetchProps)
    .then((res) => res.json())
    .then((result) => {
      const orders = result
        .map((i) => i.order)
        .filter((i) => i >= 0 && typeof i === "number");

      setMaxOrder(orders[orders.length - 1]);
      setQaList(result);
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setError("Wystąpił błąd podczas ładowania");
      return false;
    });

  return true;
}

export function saveQnA(element, id, content, setSaved) {
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
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      setSaved(true);
    });
}

export function deleteQnA(id) {
  const fetchProps = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": token,
    },
  };
  fetch(url + "api/q_and_a/" + id, fetchProps).catch((error) => {
    console.log(error);
  });
  return true;
}

export function saveAll(qaList) {
  const fetchProps = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": token,
    },
  };

  qaList.map((qa) => {
    if (typeof qa.id === "number") {
      fetchProps.method = "PUT";
      fetchProps.body = JSON.stringify(qa);

      fetch(url + "api/q_and_a/" + qa.id + "/", fetchProps).catch((error) => {
        console.log(error);
      });
      
    } else if (typeof qa.id === "string") {
      fetchProps.method = "POST";
      fetchProps.body = JSON.stringify({
        question: qa.question,
        answer: qa.answer,
        order: qa.order,
      });

      fetch(url + "api/q_and_a/", fetchProps).catch((error) => {
        console.log(error);
      });
    }
  });

  return true;
}
