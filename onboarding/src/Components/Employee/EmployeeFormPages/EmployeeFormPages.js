import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import PropTypes from "prop-types";
import EmployeeFormPagesList from "./EmployeeFormPagesList";
import PageAddressBar from "../../PageAddressBar";
import EmployeeFormPagesAPI from "../../hooks/EmployeeFormPagesAPI";
import { getProgress } from "../../hooks/EmployeeForms";
import { singleCombo } from "../../hooks/Packages";
import "../../../static/css/FormTable.scss";
import bookIcon from "../../../static/icons/book.svg";

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
      <PageAddressBar page={ `${packageObj?.title || ""}`} />
      <div className="page-section">
        <section className="FormPackageEdit">
          <div className="FormPackageEdit__content-wrapper">
            <div className="FormPackageEdit__header-wrapper">
              <img className="FormPackageEdit__icon" src={bookIcon} alt="#" />
              <header className="FormPackageEdit__header">
                {packageObj?.title}
              </header>
            </div>
          </div>
          <div className="FormPackageEdit__description-wrapper">
            <i className="FormPackageEdit__description">
              {packageObj?.description && packageObj.description}
            </i>
          </div>
        </section>

        <section className="FormTable-wrapper FormTable-wrapper--arrow">
          <header className="FormTable-wrapper__header-wrapper">
            <p className="FormTable-wrapper__header">
              <i>Lista rozdziałów</i>
            </p>
          </header>
          <hr className="FormTable-wrapper__line" />
          <div className="table-responsive">
            <table className="FormTable table table-striped table-hover">
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
        </section>
      </div>
    </div>
  );
};

EmployeeFormPages.propTypes = {
  setPage: PropTypes.func.isRequired,
};

export default EmployeeFormPages;
