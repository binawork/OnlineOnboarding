import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ProgressBar from "../../ProgressBar";
import bookOpenedIcon from "../../../static/icons/book-opened.svg";

const EmployeeFormPagesList = ({ pagesList, setPage, progress }) => {
  // const notStartedMsg = "Nie rozpoczęte", inProgressMsg = "W trakcie", finishedMsg = "Skończone";

  const pages = pagesList.map((page) => {
    let progressForPage = <ProgressBar backgroundSize={ "0%" } />, 
        // progressMsg = "Nie pobrano",
        pageId = parseInt(page.id, 10);

    page = {...page, saved: false, isFinished: false, isChecked: progress !== false, readOnly: true};
    // if(page.isChecked)
    //     progressMsg = <small className="ml-1">{ notStartedMsg }</small>

    if(progress.hasOwnProperty("pages") ){
      progressForPage = <ProgressBar color="blue" backgroundSize={ "0%" } />
      // progressMsg = <small className="ml-1">{ notStartedMsg }</small>

      let localPage, percentage;//, finishMsg = notStartedMsg;
      if(progress.pages.hasOwnProperty(pageId) ){
        localPage = progress.pages[pageId];
        page.saved = true;

        if(localPage.finished){
          percentage = "100%";
          // finishMsg = finishedMsg;
          progressForPage = <ProgressBar color="blue" backgroundSize={percentage} />
          // progressMsg = <small className="ml-1">{finishedMsg}</small>
          page.isFinished = true;
          // } else {
          //   percentage = "50%";
          //   // finishMsg = inProgressMsg;
          //   progressForPage = <ProgressBar color={"yellow"} backgroundSize={percentage} />
          //   progressMsg = <small className="ml-1">{inProgressMsg}</small>
          //   page.readOnly = false;
        }

      }

    }

    return (
      <tr className="FormTable__row" key={page.id}>
        <td className="FormTable__data FormTable__data--icon pr-0">
          <img className="FormTable__icon" src={bookOpenedIcon} alt="#" />

        </td>
        <td className="FormTable__data FormTable__data--name">
          <Link to={`/form/${page.id}`} onClick={() => setPage(page)}>
            {page.title}
          </Link>
        </td>
        <td className="FormTable__data FormTable__data--progress">
          {progressForPage}
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

