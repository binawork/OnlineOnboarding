import React from "react";

import "../static/looper/stylesheets/theme.min.css";
//import "../static/looper/stylesheets/theme-dark.min.css";


function UserProfileManage() {

    return (
      <div className="card-body">
        <form>
            <div className="form-group">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Imie" value="" />
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Nazwisko" value="" />
                </div>
            </div>
            <hr />
            <div className="form-group">
                <div className="input-group">
                    <input type="email" className="form-control" placeholder="e-mail" value="" />
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <input type="tel" className="form-control" placeholder="phone number" value="" />
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="team" value="" />
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Localizacja" value="" />
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Position/stanowisko" value="" />
                </div>
            </div>
            <div className="form-group">
				<div className="input-group-append">
					<button className="btn btn-secondary" style={{color: '#000'}}>Register new user</button>
				</div>
			</div>
        </form>
      </div>
    );
}

export default UserProfileManage;

