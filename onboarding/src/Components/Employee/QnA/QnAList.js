import React, { useState, useEffect } from "react";
import parse from 'html-react-parser';

import QnARow from "./QnARow";
import { getQnA } from "../../hooks/QnAAPI";


function QnAList(props){
    const [qaList, setQaList] = useState([]);

    const setLoading = function(isLoading){
    };
    const setError = (message) => {
    };

    const runGetQnA = function(){
        getQnA(setQaList, function(){}, setLoading, setError);
    };


    useEffect(() => {
        runGetQnA();
        const saveInterval = setInterval(runGetQnA, 10000);
        return () => clearInterval(saveInterval);
    }, []);


    let questionsAndAnswers = qaList.map(function(qa, index){
        let parsedQuestion = parse(qa.question),
            parsedAnswer = parse(qa.answer);
        return <QnARow key={ qa.id } question={ parsedQuestion } answer={ parsedAnswer } />;
    });

    return (
        <div className="page">
            <div className="page-inner">
                <div className="page-section">
                    <div className="card-body">
                        { questionsAndAnswers }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QnAList;

