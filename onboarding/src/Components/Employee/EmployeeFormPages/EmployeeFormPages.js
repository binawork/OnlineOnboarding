import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import PropTypes from "prop-types";
import EmployeeFormPagesAPI from "../../hooks/EmployeeFormPagesAPI";
import EmployeeFormPagesList from "./EmployeeFormPagesList";
import PageAddressBar from "../../PageAddressBar";
import { singleCombo } from "../../hooks/Packages";

const EmployeeFormPages = ({ setPage }) => {
  const [pagesList, setPagesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { package_id:packageId } = useParams();
  let packageObj = singleCombo(packageId);

  useEffect(() => {
    EmployeeFormPagesAPI.getPages(packageId)
      .catch((error) => setErrorMessage(error.message))
      .then((pages) => {
        setPagesList(pages);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-inner">
      <PageAddressBar page={ `Katalog: ${packageObj?.title || ""}`} />
      <div className="page-section">
        <div className="card card-fluid">
          <div className="card-header">Lista formularzy</div>
          <div className="card-body">
            <table className="table table-striped table-hover">
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
                    pagesList={ pagesList }
                    setPage={ setPage }
                  />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

EmployeeFormPages.propTypes = {
  setPage: PropTypes.func.isRequired,
};

export default EmployeeFormPages;
