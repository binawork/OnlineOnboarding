import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const EmployeeFormPagesList = ({ pagesList, setPage }) => {
  const pages = pagesList.map((page) => (
    <tr key={ page.id }>
      <td>
        <Link to={`/form/${page.id}`} onClick={() => setPage(page)}>
          { page.title }
        </Link>
      </td>
    </tr>
  ));

  return <>{pages}</>;
};

EmployeeFormPagesList.propTypes = {
  pagesList: PropTypes.array,
  setPage: PropTypes.func,
};

export default EmployeeFormPagesList;
