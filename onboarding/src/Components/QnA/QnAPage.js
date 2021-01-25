import React, { useEffect } from "react";
import PageAddressBar from "../PageAddressBar";
import QnAList from "./QnAList";

const QnAPage = () => {
  document.title= "Onboarding: Q&A";
  
  return (
      <main className="app-main">
        <div className="wrapper">
          <div className="page">
            <div className="page-inner">
              <PageAddressBar page={"Q&A"} />
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
  );
};

export default QnAPage;
