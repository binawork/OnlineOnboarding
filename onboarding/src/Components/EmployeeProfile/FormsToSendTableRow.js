import React, { useState } from "react";
import bookIcon from "../../static/icons/book.svg";
import bookOpenedIcon from "../../static/icons/book-opened.svg";
import caretIcon from "../../static/icons/caret.svg";

function FormsToSendTableRow(props){
    const [toggleObj, switchVisibility] = useState({style:{ display: "none" },
    									display: false,
    									hasContent: props.empty? false : props.row.pagesCount > 0,
    									rotate: false});

    const countChecked = function(e){
        props.handleChecked(e.target.checked, props.row.id);
    };

    const showPages = function(){
        if(toggleObj.hasContent === false)
            return;

        let newStyle = toggleObj.display? {display: "none"} : {display: ""};
        switchVisibility({...toggleObj, style: newStyle, display: !toggleObj.display, rotate: !toggleObj.rotate});
    };

    const sendPackage = (e) => {
        props.handleSendPackage(e.target.value);
    };


    let checkBox = <input type="checkbox" onClick={ countChecked } style={{ width: "24px", marginRight: "2px" }} />,
        buttonObj = <button value={ props.row.id } className="EmployeeProfileTable__button btn w-100" onClick={ sendPackage }>Wyślij</button>,
        pages;

    if(props.empty){
        checkBox = "";
        buttonObj = "";
    }

    if(toggleObj.hasContent){
        pages = props.row.pages.map((page, i) => {
            return (
                <tr className="EmployeeProfileTable__row EmployeeProfileTable__row--sublist" key={ i } style={ toggleObj.style }>
                    <td className="EmployeeProfileTable__data"></td>
                    <td className={`EmployeeProfileTable__data ${i == 0 && "EmployeeProfileTable__data--sublist-first"}`}></td>
                    <td className={`EmployeeProfileTable__data ${i == 0 && "EmployeeProfileTable__data--sublist-first"}`}>
                        <img className="EmployeeProfileTable__image--book-opened" src={ bookOpenedIcon } alt="#" />
                    </td>
                    <td className={`EmployeeProfileTable__data ${i == 0 && "EmployeeProfileTable__data--sublist-first"}`} colSpan="3">
                        { page.title }
                    </td>
                    <td className={`EmployeeProfileTable__data ${i == 0 && "EmployeeProfileTable__data--sublist-first"}`}>
                        { page.updated_on }
                    </td>
                    <td className="EmployeeProfileTable__data"></td>
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
                <td className="EmployeeProfileTable__data">
                    { toggleObj.hasContent && (
                        <button 
                            className={`caret-icon ${toggleObj.rotate ? "caret-icon--rotate" : ""}`}
                            type="button">
                            <img src={ caretIcon } alt="#" />
                        </button> 
                    )}
                </td>
                <td className="EmployeeProfileTable__data EmployeeProfileTable__data--small" >
                    <img className="EmployeeProfileTable__image--book" src={ bookIcon } alt="#" />
                </td>
                <td className="EmployeeProfileTable__data">
                    <span>{props.row.name}</span>
                </td>
                <td className="EmployeeProfileTable__data">{props.row.created}</td>
                <td className="EmployeeProfileTable__data">{props.row.pagesCount}</td>
                <td className="EmployeeProfileTable__data">{props.row.last_edit}</td>
                <td className="EmployeeProfileTable__data" onClick={e => e.stopPropagation()}>{ buttonObj }</td>
            </tr>
            { pages }
        </>
    )
}
export default FormsToSendTableRow;

