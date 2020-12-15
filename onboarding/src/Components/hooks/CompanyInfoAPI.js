import { getPath, getCookie } from "../utils.js";
import "regenerator-runtime/runtime.js";

const BASE_URL = getPath();

const CompanyInfoAPI = {
  // getAll: async function () {},
  // delete: async function (idToDelete) {},
  // saveAll: async function () {}
  getCompanyName: async function (companyId) {
    console.log(companyId)
    const company = await makeRequest(
      `${BASE_URL}api/company/${companyId}/`,
      "GET"
    );
    const response = await company.json();
    console.log(response)
    return response.name || "";
  },
};

export default CompanyInfoAPI;

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
