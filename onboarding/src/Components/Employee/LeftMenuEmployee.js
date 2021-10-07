import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import LeftMenuItem from "../LeftMenuItem";
import ModeButton from "../ModeButton";
import "../../static/css/LeftMenu.scss";
import logo from "/onboarding/src/static/icons/onboardingstep-logo.svg";

function LeftMenuEmployee({ packagesList, showAside, setToggleAside }) {
  const location = useLocation();
  const [showFolders, setShowFolders] = useState(false);

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
  }, []);

  useEffect(() => {
    if(showFolders && packagesList === 0) {
      packagesList = JSON.parse(sessionStorage.getItem("packages_list"));
    }
  }, [showFolders]);

  useEffect(() => {
    location 
      && (/\/package\/\d+/g).test(location.pathname)
        || (/\/form\/\d+/g).test(location.pathname)
        ? setShowFolders(true)
        : setShowFolders(false);
  }, [location.pathname]);

  const handleWindowResize = () => {
    if(window.innerWidth >= 768) {
      setToggleAside(false);
    }
  }

  return (
    <aside
      className={`LeftMenu app-aside app-aside-expand-lg
      app-aside-light ${showAside ? "show" : ""}`}
      style={{zIndex: "9"}}
    >
      <div
        className={`${showAside ? "LeftMenu__pseudo-wrapper" : ""} w-100 h-100`}
        onClick={ () => setToggleAside(false) }
      >
        <div className="LeftMenu__wrapper">
          <div className="LeftMenu__overflow aside-menu overflow-auto">
            <nav id="stacked-menu" className="LeftMenu__nav">
              <header className="LeftMenu__header">
                <Link to="/">
                  <img className="LeftMenu__logo" src={ logo } alt="Logo OnlineOnboarding"/>
                </Link>
              </header>
              <ul className="LeftMenu__list">
                <LeftMenuItem
                    path="/"
                    title="Wdrożenia"
                    setToggleAside={ setToggleAside }
                    itemClassName={`LeftMenu__item${
                      showFolders ? " has-active m-0 pb-0" : ""
                    } menu-item has-child`}
                    sublist={ showFolders && packagesList &&  (
                      <ul className="LeftMenu__sublist menu">
                        { packagesList.map(element => (
                          <LeftMenuItem
                            key={`package-${element.id}`}
                            path={`/package/${element.id}`}
                            title={`${ element.title }`}
                            setToggleAside={ setToggleAside } />
                        ))}
                      </ul>
                    )} />
                <LeftMenuItem
                    path="/my_profile"
                    title="Mój profil"
                    setToggleAside={ setToggleAside } />
                <LeftMenuItem
                  path="/q_and_a"
                  title="Q&A"
                  setToggleAside={ setToggleAside } />
                <LeftMenuItem
                  path="/company"
                  title="O firmie"
                  setToggleAside={ setToggleAside } />
              </ul>
            </nav>
          </div>
          {/* <ModeButton /> */}
        </div>
      </div>
    </aside>
  );
}

LeftMenuEmployee.propTypes = {
  packagesList: PropTypes.array,
  showAside: PropTypes.bool.isRequired,
  setToggleAside: PropTypes.func.isRequired,
};

export default LeftMenuEmployee;
