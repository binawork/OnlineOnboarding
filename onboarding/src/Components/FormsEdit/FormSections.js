import React, { useState } from "react";

import FormOpenText from "./FormOpenText";
import FormChoiceEdit from "./FormChoiceEdit";
import FormMultiChoiceEdit from "./FormMultiChoiceEdit";
import FormAddSection from "./FormAddSection";

function FormSections(){
    const [form_sections, setForms] = useState([]);

    function handleOpenText(){
    	let i = form_sections.length;
    	setForms([...form_sections, <div className="card-body" key = { i }><FormOpenText /></div>]);
    }

    var handleChoiceEdit = function(){
    	let i = form_sections.length, name = "radios" + i;
    	setForms([...form_sections, <div className="card-body" key = { i }><FormChoiceEdit name = { name } /></div>]);
    }

    var handleMultiChoice = function(){
    	let i = form_sections.length, name = "checks" + i;
    	setForms([...form_sections, <div className="card-body" key = { i }><FormMultiChoiceEdit name = { name } /></div>]);
    }

    /*if(form_sections.length < 3){
    	let i = 0;
    	form_sections.push(<div key = { i } className="card-body"><FormOpenText /></div>);
    	form_sections.push(<div key = { i+1 } className="card-body"><FormChoiceEdit /></div>);
    	form_sections.push(<div key = { i+2 } className="card-body"><FormMultiChoiceEdit /></div>);
    	setForms(form_sections);
    }*/

    return (
    	<div className="row">
    		<div className="col">
    			{ form_sections }
    		</div>
    		<div className="col-auto">
    			<div className="card-body">
					<FormAddSection handleClicks = { {openText: handleOpenText, singleChoice: handleChoiceEdit, multiChoiceEdit: handleMultiChoice} } />
				</div>
			</div>
		</div>
    )
}

export default FormSections;

