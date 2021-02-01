import React from "react";


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


    const answerType = props.sectionType === "osa" ? ["(", ")"] : ["[", "]"];
    let answers = [], i, j, isChecked, checkSign;

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

        if(sectionData[i].is_checked)
            checkSign = answerType[0] + "x" + answerType[1];
        else
            checkSign = answerType[0] + answerType[1];

        if(isChecked)
            answers.push(<div key={ i } className="row align-items-center" style={{ backgroundColor: "#4D4D6E" }}>
                    <div className="col-auto">{ checkSign }</div>
                    <div className="col">{ sectionData[i].title }</div>
                </div>
            );
        else
            answers.push(<div key={ i } className="row align-items-center">
                    <div className="col-auto">{ checkSign }</div>
                    <div className="col">{ sectionData[i].title }</div>
                </div>
            );
    }


    return(
        <>{ answers }</>
    )
}

export default SectionAnswers;

