import React from "react";

function EmployeeProfileTableSecondRow(props) {
    return(
        <tr>
            <td>{props.row.form}</td>
            <td>{props.row.progress}</td>
            <td>{props.row.send_date}</td>
            <td>{props.row.finish_date}</td>
            <td><button className="btn btn-secondary">{props.row.note}</button></td>
        </tr>
    )
}
export default EmployeeProfileTableSecondRow;

