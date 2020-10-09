import React from "react";
import { Link } from 'react-router-dom';

function FormTableRow(props) {
    return(
        <tr>
            <td><Link to="/form_edit">{props.row.name}</Link></td>
            <td>{props.row.order}</td>
            <td>{props.row.last_edit}</td>
            <td>edytuj / usuń</td>
        </tr>
    )
}
export default FormTableRow;
