import React from "react";
import PropTypes from 'prop-types'

//import "../static/looper/stylesheets/theme.min.css";
//import "../static/looper/stylesheets/theme-dark.min.css";

function Switcher({ id, answRequired, switcherChange }) {
    return(
        <label className="switcher-control switcher-control-success">
          <input id={ id } type="checkbox" className="switcher-input" checked={ answRequired } onChange={ switcherChange } />
          <span className="switcher-indicator"></span>
        </label>
    )
}

Switcher.propTypes ={
  answRequired: PropTypes.bool.isRequired,
  switcherChange: PropTypes.func.isRequired,
}

export default Switcher;