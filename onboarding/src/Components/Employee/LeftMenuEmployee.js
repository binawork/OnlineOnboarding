import React, { useRef } from "react";


function LeftMenuEmployee(props) {

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
    <aside className={`app-aside app-aside-expand-md app-aside-light p-5 ${props.showAside ? "show" : ""}`} style={{zIndex: "9"}}>
      <div className="aside-content">
        <header className="aside-header d-block d-md-none"></header>
        <div className="aside-menu overflow-hidden">
          <nav id="stacked-menu" className="stacked-menu">
            <ul className="menu">
              <li className="menu-item">
                <a href="#" onClick={ goToUserPage } className="menu-link">
                  <span className="menu-text">Mój profil</span>
                </a>
              </li>
              <li className="menu-item">
                <a href="#" onClick={ goToDashboard } className="menu-link">
                  <span className="menu-text">Wdrożenia</span>
                </a>
              </li>
              <li className="menu-item">
                <a href="#" onClick={ goToQnA } className="menu-link">
                  <span className="menu-text">Q&A</span>
                </a>
              </li>
              <li className="menu-item">
                <a href="#" onClick={ goToCompanyInfoPage } className="menu-link">
                  <span className="menu-text">O firmie</span>
                </a>
              </li>
              <li className="menu-item">
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
}
export default LeftMenuEmployee;

