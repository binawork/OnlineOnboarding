import React from "react";
import { Link } from "react-router-dom";

function EmployeeFormsRow({ row }) {
    return(
        <tr>
            <td>
                <Link to={`package/${row.id}`}>
                    {row.name}
                </Link>
            </td>
            <td>{row.progress}</td>
        </tr>
    )
}
export default EmployeeFormsRow;

