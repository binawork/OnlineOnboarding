import React from "react";

function PackagesRow(props) {
    return(
        <tr>
            <td>{props.row.name}</td>
            <td>{props.row.last_edit}</td>
            <td>edit/delete/stats</td>
        </tr>
    )
}
export default PackagesRow;
