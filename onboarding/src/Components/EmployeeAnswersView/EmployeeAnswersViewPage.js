import React, { useState } from "react";
import AnswersLegend from "./AnswersLegend";
import EmployeeAnswers from "./EmployeeAnswers";
import PageCard from "./PageCard";
import ModalWarning from "../ModalWarning";
import { sendRetry } from "../hooks/EmployeeForms";
import "../../static/css/EmployeeAnswersView.scss";

const buttonBackStyle = {
    display: "flex",
    alignItems: "center",
    borderRadius: "2rem"
}

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
    const [confirmationModal, setIdModal] = useState({id: 0, modal: <></>});
    const [buttonsOptions, setButtons] = useState({display: false, answered: false, confirmed: false, msg: "Wyślij przypomnienie", target: null});
    const employeeId = props.employeeId;

    const resendAnswersConfirm = (idObject) => {
        hideModal(idObject.id);
        //buttonsOptions.target = idObject.node;
        sendRetry(employeeId, props.page.id, retryCallback, idObject.node);
    };
    const resendAnswersReject = () => {
        hideModal();
        if(buttonsOptions.target)
            buttonsOptions.target.disabled = false;
    };

    const resendAnswersAsk = (e) => {
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

    const retryCallback = (message, isError, elementTarget) => {

        if(isError){
            if(elementTarget) elementTarget.disabled = false;// setTimeout()?
        } else {
            //setMessage("Pracownik jeszcze nie odpowiedział na pytania");??????
            setButtons({display: true/*sectionsView.length > 0????*/, answered: false, confirmed: false, msg: "Wyślij przypomnienie", target: null});
        }

        popUpConfirmationModal(message);
    };

    const hideModal = function(id){
        let newId = (id)?id + 1 : 0;
        setIdModal({id: newId, modal: <></>});
    };


    return(
        <div>
            <div className="d-flex justify-content-between mb-3">
                <button 
                    className="btn btn-outline-warning button-back mr-1" 
                    style={ buttonBackStyle } 
                    onClick={ props.goBackToMainProfilePage }
                >
                    <i className="bi bi-arrow-left-circle back-icon"></i>&nbsp;Wstecz
                </button>
                <button 
                    className="btn btn-outline-warning" 
                    onClick={ () => setShowLegend(!showLegend) }
                >Legenda</button>
            </div>
            { showLegend && 
                <section className="card card-fluid p-3 AnswersLegend">
                    <div className="card-body">
                        <header>
                            <p className="text-uppercase text-center">Legenda</p>
                        </header>
                        <AnswersLegend />
                    </div>
                </section>
            }
            <PageCard page={ props.page } />
            <EmployeeAnswers pageId={ props.page.id }
                             employeeId={ employeeId }
                             showMessage={ popUpConfirmationModal }
                             buttonsOptions={ buttonsOptions } setButtons={ setButtons }
                             resendAnswersAsk={ resendAnswersAsk } />
            { confirmationModal.modal }
        </div>
    )
}

export default EmployeeAnswersViewPage;

