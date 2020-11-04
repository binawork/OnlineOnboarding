import React from "react";
import Navbar from "../Navbar";
import LeftMenu from "../LeftMenu";
import PageAddressBar from "../PageAddressBar";
import QAList from "./QAList";

const QAPage = () => {
  return (
    <div className="app">
      <header className="app-header app-header-dark">
        <Navbar />
      </header>
      <LeftMenu />
      <main className="app-main">
        <div className="wrapper">
          <div className="page">
            <div className="page-inner">
              <PageAddressBar page={"Q&A"} />
              <div className="page-section">
                <form>
                  <div className="page-section">
                    <QAList />
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

export default QAPage;
