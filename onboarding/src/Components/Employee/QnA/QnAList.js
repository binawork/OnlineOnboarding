import React, { useState, useEffect } from "react";

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

    //getQnA(setQaList, function(){}, setLoading, setError);

    let questionsAndAnswers = qaList.map(function(qa, index){
        return <QnARow key={ qa.id } question={ qa.question } answer={ qa.answer } />;
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

