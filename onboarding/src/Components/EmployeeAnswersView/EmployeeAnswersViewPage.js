import React, { useState } from "react";
import AnswersLegend from "./AnswersLegend";
import EmployeeAnswers from "./EmployeeAnswers";
import PageCard from "./PageCard";
import ModalWarning from "../ModalWarning";
import { sendRetry, sendAcceptance } from "../hooks/EmployeeForms";
import "../../static/css/EmployeeAnswersView.scss";
import arrow from "../../static/icons/arrow-left.svg";

/**
 * Loads page with answers for a page answered by employee.
 * @param props: React argument of component with properties like
 *        employeeId - an id of employee whose answers will be displayed by this component;
 *        page - object of page get from list of pages which was received from "api/package_pages/";
 *        goBackToMainProfilePage - callback function to set page in a state to null and to go back to employee's profile;
 * @returns {JSX.Element}
 * @constructor
 */
function EmployeeAnswersViewPage(props){
    document.title = "Onboarding: odpowiedzi pracownika";
    const [showLegend, setShowLegend] = useState(false);
    const [loadingMessage, setMessage] = useState("Ładowanie...");
    const [confirmationModal, setIdModal] = useState({id: 0, modal: <></>});
    const [buttonsOptions, setButtons] = useState({display: false, answered: false, confirmed: false, msg: "Wyślij przypomnienie", target: null});
    const [performUpdate, updateForms] = useState(false);
    const employeeId = props.employeeId;
    const packageOfAnswers = props.sentPackages.filter(el => el.id == props.page.package)[0];

    const updateButtonsOptions = function(newButtonsOptions, areSaved){
        setButtons(newButtonsOptions);

        let saved = newButtonsOptions.answered || areSaved;
        if( (props.page.notStarted && saved) || (props.page.inProgress && newButtonsOptions.answered) )
            updateForms(true);// update progress when employee saved or sent answers during watching them on this page;
    };

    const enableDisableButtons = (parentElement, doDisable) => {
        let i, buttons = parentElement.getElementsByClassName("js-hide-button");
        for(i = buttons.length - 1; i >= 0; i--)
            buttons[i].disabled = doDisable;
    };

    const acceptAnswersAsk = (e) => {
        if(buttonsOptions.answered === false)
            return;

        enableDisableButtons(e.target.parentNode, true);
        buttonsOptions.target = e.target;

        let idObject = {id: confirmationModal.id, node: e.target};
        setIdModal({id: idObject.id,
            modal: <ModalWarning handleAccept={ acceptAnswersConfirm } handleCancel={ acceptAnswersReject }
                                 title={ "Akceptacja" }
                                 message={ "Czy chcesz zaakceptować odpowiedzi pracownika?" }
                                 id={ idObject }
                                 show={ true }
                                 acceptText={ "Ok" } />
        });
    };
    const acceptAnswersConfirm = function(idObject){
        hideModal(idObject.id);
        //buttonsOptions.target = idObject.node;
        sendAcceptance(props.employeeId, props.page.id, acceptCallback, idObject.node);
    };
    const acceptAnswersReject = function(idObject){
        hideModal(idObject.id);
        if(buttonsOptions.target)
            enableDisableButtons(buttonsOptions.target.parentNode, false);
    };

    const resendAnswersConfirm = (idObject) => {
        hideModal(idObject.id);
        //buttonsOptions.target = idObject.node;
        sendRetry(employeeId, props.page.id, retryCallback, idObject.node);
    };
    const resendAnswersReject = () => {
        hideModal();
        if(buttonsOptions.target){
            buttonsOptions.target.disabled = false;
            if(buttonsOptions.answered)
                enableDisableButtons(buttonsOptions.target.parentNode, false);
        }
    };

    const resendAnswersAsk = (e) => {
        enableDisableButtons(e.target.parentNode, true);
        e.target.disabled = true;
        buttonsOptions.target = e.target;

        let msg, idObject = {id: confirmationModal.id, node: e.target};
        msg = "Potwierdź czy chcesz przypomnieć pracownikowi o formularzu.";
        if(buttonsOptions.answered)
            msg = "Czy jesteś pewien/pewna że chcesz odesłać formularz do pracownika?";

        setIdModal({id: idObject.id,
            modal: <ModalWarning handleAccept={ resendAnswersConfirm } handleCancel={ resendAnswersReject }
                                 title={ "Przypomnienie" }
                                 message={ msg }
                                 id={ idObject }
                                 show={ true }
                                 acceptText={ "Ok" } />
        });
    };

    const popUpConfirmationModal = (message) => {
        let count = confirmationModal.id;
        setIdModal({id: count,
            modal: <ModalWarning handleAccept={ hideModal } title={ "Odpowiedzi pracownika" } message={ message } id={ count } show={ true } acceptText={ "Ok" } />
        });
    };

    const acceptCallback = (message, isError, elementTarget) => {
        if(isError){
            if(elementTarget){
                elementTarget.disabled = false;
                enableDisableButtons(elementTarget.parentNode, false);
            }
            popUpConfirmationModal(message);
            return;
        }

        setButtons({display: false, answered: true, confirmed: true, msg: "", target: null});
        popUpConfirmationModal(message);
        updateForms(true);
    };

    const retryCallback = (message, isError, elementTarget) => {
        if(isError){
            if(elementTarget) elementTarget.disabled = false;// setTimeout()?
        } else {
            setMessage("Pracownik jeszcze nie odpowiedział na pytania");
            setButtons({display: true/*sectionsView.length > 0????*/, answered: false, confirmed: false, msg: "Wyślij przypomnienie", target: null});
        }

        popUpConfirmationModal(message);
        if(buttonsOptions.answered)
            updateForms(true);
    };

    const hideModal = function(id){
        let newId = (id)?id + 1 : 0;
        setIdModal({id: newId, modal: <></>});
    };


    return(
        <section className="EmployeeAnswersView">
            <div className="d-flex justify-content-end mb-5">
                <button 
                    className="EmployeeAnswersView__button EmployeeAnswersView__button--back btn" 
                    onClick={(e) => props.goBackToMainProfilePage(e, performUpdate) }
                >
                    <img className="EmployeeAnswersView__arrow" src={ arrow } alt="#" />
                    Wstecz
                </button>
                <button 
                    className="EmployeeAnswersView__button btn" 
                    onClick={ () => setShowLegend(!showLegend) }
                >Legenda</button>
            </div>
            { showLegend && 
                <AnswersLegend 
                    isSimple={ true }
                    showLegend={ showLegend }
                    setShowLegend={ setShowLegend } />
            }
            <PageCard employeeId={ employeeId } page={ props.page } packageOfAnswers={ packageOfAnswers } />
            <section className="EmployeeAnswers">
                { loadingMessage.length > 0 &&
                    <p className="mb-4"><i>{ loadingMessage }</i></p>
                }
                <EmployeeAnswers pageId={ props.page.id }
                                employeeId={ employeeId }
                                setMessage={ setMessage }
                                buttonsOptions={ buttonsOptions } updateButtons={ updateButtonsOptions }
                                acceptAnswersAsk={ acceptAnswersAsk }
                                resendAnswersAsk={ resendAnswersAsk } />
            </section>
            { confirmationModal.modal }
        </section>
    )
}

export default EmployeeAnswersViewPage;

