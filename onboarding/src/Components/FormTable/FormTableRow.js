import React from "react";
import { Link } from 'react-router-dom';
import { removePage } from "../hooks/PackagePage";


function FormTableRow(props) {

    var handleRemove = function(){
        removePage(props.handleUpdate, props.row.key);
    }

    return(
        <tr>
            <td><Link to="/form_edit">{props.row.name}</Link></td>
            <td>{props.row.order}</td>
            <td>{props.row.last_edit}</td>
            <td>edytuj / <button className="btn btn-secondary">usuń</button></td>
        </tr>
    )
}
export default FormTableRow;
