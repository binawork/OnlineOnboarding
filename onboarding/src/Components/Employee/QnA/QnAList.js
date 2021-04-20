import React, { useState, useEffect } from "react";
import parse from 'html-react-parser';
import QnARow from "./QnARow";
import PageAddressBar from "../../PageAddressBar";
import { getQnA } from "../../hooks/QnAAPI";

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
        return <QnARow key={ qa.id } order={ qa.order } question={ parsedQuestion } answer={ parsedAnswer } />;
    });

    return (
      <div className="page-inner">
        <PageAddressBar page="Q&A" />
        <div className="card card-fluid">
          <div className="card-header">
            Najczęstsze pytania i odpowiedzi (Q&A)
          </div>
          <div className="card-body">{ questionsAndAnswers }</div>
        </div>
      </div>
    );
}

export default QnAList;

