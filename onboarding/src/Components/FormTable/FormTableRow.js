import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { removePage } from "../hooks/PackagePage";
import { dateToString } from "../utils";
import "../../static/css/style.css";

function FormTableRow(props) {
    const [styleRow, setStyleRow] = useState(null);

    let loggedUser = {};
    if(props.loggedUser)
        loggedUser = props.loggedUser;

    useEffect(() => {
        if(props.lastRow && Date.now() - Date.parse(props.row.last_edit) < 3000) {
            setStyleRow('style-package-row')
        } else {
            setStyleRow(null);
        }
    }, [props.lastRow]);

    var handleRemove = function(){
        removePage(props.handleUpdate, props.row.key);
    }

    return(
        <tr className={styleRow}>
            <td><Link to={{ pathname: `/form_edit/${props.row.key}`, state: { packageId: props.packageId, pageId: props.row.key,
                 									pageName:props.row.name, description: props.row.description,
                 									link: props.row.link, loggedUser: loggedUser } }} >{props.row.name}</Link></td>
            <td>{props.row.order}</td>
            <td>{ dateToString(props.row.last_edit) }</td>
            <td><Link to={{ pathname: `/form_edit/${props.row.key}`, state: { packageId: props.packageId, pageId: props.row.key,
                 									pageName:props.row.name, description: props.row.description,
                 									link: props.row.link, loggedUser: loggedUser } }}  className="btn btn-secondary">edytuj</Link>
                 / <button className="btn btn-secondary" onClick={ handleRemove }>usuń</button></td>
        </tr>
    )
}

export default FormTableRow;

