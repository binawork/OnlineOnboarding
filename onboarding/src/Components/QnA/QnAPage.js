import React from "react";
import PageAddressBar from "../PageAddressBar";
import QnAList from "./QnAList";

const QnAPage = () => {
  document.title= "Onboarding: Q&A";
  
  return (
    <div className="page-inner">
      <PageAddressBar page="Q&A" />
      <QnAList />
    </div>
  );
};

export default QnAPage;
