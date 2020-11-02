import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { dateToString } from "../utils";
import { removeCombo } from "../hooks/Packages";
import "../../../static/css/styles.css";

function PackagesRow({ row, handleUpdate, lastRow, loggedUser }) {
    const [styleRow, setStyleRow] = useState(null);

    var removeSuccess = (result) => {
        handleUpdate();// update list of packages;
    };

    var handleRemove = function(){
        removeCombo(handleUpdate, row.key);
    }

    useEffect(() => {
        if(lastRow && Date.now() - Date.parse(row.created) < 3000) {
            setStyleRow('style-package-row')
        } else {
            setStyleRow(null);
        }
    }, [lastRow])

    return(
        <tr className={styleRow}>
            <td><Link to={{ pathname: "/package_page", state: { packageId: row.key, loggedUser: loggedUser } }} className="link">{row.name}</Link></td> 
            <td>{ dateToString(row.last_edit) }</td>{/* na polski; */}
            <td><Link to={{ pathname: "/package_page", state: { packageId: row.key, loggedUser: loggedUser } }} className="link">edytuj</Link> / <button className="btn btn-secondary" onClick={ handleRemove }>usuń</button> </td>
        </tr>
    )
}
export default PackagesRow;

