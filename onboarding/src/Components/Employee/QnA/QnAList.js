import React, { useState } from "react";

import QnARow from "./QnARow";
import { getQnA } from "../../hooks/QnAAPI";


function QnAList(props){
    const [qaList, setQaList] = useState([]);

    const setLoading = function(isLoading){
    };
    const setError = (message) => {
    };
// https://www.digitalocean.com/community/tutorials/how-to-call-web-apis-with-the-useeffect-hook-in-react;

    getQnA(setQaList, function(){}, setLoading, setError);

    let questionsAndAnswers = qaList.map(function(qa, index){
        return <QnA key={ qa.id } question={ qa.question } answer={ qa.answer } />;
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

