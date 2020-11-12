import React, { useState } from "react";

//import "../static/looper/stylesheets/theme.min.css";
import "../static/looper/stylesheets/theme-dark.min.css";

function ModeButton() {
    const [mode, setMode] = useState(true);

    const changeState = () => {
        //let path = "../static/looper/stylesheets/theme-dark.min.css";
        if(mode)
            require("../static/looper/stylesheets/theme.min.css");
        else
            require("../static/looper/stylesheets/theme-dark.min.css");

        setMode(!mode);
    }

    return(
        <footer className="aside-footer border-top p-2">
            <button onClick={ changeState } className="btn btn-light btn-block text-primary" data-toggle="skin"><span className="d-compact-menu-none">Tryb nocny</span> <i className="fas fa-moon ml-1"></i></button>
        </footer>
    )
}
export default ModeButton;

