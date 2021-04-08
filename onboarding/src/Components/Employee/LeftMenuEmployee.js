import React, { useEffect } from "react";
import ModeButton from "../ModeButton";
import "../../static/css/LeftMenu.scss";

function LeftMenuEmployee(props) {
  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
  }, []);

  const handleWindowResize = () => {
    if(window.innerWidth >= 768) {
      props.setToggleAside(false);
    }
  }

  const goToDashboard = function(e){
    e.preventDefault();
    props.setToggleAside(false);
    props.mainPage();
  };

  const goToUserPage = (e) => {
    e.preventDefault();
    props.setToggleAside(false);
    props.employeePage();
  };

  const goToQnA = function(e){
    e.preventDefault();
    props.setToggleAside(false);
    props.q_n_aPage();
  };

  const goToCompanyInfoPage = (e) => {
    e.preventDefault();
    props.setToggleAside(false);
    props.aboutCompanyPage();
  }


  return (
    <aside
      className={`LeftMenu app-aside app-aside-expand-md
      app-aside-light ${props.showAside ? "show" : ""}`}
      style={{zIndex: "9"}}
    >
      <div
        className={`${props.showAside ? "LeftMenu__pseudo-wrapper" : ""} w-100 h-100`}
        onClick={ () => props.setToggleAside(false) }
      >
        <div className="LeftMenu__wrapper">
          <div className="LeftMenu__overflow aside-menu overflow-auto">
            <nav id="stacked-menu" className="stacked-menu pt-5">
              <ul className="LeftMenu__list">
                <li className="menu-item has-child">
                  <a
                    href="#"
                    onClick={ goToDashboard }
                    className="LeftMenu__link menu-link"
                  >
                    <i className="bi bi-diagram-2 mr-2" style={{ fontSize: "18px"}}></i>
                    <span className="menu-text">Wdrożenia</span>
                  </a>
                </li>
                <li className="menu-item">
                  <a
                    href="#"
                    onClick={ goToUserPage }
                    className="LeftMenu__link menu-link"
                  >
                    <i className="bi bi-person mr-2" style={{ fontSize: "18px"}}></i>
                    <span className="menu-text">Mój profil</span>
                  </a>
                </li>
                <li className="menu-item">
                  <a
                    href="#"
                    onClick={ goToQnA }
                    className="LeftMenu__link menu-link"
                  >
                    <i className="bi bi-question-circle mr-2" style={{ fontSize: "18px"}}></i>
                    <span className="menu-text">Q&A</span>
                  </a>
                </li>
                <li className="menu-item">
                  <a
                    href="#"
                    onClick={ goToCompanyInfoPage }
                    className="LeftMenu__link menu-link"
                  >
                    <i className="bi bi-building mr-2" style={{ fontSize: "18px"}}></i>
                    <span className="menu-text">O firmie</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <ModeButton />
        </div>
      </div>
    </aside>
  );
}
export default LeftMenuEmployee;

