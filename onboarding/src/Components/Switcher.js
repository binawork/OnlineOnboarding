import React from "react";

//import "../static/looper/stylesheets/theme.min.css";
//import "../static/looper/stylesheets/theme-dark.min.css";

function Switcher() {

    return(
        <label className="switcher-control switcher-control-success">
          <input type="checkbox" className="switcher-input" checked />
          <span className="switcher-indicator"></span>
        </label>
    )
}
export default Switcher;

