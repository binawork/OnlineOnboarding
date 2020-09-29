import React, { useState } from "react";

//import "../../static/looper/stylesheets/theme.min.css";
//import "../static/looper/stylesheets/theme-dark.min.css";
//import "../static/looper/vendor/fontawesome/all.min.css";


function RadioButton(props) {
    let id = 0;
    if(props.id)
        id = props.id;

    const [checkedState, checkUncheck] = useState({check:false, className:"custom-control-input"});
    const [titleId, setTitleId] = useState({title:"Odpowiedź " + (id+1), id:id});
	let idStr = props.name + "_rd" + id;


    var handleCheck = () => {
        if(checkedState.check){
            checkUncheck({check:false, className:"custom-control-input"});
        } else {
            checkUncheck({check:true, className:"custom-control-input is-valid"});
            //props.handle.uncheck(titleId.id);
        }
    }

    return(
        <tr><td><i className="fa fa-arrows">&#10018;</i></td>
            <td>
                <div className="custom-control custom-control-inline custom-radio">
                    <input type="radio" name={ props.name } onClick={ handleCheck } className={ checkedState.className } id={ idStr } checked={ checkedState.check===true } /> <label className="custom-control-label" htmlFor={ idStr }>{ titleId.title }</label>
                </div>
            </td>
            <td> <a className="btn" href="#">&#9997; Edytuj</a> </td>
            <td> <a className="btn" href="#"><i className="fa fa-trash-o fa-lg">&#61944;</i> Usuń</a> </td>
        </tr>
    )
}

export default RadioButton;

