import React, { useState, useEffect } from "react";
import { getEmployeesSectionsAndAnswers } from "../hooks/EmployeeForms";
//import PropTypes from "prop-types";


function EmployeeAnswers(props){
    const [sectionsAnswers, setSectionsAnswers] = useState({sections: [], answers: [], answers_cp: []});
    const [loadingMessage, setMessage] = useState({message: "Ładowanie...", print: true});
    const [sectionsView, setView] = useState([]);


    const setErrorMessage = function(message){
        setMessage({message: message, print: true});
    };

    const showSectionsAnswers = (sectionsAnswersResult, employeeDidAnswer) => {
        console.log(employeeDidAnswer);
        console.log(sectionsAnswersResult);
        //let newSectionsView = [];
        setMessage({message: "Pobrano", print: true});
        //setSectionsAnswers(sectionsAnswersResult);
    };


    useEffect(() => {
        if(typeof props.employeeId === 'undefined' || props.employeeId === null ||
            props.employeeId < 1 || props.employeeId === false){
            setMessage({message: "Nie zdefiniowano pracownika!", print: true});
        } else {
            getEmployeesSectionsAndAnswers(props.pageId, props.employeeId, setErrorMessage, showSectionsAnswers);
            //return () => clearInterval(saveInterval);
        }
    }, [props.pageId]);


    return (
      <div className="card card-fluid">
        { loadingMessage.print ? (
            <div className="p-3">{ loadingMessage.message }</div>
        ) : (
            sectionsView
        ) }
      </div>
    );
}

/*EmployeeAnswers.propTypes = {
};*/

export default EmployeeAnswers;
