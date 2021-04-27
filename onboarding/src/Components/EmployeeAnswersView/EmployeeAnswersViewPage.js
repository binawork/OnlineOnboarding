import React, { useState } from "react";
import AnswersLegend from "./AnswersLegend";
import EmployeeAnswers from "./EmployeeAnswers";
import PageCard from "./PageCard";
import ModalWarning from "../ModalWarning";
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
    const employeeId = props.employeeId;

    const popUpConfirmationModal = (message) => {
        let count = confirmationModal.id;
        setIdModal({id: count,
            modal: <ModalWarning handleAccept={ hideModal } title={ "Odpowiedzi pracownika" } message={ message } id={ count } show={ true } acceptText={ "Ok" } />
        });
    };

    const hideModal = function(id){
        setIdModal({id: id + 1, modal: <></>});
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
            <EmployeeAnswers pageId={ props.page.id } employeeId={ employeeId } showMessage={ popUpConfirmationModal } />
            { confirmationModal.modal }
        </div>
    )
}

export default EmployeeAnswersViewPage;

