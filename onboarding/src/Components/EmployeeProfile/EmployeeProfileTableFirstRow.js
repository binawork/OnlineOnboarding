import React from "react";

function EmployeeProfileTableFirstRow(props) {
    return(
        <tr>
            <td>{props.row.name}</td>
            <td>{props.row.pages}</td>
            <td>{props.row.created}</td>
            <td>{props.row.last_edit}</td>
            <td>Wyślij</td>
        </tr>
    )
}
export default EmployeeProfileTableFirstRow;

