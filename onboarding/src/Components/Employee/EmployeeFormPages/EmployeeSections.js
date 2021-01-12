import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import SectionForm from "./SectionForm";
import OpenAnswer from "./OpenAnswer";
//import EmployeeAnswerRow from "./EmployeeAnswerRow";
import { sendEmployeesAnswers, getEmployeesSectionsAndAnswers } from "../../hooks/EmployeeForms";
//import FormSectionsAPI from "../../hooks/FormSectionsAPI";
import ModalWarning from "../../ModalWarning";


const EmployeeSections = ({pageId}) => {
    const [sectionsAnswers, setSectionsAnswers] = useState({sections: [], answers: [], answers_cp: []});
    const [message, setMessage] = useState("");
    const [loading, isLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [sectionsView, setView] = useState({view: [], init: false});
    const [confirmationModal, setModal] = useState({id: 0, modal: <></>});


    useEffect(() => {
        getEmployeesSectionsAndAnswers(pageId, setErrorMessage, function(result){
            //console.log(result);
            isLoading(false);
            setSectionsAnswers(result);
        });
        /*getEmployeesAnswersForSections(sectionsAnswers.sections).then(function(answersForms){
            setSectionsAnswers({...sectionsAnswers, answers: answersForms.answers, answers_cp: answersForms.answers_cp});
        }).catch((error) => setErrorMessage(error.message));*/
    }, [pageId]);


    /*const toggleChecked = (e) => {
        const toggle = answers.map((answer) => {
            if(
                e.target.type === "radio" &&
                answer.section == e.target.name.slice(8)
            ){
                answer.id == e.target.id
                    ? (answer.data.is_checked = true)
                    : (answer.data.is_checked = false);
            } else if(answer.id == e.target.id)
                answer.data.is_checked = !answer.data.is_checked;
            return answer;
        });
        setAnswers(toggle);
    };*/

    const changeOpenAnswerText = (index, value) => {
        sectionsAnswers.answers[index].data = value;
        console.log(sectionsAnswers.answers);
        /*setAnswers(updatedAnswers);*/
    };

    const setAnswer = function(ind, value){
        if(ind < 0 || ind >= sectionsAnswers.answers.length)
            return;

        sectionsAnswers.answers[ind].data = value;
    };

    const saveAnswers = (e) => {
        e.preventDefault();console.log(sectionsAnswers);
        let i, count = Math.min(sectionsAnswers.sections.length, sectionsAnswers.answers.length);
        let answersToSend = [], element;

        for(i = 0; i < count; i++){
            element = {sectionId: -1, data: "", answerId: -1};
            element.sectionId = sectionsAnswers.sections[i].id;
            element.data = sectionsAnswers.answers[i].data;
            if(sectionsAnswers.answers[i].id)
                element.answerId = sectionsAnswers.answers[i].id;

            answersToSend.push(element);
        }

        sendEmployeesAnswers(answersToSend, sendingSectionAnswerResponse);
    };


    const sendingSectionAnswerResponse = function(sectionId, isSuccess){
        // sectionsAnswers.sections = [{id:sectionId, title: "", ...}, ...]
        let i = sectionsAnswers.sections.length - 1, msgAppend = "\nWysyłanie odpowiedzi dla ";
        for(; i >= 0; i--){
            if(sectionsAnswers.sections[i].id === sectionId){
                msgAppend += "\"" + sectionsAnswers.sections[i].title + "\" ";
                break;
            }
        }
        if(isSuccess)
            msgAppend += "udane";
        else
            msgAppend += "nie powiodło się!";

        setMessage(message + msgAppend);
        popUpConfirmationModal();
    };

    const popUpConfirmationModal = () => {
        setModal({
            id: 0,
            modal: (
                <ModalWarning
                    handleAccept={ hideModal }
                    title="Potwierdzenie wysłania"
                    message={ message }
                    id={0}
                    show={true}
                    acceptText="Ok"
                />
            ),
        });
    };

    const hideModal = () => {
        setModal({id: 0, modal: <></>});
    };


    useEffect(() => {
        let sectionsView2 = [];
        if(sectionsAnswers.sections && sectionsAnswers.answers){
            let count = Math.min(sectionsAnswers.sections.length, sectionsAnswers.answers.length), i,
                sections = sectionsAnswers.sections, answers = sectionsAnswers.answers_cp;

            for(i = 0; i < count; i++){
                // to-fix: answers[i] does not give the same element which is listed in answers, console.log(answers, answers[i]);
                sectionsView2.push(<section key={uuidv4()} className="card my-3">
                        <header className="card-header">
                            <div>{sections[i].title}</div>
                        </header>
                        <div className="card-body">
                            {sections[i].description ? parse(sections[i].description): <></>}
                            {sections[i].type == "oa" ? (
                                <OpenAnswer id={ sections[i].id } index={ i } data={ answers[i].data } changeOpenAnswerText={ changeOpenAnswerText } />
                            ) : (
                                <table className="table table-hover"><tbody>
                                    <SectionForm section={ sections[i] }
                                            answerId={ i }
                                            answerData={ answers[i].data } setAnswer={ setAnswer } />
                                </tbody></table>
                            )}
                        </div>
                </section>);
            }
            setView({view: sectionsView2, init: true});
        }
    }, [pageId, loading, sectionsAnswers]);



    return (
        <form onSubmit={ saveAnswers }>
            {loading ? (
                <div className="p-3">Ładowanie...</div>
            ): errorMessage !== "" ? (
                <div className="p-3">{errorMessage}</div>
            ): (
                sectionsView.view
            )}
            <button type="button" className="btn btn-success mr-3">
                Zapisz odpowiedzi
            </button>
            <button type="submit" className="btn btn-success mr-3">
                Wyślij odpowiedzi
            </button>
            {confirmationModal.modal}
        </form>
    );
};

EmployeeSections.propTypes = {
    pageId: PropTypes.number.isRequired,
};

export default EmployeeSections;
