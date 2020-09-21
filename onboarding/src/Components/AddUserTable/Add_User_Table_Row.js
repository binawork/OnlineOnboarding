import React from "react";

function AddUserTableRow(props) {
    return(
        <tr>
            <td>{props.row.name}</td>
            <td>{props.row.location}</td>
            <td>{props.row.dzial}</td>
            <td>{props.row.stanowisko}</td>
            <td>{props.row.email}</td>
            <td>add</td>
        </tr>
    )
}
export default AddUserTableRow;