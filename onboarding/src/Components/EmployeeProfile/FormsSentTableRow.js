import React, { useState } from "react";
import Tag from "../Tag";
import ProgressBar from "../ProgressBar";
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

    const handleShowAnswers = (e, page) => {
        e.preventDefault();
        props.setAnswersPage(page);
    }

    let checkBox = <input type="checkbox" onClick={ countChecked } style={{ width: "24px", marginRight: "2px" }} />,
        buttonObj = <button value={ props.row.key } className="btn btn-secondary" onClick={ remind }>Przypomnienie</button>;
    let pages, tag=<></>;

    if(props.row.hasOwnProperty("percentage") ){// "green", "yellow", "amaranthine"
        let prc = parseFloat(props.row.percentage);

        if(prc > 0.99)
            tag = <Tag title="Skończone" color="green" />;
        else if(prc > 0.0)
            tag = <Tag title={ props.row.finish_date } color="yellow" />;
        // else
        //     tag = <Tag title={ props.row.finish_date } color="amaranthine" />;
    }

    if(props.empty){
        checkBox = "";
        buttonObj = "";
    }

    if(toggleObj.hasContent){
        pages = props.row.pages.map((page, i) => {
            let finishMsg = "", percentage = "0%";
            if(typeof page.finishMsg === 'string' || page.finishMsg instanceof String)
                finishMsg = page.finishMsg;
            if(page.hasOwnProperty("percentage") )
                percentage = page.percentage + "%";

            return (
                <tr key={ i } style={ toggleObj.style }>
                    <td className="table__data">
                        <i className="fas fa-file" style={{ width: "24px", margin: "0 2px 0 52px" }}/>
                        <a href="" title="Kliknij, aby przejść do odpowiedzi pracownika" onClick={ (e) => handleShowAnswers(e, page) }>
                            { page.title }
                        </a>
                    </td>
                    <td className="table__data form-progress">
                        <ProgressBar color={`progress ${finishMsg === "Skończone" ? "progress--green" : "progress--yellow"}`} backgroundSize={ percentage } />
                        <small className="ml-1">{ finishMsg }</small>
                    </td>
                    <td/>
                    <td>{ page.finished }</td>
                    <td/>
                </tr>
            );
        });
    }


    return(
        <>
            <tr>
                <td className="table__data" style={!toggleObj.hasContent ? { verticalAlign: "middle", paddingLeft: "38px" } : { verticalAlign: "middle" }}>
                    { toggleObj.hasContent && <button className={`caret-icon ${toggleObj.rotate ? "caret-rotate" : ""}`} onClick={ showPages } type="button"><i className="fas fa-caret-right"/></button> }
                    { checkBox }
                    <i className="fa fa-folder" style={{width: "24px", color: "#F7C46C", marginRight: "2px"}}/>
                    {props.row.form}
                </td>
                <td className="table__data">
                    <div className="package-progress">
                        {/* Add below line if progress is implemented, add condition when it has to appear (when all of the forms in the package are finished) */}
                        { props.row.progress } { tag }
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

