import React, { useState } from "react";

function FormsSentTableRow(props) {
    const [toggleObj, switchVisibility] = useState({text: String.fromCharCode(8631), style:{ display: "none" }, display: false, hasContent: props.empty? false : props.row.pagesCount > 0});


    const countChecked = function(e){
        props.handleChecked(e.target.checked);
    };

    const showPages = function(){
        if(toggleObj.hasContent === false)
            return;

        let charNo = toggleObj.display? 8631 : 8634, newStyle = toggleObj.display? {display: "none"} : {display: ""};
        switchVisibility({...toggleObj, text: String.fromCharCode(charNo), style: newStyle, display: !toggleObj.display});
    };


    let checkBox = <input type="checkbox" onClick={ countChecked } />,
        buttonObj = <button className="btn btn-secondary">Przypomnienie</button>, pages;

    if(props.empty){
        checkBox = "";
        buttonObj = "";
    }

    if(toggleObj.hasContent){
        pages = props.row.pages.map((page, i) => {
            return <tr key={ i } style={ toggleObj.style }><td></td><td><input type="checkbox" onClick={ countChecked } /></td><td>{ page.title }</td><td></td><td></td><td></td><td></td></tr>;
        });
    }


    return(
        <>
        <tr>
            <td>{ checkBox }</td>
            <td>{ toggleObj.hasContent && (<button className="btn" onClick={ showPages } type="button">{ toggleObj.text }</button>) }</td>
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

