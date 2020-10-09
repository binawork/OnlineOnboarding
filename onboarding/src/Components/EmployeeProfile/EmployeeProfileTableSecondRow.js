import React from "react";

function EmployeeProfileTableSecondRow(props) {
    return(
        <tr>
            <td>{props.row.form}</td>
            <td>{props.row.progress}</td>
            <td>{props.row.send_date}</td>
            <td>{props.row.finish_date}</td>
            <td>{props.row.note}</td>
        </tr>
    )
}
export default EmployeeProfileTableSecondRow;

