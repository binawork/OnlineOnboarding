import React from "react";
import "../../static/css/EmployeeAnswersView.css";

/**
 * 
 * @param props - {sectionData: array of Objects, sectionType: "osa" || another, answerData: Object}
 * @returns {JSX.Element}
 * @constructor
 */
function SectionAnswers(props){
    let count = 0, sectionData;

    if(props.sectionData && props.answerData){
        count = props.sectionData.length;
        sectionData = props.sectionData;
    } else
        return <div  className="row">Brak odpowiedzi do wyświetlenia</div>;

    const answerType = props.sectionType === "osa" ? "radio" : "checkbox";
    let answers = [], i, j, isChecked;
    const hasAnswerTemplate = props.sectionData.some(answ => answ.is_checked === true);

    for(i = 0; i < count; i++){
        isChecked = false;
        j = -1;
        if(props.employeeDidAnswer)
            j = props.answerData.length - 1

        for(; j >= 0; j--){
            if(props.answerData[j].id == sectionData[i].id || props.answerData[j].text === sectionData[i].title){
                isChecked = true;
                break;
            }
        }

        answers.push(
            <li className="EmployeeAnswersView__li" key={ i }>
                <label className={`EmployeeAnswersView__label 
                    ${sectionData[i].is_checked ? "EmployeeAnswersView__label--dot" : ""}
                    ${hasAnswerTemplate && (isChecked && !sectionData[i].is_checked) ? "EmployeeAnswersView__label--red" : ""}`}>
                    <input 
                        className={`EmployeeAnswersView__input EmployeeAnswersView__input--${answerType}`}
                        type={ answerType }
                        defaultChecked={ isChecked }
                        disabled />
                    <span className="EmployeeAnswersView__answer">{ sectionData[i].title }</span>
                </label>
            </li>
        );
    }


    return(
        <ul>{ answers }</ul>
    )
}

export default SectionAnswers;

