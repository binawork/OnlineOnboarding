import React from "react";

function EmployeProfileTableFirstRow(props) {
    return(
        <tr>
            <td>{props.row.name}</td>
            <td>{props.row.pages}</td>
            <td>{props.row.created}</td>
            <td>{props.row.last_edit}</td>
            <td>send</td>
        </tr>
    )
}
export default EmployeProfileTableFirstRow;