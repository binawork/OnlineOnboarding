import React from "react";
import { Link } from 'react-router-dom';
// todos: add key = { ... }

function EmployeeFormsRow(props) {
    return(
        <tr>
            <td><Link to="/page_fill">{props.row.name}</Link></td>
            <td>{props.row.progress}</td>
        </tr>
    )
}
export default EmployeeFormsRow;

