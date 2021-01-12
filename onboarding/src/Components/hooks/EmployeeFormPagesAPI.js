import { getPath, getCookie } from "../utils.js";
import "regenerator-runtime/runtime.js";

const BASE_URL = getPath();

const EmployeeFormPagesAPI = {
  getPages: async function (packageId) {
    const pages = await makeRequest(
      `${BASE_URL}api/page/${packageId}/list_by_package_employee/`,
      "GET"
    );
    const response = await pages.json();
    return response.sort((a, b) => a.order - b.order);
  },
};

export default EmployeeFormPagesAPI;

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
