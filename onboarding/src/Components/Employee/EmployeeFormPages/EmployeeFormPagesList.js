import React from "react";

const EmployeeFormPagesList = ({ pagesList, switchPage }) => {
  const moveToForm = (page) => {
    switchPage(page);
  };

  const pages = pagesList.map((page) => (
    <tr key={page.id}>
      <td>
        <a href="#" onClick={(e) => moveToForm(page)}>
          {page.title}
        </a>
      </td>
    </tr>
  ));

  return <>{pages}</>;
};
export default EmployeeFormPagesList;
