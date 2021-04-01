import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import { getEmployeesSectionsAndAnswers } from "../hooks/EmployeeForms";
import OpenAnswer from "./OpenAnswer";
import SectionAnswers from "./SectionAnswers";
//import PropTypes from "prop-types";


function EmployeeAnswers({ pageId, employeeId }){
    const [sectionsAnswers, setSectionsAnswers] = useState({sections: [], answers: [], answers_cp: []});
    const [loadingMessage, setMessage] = useState("Ładowanie...");
    const [sectionsView, setView] = useState([]);

    /*const setErrorMessage = function(message){
        setMessage({message: message, print: true});
    };*/

    const showSectionsAnswers = (sectionsAnswersResult, areSaved, employeeDidAnswer) => {
        if(typeof sectionsAnswersResult.sections === 'undefined' || sectionsAnswersResult.sections === null ||
           typeof sectionsAnswersResult.answers === 'undefined' || sectionsAnswersResult.answers === null){
            setMessage("Miał miejsce błąd w pobieraniu formularza!");
            setView([]);
            return;
        }

        setSectionsAnswers(sectionsAnswersResult);

        const areAnswered = areSaved & employeeDidAnswer;
        let newSectionsView = [],
            sections = sectionsAnswersResult.sections.sort((a,b) => a.order - b.order),
            i, count = Math.min(sectionsAnswersResult.sections.length, sectionsAnswersResult.answers.length);

        for(i = 0; i < count; i++){
            newSectionsView.push(
                <section key={ i } className="card my-3">
                    <header className="card-header">
                        <div>{sections[i].title}</div>
                    </header>
                    { sections[i].description && <div className="card-body">{ parse(sections[i].description) }</div> }
                    <div className="card-body">
                        <p><i>
                            <small>
                                {sections[i].type == "oa"
                                    ? "Pytanie otwarte"
                                    : sections[i].type == "osa"
                                        ? "Jednokrotny wybór"
                                        : sections[i].type == "msa"
                                            ? "Wielokrotny wybór"
                                            : ""
                                }
                            </small>
                        </i></p>
                        {sections[i].type == "oa" ? (
                            <OpenAnswer data={ sectionsAnswersResult.answers.find(a => a.section === sectionsAnswersResult.sections[i].id)?.data } />
                        ) : (
                            <SectionAnswers sectionData={ sections[i].data }
                                            answerData={ sectionsAnswersResult.answers.find(a => a.section === sectionsAnswersResult.sections[i].id)?.data }
                                            sectionType={ sections[i].type }
                                            employeeDidAnswer={ areAnswered } />
                        )}
                    </div>
                </section>
            );
        }

        setView(newSectionsView);

        if(!areAnswered)
            setMessage("Pracownik jeszcze nie odpowiedział na pytania");
        else
            setMessage("");
    };


    useEffect(() => {
        if(typeof employeeId === 'undefined' || employeeId === null ||
            employeeId < 1 || employeeId === false){
            setMessage("Nie zdefiniowano pracownika!");
        } else {
            getEmployeesSectionsAndAnswers(pageId, employeeId, setMessage, showSectionsAnswers);
            //return () => clearInterval(requestInterval);
        }
    }, [pageId]);


    return (
      <>
        { loadingMessage.length > 0 &&
            <div className="card card-fluid text-black bg-warning">
                <div className="card-body"><div className="p-3">{ loadingMessage }</div></div>
            </div>
        }
        { sectionsView.length > 0 && sectionsView }
      </>
    );
}

/*EmployeeAnswers.propTypes = {
};*/

export default EmployeeAnswers;

