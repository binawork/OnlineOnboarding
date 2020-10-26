import React from "react";
import { Link } from 'react-router-dom';
import { dateToString } from "../utils";
import { removeCombo } from "../hooks/Packages";

function PackagesRow(props) {

    var removeSuccess = (result) => {
        props.handleUpdate();// update list of packages;
        //console.log(result);
    };

    var handleRemove = function(){
        removeCombo(props.handleUpdate, props.row.key);
    }

    return(
        <tr>
            <td><Link to={{ pathname: "/package_page/" + props.row.key, state: { packageId: props.row.key } }} className="link">{props.row.name}</Link></td>
            <td>{ dateToString(props.row.last_edit) }</td>{/* na polski; */}
            <td><a href="">edytuj</a> / <button className="btn btn-secondary" onClick={ handleRemove }>usuń</button> </td>
        </tr>
    )
}
export default PackagesRow;

