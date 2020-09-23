import React, { useState } from "react";

//import "../../static/looper/stylesheets/theme.min.css";
//import "../static/looper/stylesheets/theme-dark.min.css";
//import "../static/looper/vendor/fontawesome/all.min.css";

import Navbar from "../Navbar";
import LeftMenu from "../LeftMenu";
import PageAddressBar from "../PageAddressBar";
import FormOpenText from "./FormOpenText";
import FormChoiceEdit from "./FormChoiceEdit";
import FormMultiChoiceEdit from "./FormMultiChoiceEdit";
import FormAddSection from "./FormAddSection";


function FormsEditPage() {
	const [form_sections, setForms] = useState([]);

    if(form_sections.length < 3){
    	form_sections.push(<div className="card-body"><FormOpenText /></div>);
    	form_sections.push(<div className="card-body"><FormChoiceEdit /></div>);
    	form_sections.push(<div className="card-body"><FormMultiChoiceEdit /></div>);
    	setForms(form_sections);
    }

    return(
    	<div className="app">
    		<header className="app-header app-header-dark">
    			<Navbar /> {/* placeholder */}
    		</header>
    		<LeftMenu /> {/* placeholder */}
    		<main className="app-main">
				<div className="wrapper"><div className="page has-sidebar-expand-xl">
					<div className="page-inner">
						<PageAddressBar page = { "Page 1" } /> {/* placeholder */}

    					<div className="page-section">
    						<div className="card card-fluid">
    							<div className="card-header">
    							Strona
    							</div>
    							<div className="card-body">
    								<form> {/* form placeholder */}
    									<div className="form-group">
    										<div className="input-group">
    											<input type="text" className="form-control" placeholder="Enter new Page name" value="" />
    										</div>
    									</div>
    									<div className="form-group">
    										<div className="input-group">
    											<input type="text" className="form-control" placeholder="Add video url/doc etc." value="" />
    										</div>
    									</div>
    									<div className="form-group">
    										<textarea className="form-control" placeholder="Opis" rows="4"></textarea>
    									</div>
    									<div className="form-group">
    										<div className="input-group-append">
    											<button className="btn btn-secondary" style={{color: '#000'}}>Zapisz</button>
    										</div>
    									</div>
    								</form>
    							</div>
    						</div>
    					</div>

    					<div className="page-section">
    						<div className="card card-fluid">
    							<div className="card-header">
    							Sekcje strony
    							</div>
    							<div className="row">
    								<div className="col">
    									{ form_sections }
    								</div>
    								<div className="col-auto">
    									<div className="card-body">
    										<FormAddSection />
    									</div>
    								</div>
    							</div>
    						</div>
    					</div>
    				</div>
    			</div></div>
    		</main>
    	</div>
    )
}

export default FormsEditPage;

