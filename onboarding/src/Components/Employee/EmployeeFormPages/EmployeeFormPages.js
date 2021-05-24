import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import PropTypes from "prop-types";
import EmployeeFormPagesList from "./EmployeeFormPagesList";
import PageAddressBar from "../../PageAddressBar";
import EmployeeFormPagesAPI from "../../hooks/EmployeeFormPagesAPI";
import { getProgress } from "../../hooks/EmployeeForms";
import { singleCombo } from "../../hooks/Packages";


const EmployeeFormPages = ({ setPage, userId }) => {
  const [pagesList, setPagesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [progress, setProgress] = useState(false);
  const { package_id:packageId } = useParams();
  let packageObj = singleCombo(packageId);


  const progressCallback = function(result, message){
    if(typeof message === 'string' && message.length > 0){
      setProgress(false);
      return;
    }

    let progressForActualPackage = {};
    if(result.hasOwnProperty(packageId) )
      progressForActualPackage = result[packageId];
    setProgress(progressForActualPackage);
  };

  useEffect(() => {
    EmployeeFormPagesAPI.getPages(packageId)
      .catch((error) => setErrorMessage(error.message))
      .then((pages) => {
        setPagesList(pages);
      })
      .finally(() => setLoading(false));
  }, [packageId]);

  useEffect(() => {
    //if(userId)
      getProgress(userId, progressCallback);
  }, [packageId]);


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
                    progress={ progress }
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
