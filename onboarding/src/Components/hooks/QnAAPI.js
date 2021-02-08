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

  fetch(url + "api/q_and_a/list_by_company/", fetchProps)
    .then((res) => res.json())
    .then((result) => {
      const orders = result
        .map((i) => i.order)
        .filter((i) => i >= 0 && typeof i === "number");
      setMaxOrder(result.length !== 0 ? orders[orders.length - 1] : 0);
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

export function saveAll(qaList, setSaveError) {
  const fetchProps = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": token,
    },
  };

  const updatedQaList = qaList.map((qa) => {
    if (typeof qa.id === "number") {
      fetchProps.method = "PUT";
      fetchProps.body = JSON.stringify(qa);

      fetch(url + "api/q_and_a/" + qa.id + "/", fetchProps)
        .then(res => {
          if(!res.ok) {
            throw Error("Nie udało się zapisać zmian, może to być spowodowane wprowadzeniem zbyt długiej treści");
          }
        })
        .catch((error) => {
          setSaveError(error.message);
        })
    } else if (typeof qa.id === "string") {
      fetchProps.method = "POST";
      fetchProps.body = JSON.stringify({
        question: qa.question,
        answer: qa.answer,
        order: qa.order,
      });

      fetch(url + "api/q_and_a/", fetchProps)
        .then(res => {
          if(!res.ok) {
            throw Error("Nie udało się zapisać zmian, może to być spowodowane wprowadzeniem zbyt długiej treści");
          }
          return res.json();
        })
        .catch((error) => {
          setSaveError(error.message);
        })
        .then((addedQa) => {
          qa.id = addedQa.id;
        });
      }
      return qa;
    });
  return updatedQaList;
}
