import { getPath, getCookie } from "../utils.js";
import "regenerator-runtime/runtime.js";

const BASE_URL = getPath();

const CompanyInfoAPI = {
  getCompanyInfo: async function (companyId) {
    const company = await makeRequest(
      `${BASE_URL}api/company/${companyId}/`,
      "GET"
    );
    const response = await company.json();
    return response;
  },
  saveCompanyInfo: async function (companyId, logo, mission, link, aboutCompany) {
    if(logo) {
      let data = new FormData();
      data.append("company_logo", logo);

      await makeImageRequest(`${BASE_URL}api/company-logo/`, "POST", data);
    }

    const company = await makeRequest(
      `${BASE_URL}api/company/${companyId}/`,
      "PATCH",
      { mission: mission, link: link, info: aboutCompany }
    );

    const response = await company.json();
    return response;
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
async function makeImageRequest(url, method, body) {
  const token = getCookie("csrftoken");
  const response = await fetch(url, {
    method: method,
    headers: {
      Accept: "application/json",
      "X-CSRFToken": token,
      "Authorization": "Token " + token
    },
    body: body,
  });
  if (!response.ok) {
    throw new Error("Wystąpił błąd podczas zapisywania obrazka");
  }
  return response;
}
