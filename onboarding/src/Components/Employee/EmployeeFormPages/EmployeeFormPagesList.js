import React from "react";

const EmployeeFormPagesList = ({ pagesList, switchPage }) => {
  const moveToForm = (e) => {
    switchPage(e.target.id);
  };

  const pages = pagesList.map((page) => (
    <tr key={page.id}>
      <td>
        <a href="#" onClick={moveToForm} id={page.id}>
          {page.title}
        </a>
      </td>
    </tr>
  ));

  return <>{pages}</>;
};
export default EmployeeFormPagesList;
