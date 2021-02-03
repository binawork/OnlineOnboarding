import React from "react";
// import { useLocation } from "react-router-dom";
// import PageAddressBar from "../PageAddressBar";
import EmployeeAnswers from "./EmployeeAnswers";
// import EmployeeProfileUser from "../EmployeeProfile/EmployeeProfileUser";
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
    // const location = useLocation();
    const employeeId = props.employeeId;
    // let employeeComponent = <></>, pageComponent = <></>;

    // if(location.state){
        // if(location.state.employeeId){
            // employeeComponent = <EmployeeProfileUser employeeId={ location.state.employeeId } />;
            // employeeId = ;
        // }
        // if(location.state.page){
            // pageComponent = <PageCard page={ props.page } />
        // }
    // };
    const handleClick = (e) => {
        e.preventDefault();
        props.setAnswersPage(null);
    }


    return(
        // <div className="page-inner">
            // <PageAddressBar page = { "Podgląd odpowiedzi pracownika" } />
            <div>
                <button className="btn btn-outline-warning button-back mb-3" style={ buttonBackStyle } onClick={ handleClick }>
                    <i className="bi bi-arrow-left-circle back-icon"></i>&nbsp;Wstecz
                </button>
            {/* <div className="page-section"> */}
                {/* { employeeComponent } */}
                {/* { pageComponent } */}
                <PageCard page={ props.page } />
                <EmployeeAnswers pageId={ props.page.id } employeeId={ employeeId }/>
            </div>
        // </div>
    )
}

export default EmployeeAnswersViewPage;

