import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import SectionForm from "./SectionForm";
import OpenAnswer from "./OpenAnswer";
import { sendEmployeesAnswers, getEmployeesSectionsAndAnswers, finishEmployeesAnswers } from "../../hooks/EmployeeForms";
import ModalWarning from "../../ModalWarning";


const EmployeeSections = ({pageId, userId}) => {
    const [sectionsAnswers, setSectionsAnswers] = useState({sections: [], answers: [], answers_cp: []});
    const [loadingSaved, isLoadingSaved] = useState({load: true, saved: false});
    const [errorMessage, setErrorMessage] = useState("");
    const [sectionsView, setView] = useState({view: [], init: false});
    const [confirmationModal, setModal] = useState({msg: [""], modal: <></>});


    useEffect(() => {
        getEmployeesSectionsAndAnswers(pageId, userId, setErrorMessage, function(result, areSaved){
            //console.log(result);
            isLoadingSaved({load: false, saved: areSaved});
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
        /* console.log(sectionsAnswers.answers);
        / *setAnswers(updatedAnswers);*/
        isLoadingSaved({...loadingSaved, saved: false});
    };

    const setAnswer = function(ind, value){
        if(ind < 0 || ind >= sectionsAnswers.answers.length)
            return;

        sectionsAnswers.answers[ind].data = value;
        isLoadingSaved({...loadingSaved, saved: false});
    };

    const saveAnswers = (e, anotherResponse) => {
        e.preventDefault();
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

        confirmationModal.msg[0] = "Zapisano odpowiedzi.";
        let sendingResponse = sendingSectionAnswerResponse;
        if(typeof anotherResponse !== 'undefined')
            sendingResponse = anotherResponse;

        sendEmployeesAnswers(answersToSend, sendingResponse);
    };
    const finishAnswers = function(e){
        if(!loadingSaved.saved){
            saveAnswers(e, sendAndFinishResponse);
            return;
        }

        e.preventDefault();
        finishEmployeesAnswers(pageId, function(msg){
                popUpConfirmationModal(msg, false);
            });
    };

    const sendingSectionAnswerResponse = function(sectionId, isSuccess, answerIdResponse){
        // sectionsAnswers.sections = [{id:sectionId, title: "", ...}, ...]
        let i = sectionsAnswers.sections.length - 1, msgAppend = "\nZapisanie odpowiedzi dla ";
        for(; i >= 0 && sectionId > 0; i--){
            if(sectionsAnswers.sections[i].id === sectionId){
                msgAppend += "\"" + sectionsAnswers.sections[i].title + "\" ";
                if( !sectionsAnswers.answers[i].hasOwnProperty('id') )
                    sectionsAnswers.answers[i].id = answerIdResponse;
                break;
            }
        }
        if(isSuccess)
            msgAppend += "udane";
        else
            msgAppend += "nie powiodło się!";

        popUpConfirmationModal(msgAppend, true, "Potwierdzenie zapisania");

        if(!loadingSaved.saved)
            isLoadingSaved({...loadingSaved, saved: true});
    };
    const sendAndFinishResponse = function(sectionId, isSuccess, answerIdResponse){
        let i = sectionsAnswers.sections.length - 1;
        for(; i >= 0 && sectionId > 0; i--){// update info about answers 'id';
            if(sectionsAnswers.sections[i].id === sectionId){
                if( !sectionsAnswers.answers[i].hasOwnProperty('id') )
                    sectionsAnswers.answers[i].id = answerIdResponse;

                break;
            }
        }

        finishEmployeesAnswers(pageId, function(msg){
                popUpConfirmationModal(msg, false);

                if(!loadingSaved.saved)
                    isLoadingSaved({...loadingSaved, saved: true});
            });
    };

    const popUpConfirmationModal = (message, append, title) => {
        if(append)
            confirmationModal.msg.push(message);
        else
            confirmationModal.msg = [message];

        let newMessage = confirmationModal.msg[0], title2 = (title)? title : "Potwierdzenie wysłania";
        // todos: join confirmationModal.msg into text with newlines;

        setModal({
            msg: confirmationModal.msg,
            modal: (
                <ModalWarning
                    handleAccept={ hideModal }
                    title={ title2 }
                    message={ newMessage }
                    id={0}
                    show={true}
                    acceptText="Ok"
                />
            ),
        });
    };

    const hideModal = () => {
        setModal({msg: [""], modal: <></>});
    };


    useEffect(() => {
        let sectionsView2 = [];
        if(sectionsAnswers.sections && sectionsAnswers.answers){
            let count = Math.min(sectionsAnswers.sections.length, sectionsAnswers.answers.length), i,
                sections = sectionsAnswers.sections, answers = sectionsAnswers.answers_cp;

            for(i = 0; i < count; i++){
                sectionsView2.push(<section key={uuidv4()} className="card my-3">
                        <header className="card-header">
                            <div>{sections[i].title}</div>
                        </header>
                        <div className="card-body">
                            {sections[i].description ? parse(sections[i].description): <></>}
                            <p className="mt-2"><i>
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
                                <OpenAnswer id={ sections[i].id } index={ i } data={ answers[i].data } changeOpenAnswerText={ changeOpenAnswerText } />
                            ) : (
                                <table className="table table-striped table-hover"><tbody>
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
    }, [pageId, loadingSaved.load, sectionsAnswers]);



    return (
        <form onSubmit={ saveAnswers }>
            {loadingSaved.load ? (
                <div className="p-3">Ładowanie...</div>
            ): errorMessage !== "" ? (
                <div className="p-3">{errorMessage}</div>
            ): (
                sectionsView.view
            )}
            <div className="w-100 d-flex justify-content-end flex-wrap">
                <button type="submit" className="btn btn-success mb-2 text-nowrap">
                    Zapisz odpowiedzi
                </button>
                <button type="button" className="btn btn-success ml-3 mb-2 text-nowrap" onClick={ finishAnswers }>
                    Wyślij odpowiedzi
                </button>
            </div>
            {confirmationModal.modal}
        </form>
    );
};

EmployeeSections.propTypes = {
    pageId: PropTypes.number.isRequired,
};

export default EmployeeSections;
