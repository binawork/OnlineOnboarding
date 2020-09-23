import React from "react";

import "../../static/looper/stylesheets/theme.min.css";
//import "../static/looper/stylesheets/theme-dark.min.css";
//import "../static/looper/vendor/fontawesome/all.min.css";

function FormAddSection(props) {

    var openAnswerClick = function(){
    	props.handleClicks.openText();
	}
	var oneChoiceClick = function(){
		props.handleClicks.singleChoice();
	}
	var multiChoiceClick = function(){

	}

    return(
      <div className="card card-fluid">
          <div className="card-header">Add section</div>
          <div className="card-body align-items-center">
              <form> {/* form placeholder */}
                <div className="form-group row">
                    <div className="col-auto">&#9776;</div>
                    <div className="col">
                        <div className="input-group-append">
                            <button className="btn btn-secondary" onClick={ openAnswerClick } style={{color: '#000'}}>Open answer</button>
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-auto">&#9711;</div>
                    <div className="col">
                        <div className="input-group-append">
                            <a className="btn btn-secondary" onClick={ oneChoiceClick } style={{color: '#000'}}>One choice answer</a>
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-auto">&#9745; &#9989;</div>
                    <div className="col">
                        <div className="input-group-append">
                            <button className="btn btn-secondary" onClick={ multiChoiceClick } style={{color: '#000'}}>Multi choice answer</button>
                        </div>
                    </div>
                </div>
              </form>
          </div>
      </div>
    )
}

export default FormAddSection;

