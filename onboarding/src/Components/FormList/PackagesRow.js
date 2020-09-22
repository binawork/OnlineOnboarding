import React from "react";
import { Link } from 'react-router-dom';
import { dateToString } from "../utils";

function PackagesRow(props) {
    return(
        <tr>
            <td><Link to="/package_page">{props.row.name}</Link></td>
            <td>{ dateToString(props.row.last_edit) }</td>
            <td>edit/delete/stats</td>
        </tr>
    )
}
export default PackagesRow;
