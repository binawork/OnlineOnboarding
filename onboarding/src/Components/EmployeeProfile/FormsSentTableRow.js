import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Tag from "../Tag";
// import ProgressBar from "../ProgressBar";
import "../../static/css/packages.css"

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
                    <td className="table__data" colSpan="1">
                        <i className="fas fa-file" style={{ width: "24px", margin: "0 2px 0 52px" }}></i>
                        <Link to={{ pathname: "/employee_answers/" + page.id,
                                    state: { packageId: props.packageId, loggedUser: props.loggedUser, page: page, employee: props.employee } }}>
                            { page.title }
                        </Link>
                    </td>
                    <td className="table__data form-progress" colSpan="1">
                        {/* Add below lines if progress is implemented, add condition when it has to appear */}
                        {/* Change 'backgroundSize' to a value which is equal to the percentage of finished forms */}
                        {/* Change "W toku" to the proper value: "Skończone", "W toku" or "Nie zaczęte" */}
                        {/* <ProgressBar color="purple" backgroundSize={"75%"} /> */}
                        {/* <small className="ml-1">{ "W toku" }</small> */}
                    </td>
                    <td colSpan="3"></td>
                </tr>
            );
        });
    }

    return(
        <>
            <tr>
                <td className="table__data" style={!toggleObj.hasContent ? { verticalAlign: "middle", paddingLeft: "38px" } : { verticalAlign: "middle" }}>
                    { toggleObj.hasContent && <button className={`caret-icon ${toggleObj.rotate ? "caret-rotate" : ""}`} onClick={ showPages } type="button"><i className="fas fa-caret-right"></i></button> }
                    { checkBox }
                    <i className="fa fa-folder" style={{ width: "24px", color: "#F7C46C", marginRight: "2px" }}></i>
                    {props.row.form}
                </td>
                <td className="table__data">
                    <div className="package-progress">
                        {props.row.progress}
                        {/* Add below line if progress is implemented, add condition when it has to appear (when all of the forms in the package are finished) */}
                        {/* <Tag title="Skończone" color="yellow" /> */}
                    </div>
                </td>
                <td className="table__data">{props.row.send_date}</td>
                <td className="table__data">{props.row.finish_date}</td>
                <td className="table__data" style={{ textAlign: "end", width: "120px" }}>{ buttonObj }</td>
            </tr>
            { pages }
        </>
    )
}
export default FormsSentTableRow;

