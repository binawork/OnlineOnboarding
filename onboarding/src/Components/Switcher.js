import React from "react";
import PropTypes from 'prop-types'

//import "../static/looper/stylesheets/theme.min.css";
//import "../static/looper/stylesheets/theme-dark.min.css";

function Switcher({ answRequired, handleSwitcherChange }) {
    return(
        <label className="switcher-control switcher-control-success">
          <input type="checkbox" className="switcher-input" checked={ answRequired } onChange={ handleSwitcherChange } />
          <span className="switcher-indicator"></span>
        </label>
    )
}

Switcher.propTypes ={
  answRequired: PropTypes.bool.isRequired,
  handleSwitcherChange: PropTypes.func.isRequired,
}

export default Switcher;