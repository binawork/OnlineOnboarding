import React from "react";

//import "../static/looper/stylesheets/theme.min.css";
//import "../static/looper/stylesheets/theme-dark.min.css";


function UserProfileManage(props) {

    return (
      <div className="card-body">
        <form>
            <div className="form-group">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Imie" value={ props.user.name } />
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Nazwisko" value={ props.user.last_name } />
                </div>
            </div>
            <hr />
            <div className="form-group">
                <div className="input-group">
                    <input type="email" className="form-control" placeholder="e-mail" value={ props.user.email } />
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <input type="tel" className="form-control" placeholder="telefon" value={ props.user.tel } />
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="dział" value={ props.user.department } />{/* może lista rozwijana/do wyboru */}
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="lokalizacja" value={ props.user.localization } />{/* może lista rozwijana/do wyboru */}
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="stanowisko" value={ props.user.position } />
                </div>
            </div>
            <div className="form-group">
				<div className="input-group-append">
					<button className="btn btn-secondary">Dodaj/edytuj</button>
				</div>
			</div>
        </form>
      </div>
    );
}

export default UserProfileManage;

