import { getPath, getCookie } from "../utils.js";
import "regenerator-runtime/runtime.js";

const BASE_URL = getPath();

const FormSectionsAPI = {
  getAllSections: async function (pageID) {
    const sections = await makeRequest(
      `${BASE_URL}api/section/${pageID}/list_by_page_hr/`,
      "GET"
    );
    const response = await sections.json();
    return response;
  },
  getAllAnswers: async function () {
    const answers = await makeRequest(`${BASE_URL}api/answer`, "GET");
    const response = await answers.json();
    return response;
  },
  deleteSection: async function (idToDelete) {
    if (!idToDelete) {
      throw new Error("Section has to have an id to be deleted");
    }
    if (typeof idToDelete === "number") {
      await makeRequest(`${BASE_URL}api/section/${idToDelete}`, "DELETE");
      /*await Promise.all(
        answers.map((answer) => {
          if (
            (typeof answer.id === "number" && answer.section === idToDelete) ||
            answer.section === null
          ) {
            makeRequest(`${BASE_URL}api/answer/${answer.id}`, "DELETE");
          }
        })
      );*/
    }
  },
  deleteAnswer: async function (idToDelete) {
    if (!idToDelete) {
      throw new Error("Answer has to have an id to be deleted");
    }
    if (typeof idToDelete === "number") {
      await makeRequest(`${BASE_URL}api/answer/${idToDelete}`, "DELETE");
    }
  },
  saveAnswers: async function (answers) {
    await Promise.all(
      answers.map((answer) => {
        makeRequest(`${BASE_URL}api/answer/${answer.id}/`, "PATCH", {
          data: answer.data,
        });
      })
    );
  },
  saveAll: async function (sections, updateSectionsCallback) {
    //Save sections
    const sectionsSaveResult = await Promise.all(
      sections.map((section) =>
        typeof section.hasOwnProperty('isNew') && section.isNew === true
          ? makeRequest(`${BASE_URL}api/section/`, "POST", section)
              .then((res) => res.json())
              .then((result) => {
                const savedSection = result;
                return savedSection;
              })
          : makeRequest(
              `${BASE_URL}api/section/${section.id}/`,
              "PATCH",
              section
            )
              .then((res) => res.json())
              .then((result) => {
                const savedSection = result;
                return savedSection;
              })
      )
    );

    /*await*/ updateSectionsCallback(sectionsSaveResult);
    return sectionsSaveResult;
  },
};

export default FormSectionsAPI;

async function makeRequest(url, method, body) {
  const jsonBody = body ? JSON.stringify(body) : undefined;
  const response = await fetch(url, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"),
    },
    body: jsonBody,
  });
  if (!response.ok) {
    throw new Error("Wystąpił błąd");
  }
  return response;
}
