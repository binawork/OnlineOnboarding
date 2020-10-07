import React from "react";

//import "../../static/looper/stylesheets/theme.min.css";
//import "../static/looper/stylesheets/theme-dark.min.css";
//import "../static/looper/vendor/fontawesome/all.min.css";

function FormChoiceAnswer(props) {
    var localFormData = {title: "", description: "", answers: []}, valid = false;

    if(props.form){
    	if(!props.form.type || props.form.type !== "osa")
    		return <></>;

    	let allValid = 0;
    	if(props.form.title){
    		localFormData.title = props.form.title;
    		allValid++;
    	}
    	if(props.form.description){
    		localFormData.description = props.form.description;
    		allValid++;
    	}

    	if(props.form.data)
    		if(props.form.data.answers){
    			var answers = props.form.data.answers, len = answers.length, ids;

    			for(var i = 0; i < len; i++){
    				ids = "rd" + i;
    				localFormData.answers.push(
    					<tr key = { i }><td><div className="custom-control custom-radio">
    						<input type="radio" className="custom-control-input" id={ ids } /> <label className="custom-control-label" htmlFor={ ids }>{ answers[i].answer }</label>
    					</div></td></tr>);
    			}
    			allValid++;
    		}

    	if(allValid === 3)
    		valid = true;
    }

    if(!valid){
    	return <></>;
    }

    return(
      <div className="task-issue">
          <div className="card">
              <div className="card-header">{ localFormData.title }</div>
              <div className="card-body">{ localFormData.description }</div>

              <div className="card-body">
                  <form> {/* form placeholder */}
                    <table className="table table-hover"><tbody>
                        { localFormData.answers }
                    </tbody></table>
                  </form>
              </div>
          </div>
      </div>
    )
}

export default FormChoiceAnswer;

