import React, { useState } from "react";

function FormsToSendTableRow(props){
    const [toggleObj, switchVisibility] = useState({style:{ display: "none" },
    									display: false,
    									hasContent: props.empty? false : props.row.pagesCount > 0,
    									rotate: false});

    const countChecked = function(e){
        props.handleChecked(e.target.checked, props.row.key);
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
        buttonObj = <button value={ props.row.id } className="btn btn-secondary" onClick={ sendPackage }>Wyślij</button>,
        pages;

    if(props.empty){
        checkBox = "";
        buttonObj = "";
    }

    if(toggleObj.hasContent){
        pages = props.row.pages.map((page, i) => {
            return (
                <tr key={ i } style={ toggleObj.style }>
                    <td colSpan="3">
                        <i className="fas fa-file" style={{ width: "24px", margin: "0 2px 0 52px" }}></i>
                        { page.title }
                    </td>
                    <td colSpan="2">{ page.updated_on }</td>
                </tr>
            );
        });
    }


    return(
        <>
            <tr>
                <td style={!toggleObj.hasContent ? { verticalAlign: "middle", paddingLeft: "38px" } : { verticalAlign: "middle" }}>
                    <span className="text-nowrap">
                        { toggleObj.hasContent && (
                            <button 
                                className={`caret-icon ${toggleObj.rotate ? "caret-rotate" : ""}`}
                                onClick={ showPages }
                                type="button">
                                <i className="fas fa-caret-right"></i>
                            </button> 
                        )}
                        { checkBox }
                        <i className="fa fa-folder" style={{ width: "24px", color: "#F7C46C", marginRight: "2px" }}></i>
                    </span>
                    {props.row.name}
                </td>
                <td style={{ verticalAlign: "middle" }}>{props.row.pagesCount}</td>
                <td style={{ verticalAlign: "middle" }}>{props.row.created}</td>
                <td style={{ verticalAlign: "middle" }}>{props.row.last_edit}</td>
                <td style={{ verticalAlign: "middle", textAlign: "end" }}>{ buttonObj }</td>
            </tr>
            { pages }
        </>
    )
}
export default FormsToSendTableRow;

