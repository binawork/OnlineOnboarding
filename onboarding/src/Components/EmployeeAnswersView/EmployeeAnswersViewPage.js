import React, { useState } from "react";
import AnswersKey from "./AnswersKey";
import EmployeeAnswers from "./EmployeeAnswers";
import PageCard from "./PageCard";
// import "../../static/css/style.css";

const buttonBackStyle = {
    display: "flex",
    alignItems: "center",
    borderRadius: "2rem"
}

/**
 * Loads page with answers for a page answered by employee
 * @param props - location.state: { page: Object, employeeId: number, setAnswersPage: function }
 * @returns {JSX.Element}
 * @constructor
 */
function EmployeeAnswersViewPage(props){
    document.title = "Onboarding: odpowiedzi pracownika";
    const [key, setKey] = useState(false);
    const employeeId = props.employeeId;

    return(
        <div>
            <div className="d-flex justify-content-between mb-3">
                <button 
                    className="btn btn-outline-warning button-back" 
                    style={ buttonBackStyle } 
                    onClick={ props.goBackToMainProfilePage }
                >
                    <i className="bi bi-arrow-left-circle back-icon"></i>&nbsp;Wstecz
                </button>
                <button 
                    className="btn btn-outline-warning" 
                    onClick={ () => setKey(!key) }
                >Legenda</button>
            </div>
            { key && <AnswersKey /> }
            <PageCard page={ props.page } />
            <EmployeeAnswers pageId={ props.page.id } employeeId={ employeeId }/>
        </div>
    )
}

export default EmployeeAnswersViewPage;

