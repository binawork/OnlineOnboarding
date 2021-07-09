import React from "react";
import PropTypes from "prop-types";
import image from "../../static/looper/images/illustration/img-5.png";
import "../../static/css/WelcomePage.scss";

const WelcomePage = () => {
  const handleClick = (e) => {
    e.preventDefault();
    const welcomePage = document.querySelector(".js-hide");
    welcomePage.classList.add("WelcomePage__hidden");
  }

  return (
    <article className="WelcomePage js-hide" style={{height: "100vh"}}>
      <div className="WelcomePage__card">
        <div className="state-figure">
          <img
            className="img-fluid w-75"
            src={ image }
            alt=""
          />
        </div>
        <h3 className="state-header">Dzień dobry</h3>
        <p className="state-description">
          Zapraszamy Cię na proces onboardingu w naszej organizacji!
        </p>
        <p className="state-description">Kliknij poniższy przycisk</p>
        <form>
          <div className="form-group w-75 mx-auto">
            <button 
              className="WelcomePage__button btn px-4" 
              style={{fontSize: "1.4rem", fontWeight: "600", height: "max-content", lineHeight: "1"}} 
              onClick={ handleClick } 
            >Zaczynamy</button>
          </div>
        </form>
      </div>
    </article>
  );
};

WelcomePage.propTypes = {
  setWelcomeView: PropTypes.func,
};

export default WelcomePage;

