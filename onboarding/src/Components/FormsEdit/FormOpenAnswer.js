import React from "react";

//import "../../static/looper/stylesheets/theme.min.css";
//import "../static/looper/stylesheets/theme-dark.min.css";
//import "../static/looper/vendor/fontawesome/all.min.css";

function FormOpenAnswer(props) {
    var title = "Title", descr = "Description (markdown)";

    if(props.form.title)
    	title = props.form.title;
    if(props.form.description)
    	descr = props.form.description;


    return(
      <div className="task-issue">
          <div className="card">
              <div className="card-header">{ title }</div>
              <div className="card-body">{ descr }</div>

              <div className="card-body">
                  <form> {/* form placeholder */}
                    <div className="form-group">
                        <textarea className="form-control" placeholder="User answer (plain text)" rows="4"></textarea>
                    </div>
                  </form>
              </div>
          </div>
      </div>
    )
}

export default FormOpenAnswer;

