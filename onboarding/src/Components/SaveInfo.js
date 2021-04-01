import React from "react";
import "../static/css/SaveInfo.scss";

const SaveInfo = ({ message }) => {
  return (
    <div className="SaveInfo fixed-bottom d-flex justify-content-center show-and-hide">
      <div className="SaveInfo__content m-2 p-2 text-center">
        { message ? message : "Zapisano zmiany" }
      </div>
    </div>
  );
};

export default SaveInfo;
