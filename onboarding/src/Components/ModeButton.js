import React, { useEffect } from "react";
import "../static/looper/stylesheets/theme-dark.min.css";

function ModeButton() {
    const mode = localStorage.getItem("skin") || "dark";

    useEffect(() => {
        mode === "light" 
        ? require("../static/looper/stylesheets/theme.min.css")
        : require("../static/looper/stylesheets/theme-dark.min.css");

    }, [mode]);

    const changeState = () => {
        if(mode === "light") localStorage.setItem("skin", "dark")
        else localStorage.setItem("skin", "light")

        document.location.reload(true);
    }

    return(
        <footer className="aside-footer border-top p-2">
            <button onClick={ changeState } className="btn btn-light btn-block text-primary" data-toggle="skin">
                { mode === "dark" ? (
                    <>
                        <span className="d-compact-menu-none">Tryb nocny</span>
                        <i className="fas fa-moon ml-1"></i>
                    </>
                ) : (
                    <>
                        <span className="d-compact-menu-none">Tryb dzienny</span>
                        <i className="fas fa-sun ml-1"></i>
                    </>
                )}
            </button>
        </footer>
    )
}
export default ModeButton;

