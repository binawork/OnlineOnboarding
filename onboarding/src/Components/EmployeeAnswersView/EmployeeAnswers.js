import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import { getEmployeesSectionsAndAnswers } from "../hooks/EmployeeForms";
import OpenAnswer from "./OpenAnswer";
import SectionAnswers from "./SectionAnswers";
//import PropTypes from "prop-types";


function EmployeeAnswers(props){
    const [sectionsAnswers, setSectionsAnswers] = useState({sections: [], answers: [], answers_cp: []});
    const [loadingMessage, setMessage] = useState({message: "Ładowanie...", print: true});
    const [sectionsView, setView] = useState([]);


    const setErrorMessage = function(message){
        setMessage({message: message, print: true});
    };

    const showSectionsAnswers = (sectionsAnswersResult, employeeDidAnswer) => {
        if(typeof sectionsAnswersResult.sections === 'undefined' || sectionsAnswersResult.sections === null ||
           typeof sectionsAnswersResult.answers === 'undefined' || sectionsAnswersResult.answers === null){
             setMessage({message: "Miał miejsce błąd w pobieraniu formularza!", print: true});
             setView([]);
         }


        setSectionsAnswers(sectionsAnswersResult);

        let newSectionsView = [], sections = sectionsAnswersResult.sections,
            i, count = Math.min(sectionsAnswersResult.sections.length, sectionsAnswersResult.answers.length);
        for(i = 0; i < count; i++){
            newSectionsView.push(<section key={ i } className="card my-3">
                        <header className="card-header">
                            <div>{sections[i].title}</div>
                        </header>
                        { sections[i].description && <div className="card-body">{ parse(sections[i].description) }</div> }
                        <div className="card-body">
                            {sections[i].type == "oa" ? (
                                <OpenAnswer data={ sectionsAnswersResult.answers[i].data } />
                            ) : (
                                // todo: list of options and answers;
                                <SectionAnswers />
                            )}
                        </div>
            </section>);
        }

        setView(newSectionsView);

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
