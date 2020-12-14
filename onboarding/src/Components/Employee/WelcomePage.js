import React from "react";
import image from "../../static/looper/images/illustration/img-5.png";

const WelcomePage = ({ setWelcomeView }) => {
  const handleClick = (e) => {
    e.preventDefault();
    setWelcomeView(false);
  }
  return (
    <main className="auth justify-content-center" style={{height: "100vh"}}>
      <div className="empty-state">
        <div className="empty-state-container">
          <div className="card border border-primary">
            <div className="card-body">
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
                  <button className="btn btn-success text-secondary px-5" style={{fontSize: "1.4rem", fontWeight: "600", height: "max-content", lineHeight: "1"}} onClick={ handleClick }>Zaczynamy</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WelcomePage;