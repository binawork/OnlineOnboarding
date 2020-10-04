import React from "react";
import { Link } from 'react-router-dom';
import { dateToString } from "../utils";
import { removeCombo } from "../hooks/Packages";

function PackagesRow(props) {

    var removeSuccess = (result) => {
        //props.handleUpdate();/ / update list of packages;
        console.log(result);
    };

    var handleRemove = function(){
        removeCombo(removeSuccess, props.row.key);
    }

    return(
        <tr>
            <td><Link to={{ pathname: "/package_page", state: { packageId: props.row.key } }}>{props.row.name}</Link></td>
            <td>{ dateToString(props.row.last_edit) }</td>{/* na polski; */}
            <td><a href="">edytuj</a> / <button className="btn btn-secondary" style={{color: "black"}} onClick={ handleRemove }>usuń</button> </td>
        </tr>
    )
}
export default PackagesRow;
