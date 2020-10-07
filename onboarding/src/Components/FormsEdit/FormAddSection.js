import React from "react";

//import "../../static/looper/stylesheets/theme.min.css";
//import "../static/looper/stylesheets/theme-dark.min.css";
//import "../static/looper/vendor/fontawesome/all.min.css";

function FormAddSection(props) {

    var openAnswerClick = function(e){
        e.preventDefault();
    	props.handleClicks.openText();
    }
    var oneChoiceClick = function(e){
        e.preventDefault();
        props.handleClicks.singleChoice();
    }
    var multiChoiceClick = function(e){
        e.preventDefault();
		props.handleClicks.multiChoiceEdit();
    }

    return(
      <div className="card card-fluid">
          <div className="card-header">Rodzaj pytania</div>
          <div className="card-body align-items-center">
              <form> {/* form placeholder */}
                <div className="form-group row">
                    <div className="col-auto">&#9776;</div>
                    <div className="col">
                        <div className="input-group-append">
                            <button className="btn btn-secondary" onClick={ openAnswerClick }>Pytanie otwarte</button>
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-auto">&#9711;</div>
                    <div className="col">
                        <div className="input-group-append">
                            <button className="btn btn-secondary" onClick={ oneChoiceClick } >Jedna odpowiedź</button>
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-auto">&#9745;</div>
                    <div className="col">
                        <div className="input-group-append">
                            <button className="btn btn-secondary" onClick={ multiChoiceClick } >Wiele odpowiedzi</button>
                        </div>
                    </div>
                </div>
              </form>
          </div>
      </div>
    )
}

export default FormAddSection;

