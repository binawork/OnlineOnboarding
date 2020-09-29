import React, { useState } from "react";
import Switcher from "../Switcher";
import RadioButton from "./RadioButton";

//import "../../static/looper/stylesheets/theme.min.css";
//import "../static/looper/stylesheets/theme-dark.min.css";
//import "../static/looper/vendor/fontawesome/all.min.css";


function FormChoiceEdit(props) {
    const [singleChoices, addSingleChoice] = useState([]);


    var handleAddAnswer = function(e){
        e.preventDefault();
        let i = singleChoices.length;
        addSingleChoice([...singleChoices, <RadioButton key = { i } id={ i } name = { props.name } />]);
    }


    return(
      <div className="task-issue">
          <div className="card">
              <div className="card-header"><span className="drag-indicator"></span> Jedna odpowiedź</div>
              <div className="card-body">
                  <form> {/* form placeholder */}
                    <div className="form-group">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Tytuł" value="" />
                        </div>
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" placeholder="Opis (markdown)" rows="4"></textarea>
                    </div>
                    <hr />
                    <table className="table table-hover"><tbody>
                        { singleChoices }
                    </tbody></table>
                    <hr />
                    <div className="form-group">
                        <div className="input-group-append">
                            <button className="btn btn-secondary" onClick={ handleAddAnswer } style={{color: '#000'}}>Dodaj odpowiedź</button>
                        </div>
                    </div>
                  </form>
              </div>
              <div className="card-footer align-items-center">

                  <div className="col">
                      <Switcher /> Odp. wymagana {/* form placeholder */}
                  </div>
                  <div className="col">
                      <a className="btn" href="#"><i className="fa fa-clone fa-lg"> </i> Duplikuj pytanie</a>
                      <a className="btn" href="#"><i className="fa fa-files-o fa-lg">&#61637;</i> Duplikuj pytanie</a>
                  </div>
                  <div className="col">
                      <a className="btn" href="#"><i className="fa fa-trash-o fa-lg">&#61944;</i> Usuń</a>
                  </div>
              </div>

          </div>
      </div>
    )
}

export default FormChoiceEdit;

