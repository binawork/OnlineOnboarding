import React, { useState, useEffect } from "react";
import EmployeeFormPagesAPI from "../../hooks/EmployeeFormPagesAPI";
import EmployeeFormPagesList from "./EmployeeFormPagesList";

const EmployeeFormPages = ({ switchPage, actualPackage }) => {
  const [pagesList, setPagesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    EmployeeFormPagesAPI.getPages(actualPackage)
      .catch((error) => setError(error.message))
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
            <div className="card-header">Lista Stron</div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "50%" }}>
                      Nazwa strony
                    </th>
                  </tr>
                </thead>
                <tbody id="form_table_data_container">
                  {loading ? (
                    <tr>
                      <td>Ładowanie...</td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td>{error}</td>
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
export default EmployeeFormPages;
