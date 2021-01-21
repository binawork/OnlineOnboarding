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
        console.log(sectionsAnswersResult);
        //let newSectionsView = [];
        //setSectionsAnswers(sectionsAnswersResult);


        if(!employeeDidAnswer)
            setMessage({message: "Pracownik jeszcze nie odpowiedział na pytania", print: true});
        else
            setMessage({message: "Pobrano", print: true});
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
      <>
        { loadingMessage.print &&
            <div className="card card-fluid">
                <div className="card-body"><div className="p-3">{ loadingMessage.message }</div></div>
            </div>
        }
        <div className="card card-fluid">{ sectionsView.length > 0 &&
            sectionsView
        }</div>
      </>
    );
}

/*EmployeeAnswers.propTypes = {
};*/

export default EmployeeAnswers;
