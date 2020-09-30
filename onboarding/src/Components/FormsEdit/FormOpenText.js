import React from "react";

//import "../../static/looper/stylesheets/theme.min.css";
//import "../static/looper/stylesheets/theme-dark.min.css";
//import "../static/looper/vendor/fontawesome/all.min.css";

import Switcher from "../Switcher";

function FormOpenText() {

    return(
      <div className="task-issue">
          <div className="card">
              <div className="card-header"><span className="drag-indicator"></span> Pytanie otwarte</div>
              <div className="card-body">
                  <form> {/* form placeholder */}
                    <div className="form-group">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Wpisz pytanie" />
                        </div>
                    </div>
                    {/*<div className="form-group">{/ * moze usunac * /}
                        <textarea className="form-control" placeholder="Description (markdown)" rows="4"></textarea>
                    </div>*/}
                    <hr />
                    <div className="form-group">
                        <textarea className="form-control" placeholder="Tekst odpowiedzi użytkownika" rows="4"></textarea>
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

export default FormOpenText;

