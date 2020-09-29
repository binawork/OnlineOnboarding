import React, { useState } from "react";

//import "../../static/looper/stylesheets/theme.min.css";
//import "../static/looper/stylesheets/theme-dark.min.css";
//import "../static/looper/vendor/fontawesome/all.min.css";

import Switcher from "../Switcher"

function FormMultiChoiceEdit() {
    const [multiChoices, addMultiChoice] = useState([]);
    const classes = {
        checked: "custom-control-input is-valid",
        unchecked: "custom-control-input"
    };

    var handleAddAnswer = function(e){
        e.preventDefault();

        let i = multiChoices.length, idStr = "ckb" + i;
        addMultiChoice([...multiChoices,
            <tr><td><i className="fa fa-arrows">&#10018;</i></td>
                <td>
                    <div className="custom-control custom-control-inline custom-checkbox">
                        <input type="checkbox" className={ classes.unchecked } id={ idStr } /> <label className="custom-control-label" htmlFor={ idStr }>Answer { i+1 }</label>
                    </div>
                </td>
                <td> <a className="btn" href="#">&#9997; Edytuj</a> </td>
                <td> <a className="btn" href="#"><i className="fa fa-trash-o fa-lg">&#61944;</i> Usuń</a> </td>
            </tr>]);

    }

    return(
      <div className="task-issue">
          <div className="card">
              <div className="card-header"><span className="drag-indicator"></span> Wiele odpowiedzi</div>
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
                        { multiChoices }
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
                      <Switcher /> Odp. wymagane {/* form placeholder */}
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

export default FormMultiChoiceEdit;

