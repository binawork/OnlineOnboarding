import React from "react";


function EmployeeFormsRow(props) {
    const moveToForm = (e) => {
        e.preventDefault();
        props.switchToForm(props.row.key);
    };

    return(
        <tr>
            <td><a href="#" onClick={ moveToForm }>{props.row.name}</a></td>
            <td>{props.row.progress}</td>
        </tr>
    )
}
export default EmployeeFormsRow;

