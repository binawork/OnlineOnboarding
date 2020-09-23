import React, { useState } from "react";

import FormOpenText from "./FormOpenText";
import FormChoiceEdit from "./FormChoiceEdit";
import FormMultiChoiceEdit from "./FormMultiChoiceEdit";
import FormAddSection from "./FormAddSection";

function FormSections(){
    const [form_sections, setForms] = useState([]);

	let i;
    function handleOpenText(){
    	i = form_sections.length;
    	form_sections.push(<div className="card-body" key = { i }><FormOpenText /></div>);console.log(form_sections);
    	setForms(form_sections);
    }

    var handleChoiceEdit = function(){
    	i = form_sections.length;
    	form_sections.push(<div className="card-body" key = { i }><FormChoiceEdit /></div>);
    	setForms(form_sections);
    }

    var handleMultiChoice = function(){
    	i = form_sections.length;
    	form_sections.push(<div className="card-body" key = { i }><FormMultiChoiceEdit /></div>);
    	setForms(form_sections);
    }

    /*if(form_sections.length < 3){
    	i = 0;
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

