import React from "react";

function EmployeeProfileTableSecondRow(props) {
    let checkBox = <input type="checkbox" />, buttonObj = <button className="btn btn-secondary">Przypomnienie</button>;
    if(props.empty){
        checkBox = "";
        buttonObj = "";
    }

    return(
        <tr>
            <td>{ checkBox }</td>
            <td>{props.row.form}</td>
            <td>{props.row.progress}</td>
            <td>{props.row.send_date}</td>
            <td>{props.row.finish_date}</td>
            <td>{ buttonObj }</td>
        </tr>
    )
}
export default EmployeeProfileTableSecondRow;

