import React, { useState } from "react";
import ProgressBar from "../ProgressBar";
import bookIcon from "../../static/icons/book.svg";
import bookOpenedIcon from "../../static/icons/book-opened.svg";
import caretIcon from "../../static/icons/caret.svg";

/**
 * Prints row of sent package progress and dates.
 * It also includes drop-down list of pages if they exist.
 * @param props - {row: Object, empty: boolean, handleChecked: function, handleRemind: function, setAnswersPage: function, withholdPackage: function}
 *      Where row has:
 *      {id: package id;
 *      percentage: relation finished to the number of pages in scale [0, 100];
 *      send_date: the date when package was sent, or error message or '?' as default;
 *      finish_date: the date when employee finished all pages or message;
 *      pagesCount: number of pages for the package which applies this row;
 *      pages: list of pages for this package
 *      }
 * @returns {JSX.Element}
 * @constructor
 */
function FormsSentTableRow(props) {
    const [toggleObj, switchVisibility] = useState({style:{ display: "none" },
                                                    display: false,
                                                    hasContent: props.empty? false : props.row.pagesCount > 0,
                                                    rotate: false});

    const countChecked = function(e){
        props.handleChecked(e.target.checked);
    };

    const showPages = function(){
        if(toggleObj.hasContent === false)
            return;

        let newStyle = toggleObj.display? {display: "none"} : {display: ""};
        switchVisibility({...toggleObj, style: newStyle, display: !toggleObj.display, rotate: !toggleObj.rotate});
    };

    const remind = (e) => {
        props.handleRemind(e.target.value);
    };

    const handleSentCancel = (e) => {
        props.withholdPackage(e.target.value);
    };

    const handleShowAnswers = (e, page) => {
        e.preventDefault();
        props.setAnswersPage(page);
    }

    let checkBox = <input className="EmployeeProfileTable__checkbox" type="checkbox" onClick={ countChecked } />,
        buttonObj = <button value={ props.row.id } className="EmployeeProfileTable__button btn mb-2 w-100" onClick={ remind }>Przypomnienie</button>,
        buttonRm = <button value={ props.row.id } className="EmployeeProfileTable__button btn w-100 text-nowrap" onClick={ handleSentCancel }>Usuń z wysłanych</button>;
    let pages;

    if(props.row.hasOwnProperty("percentage") ){// "green", "yellow", "blue"
        let prc = parseFloat(props.row.percentage);
    }

    if(props.empty){
        checkBox = "";
        buttonObj = "";
        buttonRm = ""
    }

    if(toggleObj.hasContent){
        pages = props.row.pages.map((page, i) => {
            let finishMsg = "", percentage = "0%";
            if(typeof page.finishMsg === 'string' || page.finishMsg instanceof String)
                finishMsg = page.finishMsg;
            if(page.hasOwnProperty("percentage") )
                percentage = page.percentage + "%";

            return (
                <tr className="EmployeeProfileTable__row EmployeeProfileTable__row--sublist" key={ i } style={ toggleObj.style }>
                    <td className="EmployeeProfileTable__data"></td>
                    <td className={`EmployeeProfileTable__data ${i == 0 && "EmployeeProfileTable__data--sublist-first"}`}></td>
                    <td className={`EmployeeProfileTable__data ${i == 0 && "EmployeeProfileTable__data--sublist-first"}`}>
                        <img className="EmployeeProfileTable__image--book-opened" src={ bookOpenedIcon } alt="#" />
                    </td>
                    <td className={`EmployeeProfileTable__data ${i == 0 && "EmployeeProfileTable__data--sublist-first"}`} colSpan="2">
                        <a href="" title="Kliknij, aby przejść do odpowiedzi pracownika" onClick={ (e) => handleShowAnswers(e, page) }>
                            { page.title }
                        </a>
                    </td>
                    <td className={`EmployeeProfileTable__data ${i == 0 && "EmployeeProfileTable__data--sublist-first"}`} colSpan="2">
                        <div className="EmployeeProfileTable__progress-bar">
                            <ProgressBar color="blue" backgroundSize={ percentage } />
                            {/* <small className="ml-1">{ finishMsg }</small> */}
                        </div>
                    </td>
                    {/* <td className="EmployeeProfileTable__data ">{ page.finished }</td> */}
                    <td className="EmployeeProfileTable__data"/>
                </tr>
            );
        });
    }


    return(
        <>
            <tr className="EmployeeProfileTable__row" onClick={ showPages } style={{ cursor: toggleObj.hasContent && 'pointer' }}>
                <td className="EmployeeProfileTable__data" onClick={e => e.stopPropagation()}>
                    { checkBox }
                </td>
                <td className="EmployeeProfileTable__data EmployeeProfileTable__data--small">
                    { toggleObj.hasContent && (
                        <button 
                            className={`caret-icon ${toggleObj.rotate ? "caret-icon--rotate" : ""}`}
                            type="button">
                            <img src={ caretIcon } alt="#" />
                        </button> 
                    )}
                </td>
                <td className="EmployeeProfileTable__data EmployeeProfileTable__data--small">
                    <img className="EmployeeProfileTable__image--book" src={ bookIcon } alt="#" />
                </td>
                <td className="EmployeeProfileTable__data">
                    <span>{props.row.form}</span>
                </td>
                <td className="EmployeeProfileTable__data">{props.row.send_date}</td>
                <td className="EmployeeProfileTable__data">
                    <div className="EmployeeProfileTable__progress text-nowrap">
                        { props.row.progress }
                    </div>
                </td>
                <td className="EmployeeProfileTable__data">{props.row.finish_date}</td>
                <td className="EmployeeProfileTable__data" style={{ textAlign: "end", width: "120px" }} onClick={e => e.stopPropagation()}>
                    { buttonObj }
                    { buttonRm }
                </td>
            </tr>
            { pages }
        </>
    )
}
export default FormsSentTableRow;

