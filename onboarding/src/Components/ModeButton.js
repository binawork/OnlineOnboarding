import React from "react";

function ModeButton() {
    return(
        <footer className="aside-footer border-top p-2">
            <button className="btn btn-light btn-block text-primary" data-toggle="skin"><span className="d-compact-menu-none">Tryb nocny</span> <i className="fas fa-moon ml-1"></i></button>
        </footer>
    )
}
export default ModeButton;

