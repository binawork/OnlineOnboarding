import React from "react";


function EmployeeFormsRow(props) {
    const moveToFormPages = (e) => {
        e.preventDefault();
        props.switchToFormPages(props.row.key);
    };

    return(
        <tr>
            <td><a href="#" onClick={ moveToFormPages }>{props.row.name}</a></td>
            <td>{props.row.progress}</td>
        </tr>
    )
}
export default EmployeeFormsRow;

