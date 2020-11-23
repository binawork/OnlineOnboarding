// import React, { useState, useEffect } from "react";
// import { Draggable } from "react-beautiful-dnd";
import { getPath, getCookie } from "../utils.js";
// import FormSection from "../FormsEdit/FormSection";
import "regenerator-runtime/runtime.js";

const BASE_URL = getPath();

const FormSectionsAPI = {
  getAllTimeboxes: async function (pageID) {
    const response = await makeRequest(
      `${BASE_URL}api/section/${pageID}/list_by_page_hr/`,
      "GET"
    );
    // const sections = await response.json();
    return response;
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
  return response.json();
}
// export function addSection(sectionType, pageId, updateSections, maxOrder) {
//   const url = getPath();
//   const token = getCookie("csrftoken");
//   const fetchProps = {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       "X-CSRFToken": token,
//     },
//     body: null,
//   };
//   const data = { order: maxOrder + 1, title: "Tytuł", description: "", link: "", data: null, type: sectionType, page: pageId, answer_set: [{data: "Odpowiedź", owner: 1, section: 2}] };

//   fetchProps.body = JSON.stringify(data);

//   fetch(url + "api/section_answers/", fetchProps)
//     .then((res) => res.json())
//     .then((result) => {
//       console.log("add result: ", result);
//       updateSections(result);
//     })
//     .catch((error) => {
//       console.log(error.message);
//     });
//   return true;
// }

// export function copySection(sectionToCopy, sections, updateSections) {
//   const url = getPath();
//   const token = getCookie("csrftoken");
//   const fetchProps = {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       "X-CSRFToken": token,
//     },
//     body: null,
//   };

//   const data = {
//     order: sectionToCopy.order + 1,
//     title: sectionToCopy.title,
//     description: sectionToCopy.description,
//     link: "",
//     type: sectionToCopy.type,
//     data: null,
//     page: sectionToCopy.page,
//     answers_set: sectionToCopy.answers,
//   };
//   fetchProps.body = JSON.stringify(data);
//   console.log(fetchProps.body)

//   fetch(url + "api/section_answers/", fetchProps)
//     .then((res) => res.json())
//     .then((result) => {
//       sections.map((item) => {
//         if (item.order >= sectionToCopy.order + 1) {
//           fetchProps.method = "PATCH";
//           fetchProps.body = JSON.stringify({ order: item.order + 1 });

//           fetch(url + "api/section_answers/" + item.id + "/", fetchProps).catch(
//             (error) => {
//               console.log(error);
//             }
//           );
//         }
//       });
//       updateSections(result);
//     })
//     .catch((error) => {
//       console.log(error);
//     });

//   return true;
// }

// export function updateSection(element, id, content, updateSections, setSaved) {
//   if (
//     typeof content !== "string" ||
//     (typeof content === "string" && content.length < 1)
//   )
//     return false;

//   const url = getPath();
//   const token = getCookie("csrftoken");
//   const fetchProps = {
//     method: "PATCH",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       "X-CSRFToken": token,
//     },
//   };
//   const data = {};
//   element === "title" ? (data.title = content) : (data.description = content);

//   fetchProps.body = JSON.stringify(data);

//   fetch(url + "api/section_answers/" + id + "/", fetchProps)
//     .then((res) => res.json())
//     .then((result) => {
//       updateSections(result);
//       setSaved(true);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   return true;
// }

// export function deleteSection(id, sections, updateSections) {
//   console.log(2)
//   const url = getPath();
//   const token = getCookie("csrftoken");
//   const fetchProps = {
//     method: "DELETE",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       "X-CSRFToken": token,
//     },
//   };

//   fetch(url + "api/section_answers/" + id, fetchProps)
//     .then((res) => res.text())
//     .then((result) => {
//       updateSections();
//       console.log('del result', result)

//       let order = 0;
//       sections.map((item) => {
//         if (item.id !== id) {
//           order += 1;
//           item.order = order;
//           fetchProps.method = "PATCH";
//           fetchProps.body = JSON.stringify(item);

//           fetch(url + "api/section_answers/" + item.id + "/", fetchProps)
//             // .then((res) => res.json())
//             // .then((result) => {
//             //   // updateSections(result);
//             // })
//             .catch((error) => {
//               console.log(error.message);
//             });
//         }
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   return true;
// }

// export function saveSections(sections) {
//   console.log("zapisywanie")
//   const url = getPath();
//   const token = getCookie("csrftoken");
//   const fetchProps = {
//     method: "PUT",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       "X-CSRFToken": token,
//     },
//     body: JSON.stringify(sections),
//   };
//   // fetchProps.body = JSON.stringify(sections);

//   fetch(url + "api/section_answers/", fetchProps)
//     .then((res) => res.json())
//     .then((result) => {
//       console.log('save result', result)
//     })
// }

// export function dndFormSections(
//   sections,
//   droppedSection,
//   destinationSection,
//   updateSections
// ) {
//   const url = getPath();
//   const token = getCookie("csrftoken");
//   const fetchProps = {
//     method: "PATCH",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       "X-CSRFToken": token,
//     },
//     body: null,
//   };
//   const droppedData = { order: destinationSection.order };
//   fetchProps.body = JSON.stringify(droppedData);

//   fetch(url + "api/section_answers/" + droppedSection.id + "/", fetchProps)
//     .then((res) => res.json())
//     .then((result) => {
//       console.log('dnd result', result)
// //       sections.map((item) => {
// //         if (
// //           (item.order >= destinationSection.order &&
// //             item.order < droppedSection.order &&
// //             item.id !== droppedSection.id) ||
// //           (item.order <= destinationSection.order &&
// //             item.order > droppedSection.order &&
// //             item.id !== droppedSection.id)
// //         ) {
// //           const newOrder =
// //             droppedSection.order > destinationSection.order
// //               ? item.order + 1
// //               : item.order - 1;
// //           fetchProps.body = JSON.stringify({ order: newOrder });

// //           fetch(url + "api/section_answers/" + item.id + "/", fetchProps)
// //             .then((res) => res.json())
// //             .then((response) => {
// //               updateSections(response);
// //             })
// //             .catch((error) => {
// //               console.log(error);
// //             });
// //         }
// //       });
//     })
//     .catch((error) => {
//       console.log(error);
//     });

//   return true;
// }
