import React, { useState } from "react";
//import PropTypes from "prop-types";


function EmployeeAnswers(props){
  const [loadingMessage, setMessage] = useState({message: "Ładowanie...", print: true});


  return (
      <div className="card card-fluid">
        { loadingMessage.print ? (
            <div className="p-3">{ loadingMessage.message }</div>
        ) : (
            <></>
        ) }
      </div>
  );
}

/*EmployeeAnswers.propTypes = {
};*/

export default EmployeeAnswers;
