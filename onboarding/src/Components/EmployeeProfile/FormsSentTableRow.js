import React, { useState } from "react";

function FormsSentTableRow(props) {
    let buttonObj = "", pages;
    if(props.row.pagesCount > 0){
        buttonObj = <button className="btn" type="button">&#8631;</button>;// &#8634;
        pages = props.row.pages.map((page, i) => {
            return <tr key={ i }><td></td><td><input type="checkbox" onClick={ countChecked } /></td><td>{ page.title }</td><td></td><td></td><td></td><td></td></tr>;
        });
    }

    const [toggleObj, switchVisibility] = useState({btn:buttonObj, style:{ display: "none" }, display: false});


    const countChecked = function(e){
        props.handleChecked(e.target.checked);
    };

    const showPages = function(){

    };

    let checkBox = <input type="checkbox" onClick={ countChecked } />,
        toggleButton = buttonObj;

    buttonObj = <button className="btn btn-secondary">Przypomnienie</button>;
    if(props.empty){
        checkBox = "";
        buttonObj = "";
    }

    return(
        <>
        <tr>
            <td>{ checkBox }</td>
            <td>{ toggleObj.btn }</td>
            <td>{props.row.form}</td>
            <td>{props.row.progress}</td>
            <td>{props.row.send_date}</td>
            <td>{props.row.finish_date}</td>
            <td>{ buttonObj }</td>
        </tr>
        { pages }
        </>
    )
}
export default FormsSentTableRow;

