import React from "react";
import { Link } from 'react-router-dom';
import { removePage } from "../hooks/PackagePage";


function FormTableRow(props) {

    var handleRemove = function(){
        removePage(props.handleUpdate, props.row.key);
    }

    return(
        <tr>
            <td><Link to={{ pathname: "/form_edit", state: { packageId: props.packageId, pageId: props.row.key, pageName:props.row.name, description: props.row.description, link: props.row.link } }} >{props.row.name}</Link></td>
            <td>{props.row.order}</td>
            <td>{props.row.last_edit}</td>
            <td><Link to={{ pathname: "/form_edit", state: { packageId: props.packageId, pageId: props.row.key, pageName:props.row.name, description: props.row.description, link: props.row.link } }} >edytuj</Link> / <button className="btn btn-secondary" onClick={ handleRemove }>usuń</button></td>
        </tr>
    )
}
export default FormTableRow;
