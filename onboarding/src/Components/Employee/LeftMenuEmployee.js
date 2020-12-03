import React, { useRef } from "react";


function LeftMenuEmployee(props) {

  const goToDashboard = function(e){
    e.preventDefault();
    props.mainPage();
  };

  const goToUserPage = (e) => {
    e.preventDefault();
    props.employeePage();
  };

  const goToQnA = function(e){
    e.preventDefault();
    props.q_n_aPage();
  };


  return (
    <aside className="app-aside app-aside-expand-md app-aside-light">
      <div className="aside-content">
        <header className="aside-header d-block d-md-none"></header>
        <div className="aside-menu overflow-hidden">
          <nav id="stacked-menu" className="stacked-menu">
            <ul className="menu">
              <li className="menu-header px-0">
                <a href="#" onClick={ goToDashboard } className="menu-link p-0">
                  <span className="menu-icon fas fa-home"></span>{" "}
                  <span className="menu-text">Dashboard</span>
                </a>
              </li>
              <li className="menu-item">
                <a href="#" onClick={ goToUserPage } className="menu-link">
                  <span className="menu-icon far fa-file"></span>{" "}
                  <span className="menu-text">Moje dane</span>
                </a>
              </li>
              <li className="menu-item">
                <a href="#" onClick={ goToQnA } className="menu-link">
                  <span className="menu-icon far fa-file"></span>{" "}
                  <span className="menu-text">Typowe pytania, Q&A</span>
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

