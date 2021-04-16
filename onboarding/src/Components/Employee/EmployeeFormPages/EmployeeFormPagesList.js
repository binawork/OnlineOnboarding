import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ProgressBar from "../../ProgressBar";


const EmployeeFormPagesList = ({ pagesList, setPage, progress }) => {
  const notStartedMsg = "Nie rozpoczęte", inProgressMsg = "W trakcie", finishedMsg = "Skończone";

  const pages = pagesList.map((page) => {
    let progressForPage = <ProgressBar backgroundSize={ "0%" } />, progressMsg = "", pageId = parseInt(page.id, 10);

    if(progress.hasOwnProperty("pages") ){
      progressForPage = <ProgressBar backgroundSize={ "0%" } />
      progressMsg = <small className="ml-1">{ notStartedMsg }</small>

      let page, percentage;//, finishMsg = notStartedMsg;
      if(progress.pages.hasOwnProperty(pageId) ){
        page = progress.pages[pageId];

        if(page.finished){
          percentage = "100%";
          // finishMsg = finishedMsg;
          progressForPage = <ProgressBar color={ "green" } backgroundSize={ percentage } />
          progressMsg = <small className="ml-1">{ finishedMsg }</small>
        } else {
          percentage = "50%";
          // finishMsg = inProgressMsg;
          progressForPage = <ProgressBar color={ "yellow" } backgroundSize={ percentage } />
          progressMsg = <small className="ml-1">{ inProgressMsg }</small>
        }

      }

    }

    return (
      <tr key={page.id}>
        <td>
          <Link to={`/form/${page.id}`} onClick={() => setPage(page)}>
            { page.title }
          </Link>
        </td>
        <td className="form-progress">
          { progressForPage }{ progressMsg }
        </td>
      </tr>
    )
  });


  return <>{pages}</>;
};

EmployeeFormPagesList.propTypes = {
  pagesList: PropTypes.array.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default EmployeeFormPagesList;

