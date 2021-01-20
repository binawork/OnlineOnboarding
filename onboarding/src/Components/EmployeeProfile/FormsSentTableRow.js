import React, { useState } from "react";
import { Link } from "react-router-dom";


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


    let checkBox = <input type="checkbox" onClick={ countChecked } style={{ width: "24px", marginRight: "2px" }} />,
        buttonObj = <button value={ props.row.key } className="btn btn-secondary" onClick={ remind }>Przypomnienie</button>,
        pages;

    if(props.empty){
        checkBox = "";
        buttonObj = "";
    }

    if(toggleObj.hasContent){
        pages = props.row.pages.map((page, i) => {
            return (
                <tr key={ i } style={ toggleObj.style }>
                    <td colSpan="5">
                        <i className="fas fa-file" style={{ width: "24px", margin: "0 2px 0 52px" }}></i>
                        <Link to={{ pathname: "/employee_answers",
                                    state: { packageId: props.packageId, loggedUser: props.loggedUser, pageId: page.id, employee: props.employee } }}>
                            { page.title }
                        </Link>
                    </td>
                </tr>
            );
        });
    }


    return(
        <>
            <tr>
                <td style={!toggleObj.hasContent ? { verticalAlign: "middle", paddingLeft: "38px" } : { verticalAlign: "middle" }}>
                    { toggleObj.hasContent && <button className={`caret-icon ${toggleObj.rotate ? "caret-rotate" : ""}`} onClick={ showPages } type="button"><i className="fas fa-caret-right"></i></button> }
                    { checkBox }
                    <i className="fa fa-folder" style={{ width: "24px", color: "#F7C46C", marginRight: "2px" }}></i>
                    {props.row.form}
                </td>
                <td style={{ verticalAlign: "middle" }}>{props.row.progress}</td>
                <td style={{ verticalAlign: "middle" }}>{props.row.send_date}</td>
                <td style={{ verticalAlign: "middle" }}>{props.row.finish_date}</td>
                <td style={{ verticalAlign: "middle", textAlign: "end", width: "120px" }}>{ buttonObj }</td>
            </tr>
            { pages }
        </>
    )
}
export default FormsSentTableRow;

