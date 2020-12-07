import React from "react";
import PropTypes from "prop-types";

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

EmployeeFormPagesList.propTypes = {
  switchPage: PropTypes.func.isRequired,
  pagesList: PropTypes.array,
};

export default EmployeeFormPagesList;
