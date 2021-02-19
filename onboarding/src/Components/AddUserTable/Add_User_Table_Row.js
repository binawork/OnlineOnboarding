import React from "react";

function AddUserTableRow(props) {
    return(
        <tr>
            <td>{props.row.first_name} {props.row.last_name}</td>
            <td>{props.row.location}</td>
            <td>{props.row.department}</td>
            <td>{props.row.position}</td>
            <td>{props.row.email}</td>
            <td>
                <button type="button" value={ props.row.id } onClick={ props.handleSendPackage } className="btn btn-secondary">Wyślij</button>
            </td>
        </tr>
    )
}
export default AddUserTableRow;

