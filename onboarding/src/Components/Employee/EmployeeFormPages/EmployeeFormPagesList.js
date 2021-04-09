import React from "react";
import PropTypes from "prop-types";
import ProgressBar from "../../ProgressBar";


const EmployeeFormPagesList = ({ pagesList, switchPage, progress }) => {
  const moveToForm = (page) => {
    let pageProgress = {}, pageId = parseInt(page.id, 10);
    if(progress.hasOwnProperty("pages") && progress.pages.hasOwnProperty(pageId) ){
      pageProgress = progress.pages[pageId];
    }


    switchPage(page, pageProgress);
  };
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
          <a href="#" onClick={(e) => moveToForm(page)}>
            {page.title}
          </a>
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
  switchPage: PropTypes.func.isRequired,
  pagesList: PropTypes.array,
};

export default EmployeeFormPagesList;
