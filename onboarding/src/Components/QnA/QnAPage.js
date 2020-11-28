import React from "react";
import Navbar from "../Navbar";
import LeftMenu from "../LeftMenu";
import PageAddressBar from "../PageAddressBar";
import QnAList from "./QnAList";
import LoggedUser from "../hooks/LoggedUser.js";

const QnAPage = ({ location }) => {
  let loggedUser = location.state?.loggedUser ? location.state.loggedUser : LoggedUser();

  return (
    <div className="app">
      <header className="app-header app-header-dark">
        <Navbar loggedUser={ loggedUser }/>
      </header>
      <LeftMenu loggedUser={ loggedUser }/>
      <main className="app-main">
        <div className="wrapper">
          <div className="page">
            <div className="page-inner">
              <PageAddressBar page={"Q&A"} loggedUser={ loggedUser }/>
              <div className="page-section">
                <form>
                  <div className="page-section">
                    <QnAList />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QnAPage;
