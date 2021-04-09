import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import EmployeeFormPagesAPI from "../../hooks/EmployeeFormPagesAPI";
import EmployeeFormPagesList from "./EmployeeFormPagesList";
import { getProgress } from "../../hooks/EmployeeForms";


const EmployeeFormPages = ({ switchPage, actualPackageId, userId }) => {
  const [pagesList, setPagesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [progress, setProgress] = useState({});


  const progressCallback = function(result, message){
    if(typeof message === 'string' && message.length > 0){
      setProgress(false);
      return;
    }

    let progressForActualPackage = {}, packageId = parseInt(actualPackageId, 10);
    if(result.hasOwnProperty(packageId) )
      progressForActualPackage = result[packageId];
    setProgress(progressForActualPackage);
  };

  useEffect(() => {
    EmployeeFormPagesAPI.getPages(actualPackageId)
      .catch((error) => setErrorMessage(error.message))
      .then((pages) => {
        setPagesList(pages);
        if(userId)
          getProgress(userId, progressCallback);
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
                      switchPage={ switchPage }
                      progress={ progress }
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
