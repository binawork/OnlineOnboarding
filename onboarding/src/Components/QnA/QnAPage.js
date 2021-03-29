import React from "react";
import PageAddressBar from "../PageAddressBar";
import QnAList from "./QnAList";
import "../../static/css/QnA.scss";

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
