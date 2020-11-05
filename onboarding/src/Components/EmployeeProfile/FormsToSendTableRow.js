import React from "react";

function FormsToSendTableRow(props) {
    return(
        <tr>
            <td><input type="checkbox" /></td>
            <td>{props.row.name}</td>
            <td>{props.row.pagesCount}</td>
            <td>{props.row.created}</td>
            <td>{props.row.last_edit}</td>
            <td><button className="btn btn-secondary">Wyślij</button></td>
        </tr>
    )
}
export default FormsToSendTableRow;

