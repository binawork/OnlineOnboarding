import React from "react";


/**
 * 
 * @param props - { id, data: String or Object }
 * @returns {JSX.Element}
 * @constructor
 */
function OpenAnswer(props) {
    let text = "";
    if(typeof props.data === 'string' || props.data instanceof String)
        text = props.data;
    else if(Array.isArray(props.data) && props.data.length > 0)
        text = props.data[0];


    return(
        <div className="form-group">{ text }</div>
    )
}

export default OpenAnswer;

