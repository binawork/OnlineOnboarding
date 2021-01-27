import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import EmployeeFormPagesAPI from "../../hooks/EmployeeFormPagesAPI";
import EmployeeFormPagesList from "./EmployeeFormPagesList";

const EmployeeFormPages = ({ switchPage, actualPackageId }) => {
  const [pagesList, setPagesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    EmployeeFormPagesAPI.getPages(actualPackageId)
      .catch((error) => setErrorMessage(error.message))
      .then((pages) => {
        setPagesList(pages);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <div className="page-inner">
        <div className="page-section">
          <div className="card card-fluid">
            <div className="card-header">Lista formularzy</div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "50%" }}>
                      Nazwa formularza
                    </th>
                  </tr>
                </thead>
                <tbody id="form_table_data_container">
                  {loading ? (
                    <tr>
                      <td>Ładowanie...</td>
                    </tr>
                  ) : errorMessage ? (
                    <tr>
                      <td>{ errorMessage }</td>
                    </tr>
                  ) : (
                    <EmployeeFormPagesList
                      pagesList={pagesList}
                      switchPage={switchPage}
                    />
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EmployeeFormPages.propTypes = {
  switchPage: PropTypes.func.isRequired,
  actualPackageId: PropTypes.number.isRequired,
};

export default EmployeeFormPages;
