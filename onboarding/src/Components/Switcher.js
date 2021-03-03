import React from "react";
// import PropTypes from "prop-types";

function Switcher({ id, isChecked, switcherChange, additionalClass }) {
    return(
        <label className="switcher-control switcher-control-success">
          <input id={ id } type="checkbox" className="switcher-input" defaultChecked={ isChecked } onChange={ switcherChange } />
          <span className={`switcher-indicator ${additionalClass || ""}`}></span>
        </label>
    )
}

// Switcher.propTypes ={
  // answRequired: PropTypes.bool.isRequired,
  // switcherChange: PropTypes.func.isRequired,
// }

export default Switcher;