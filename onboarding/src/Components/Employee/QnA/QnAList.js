import React, { useState, useEffect } from "react";
import parse from 'html-react-parser';
import QnARow from "./QnARow";
import PageAddressBar from "../../PageAddressBar";
import { getQnA } from "../../hooks/QnAAPI";
import "../../../static/css/QnA.scss";

function QnAList(){
    const [qaList, setQaList] = useState([{id: 0, question: "Ładowanie...", answer: "..."}]);

    const setLoading = function(isLoading){
        //setQaList([{id: 0, question: "Trwa jeszcze ładowanie ...", answer: "..."}]);
    };
    const setError = (message) => {
        setQaList([{id: 0, question: "Wystąpił błąd :(", answer: message}]);
    };

    const runGetQnA = function(){
        getQnA(setQaList, function(){}, setLoading, setError);
    };

    useEffect(() => {
        runGetQnA();
        const saveInterval = setInterval(runGetQnA, 10000);
        return () => clearInterval(saveInterval);
    }, []);

    let questionsAndAnswers = qaList.sort((a,b) => a.order - b.order).map((qa) => {
        let parsedQuestion = parse(qa.question),
            parsedAnswer = parse(qa.answer);
        return (
          <QnARow
            key={ qa.id }
            order={ qa.order }
            question={ parsedQuestion }
            answer={ parsedAnswer } />
        );
    });

    return (
      <div className="page-inner">
        <PageAddressBar page="Q&A" />
        <div className="QnA">
          <header className="QnA__header">
            <h1 className="QnA__header-text QnA__header-text--main">
              Q&A
            </h1>
            <p className="QnA__header-text">
              Najczęstsze pytania i odpowiedzi
            </p>
          </header>
          <section>{ questionsAndAnswers }</section>
        </div>
      </div>
    );
}

export default QnAList;

