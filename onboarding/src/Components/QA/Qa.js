import React, { useEffect, useState } from "react";
import MarkdownArea from "../MarkdownArea";
import SaveInfo from "../SaveInfo";
import { copyQnA, saveQnA, deleteQnA } from "../hooks/QnA";

function Qa({
  id,
  question,
  answer,
  order,
  qaList,
  setQaList,
  handleUpdate,
  draggableProps,
  innerRef,
  dragHandleProps,
}) {
  const [q, setQuestion] = useState("");
  const [a, setAnswer] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Show info "Zapisano zmiany" for 3sec when the changes were saved
    if (saved) {
      setTimeout(setSaved, 3000, false);
    }
  }, [saved]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (q !== question) {
        question = q;
        saveQnA("question", id, q, handleUpdate, setSaved);
      }
      if (a !== answer) {
        answer = a;
        saveQnA("answer", id, a, handleUpdate, setSaved);
      }
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, [q, a]);

  const changeQuestion = (content) => {
    setQuestion(content);
  };

  const changeAnswer = (content) => {
    setAnswer(content);
  };

  const handleCopyQA = (e) => {
    e.preventDefault();
    const qnaToCopy = { question: q, answer: a, order: order };
    copyQnA(qnaToCopy, qaList, handleUpdate);
  };

  const handleDeleteQnA = (e) => {
    e.preventDefault();
    deleteQnA(id, qaList, handleUpdate);
    setQaList(qaList.filter((item) => item.id !== id));
  };

  return (
    <div className="task-issue" {...draggableProps} ref={innerRef}>
      <div className="card">
        <span className="drag-indicator" {...dragHandleProps}></span>
        <div className="card-body">
          <div className="form-group">
            <MarkdownArea
              id={"question" + id}
              content={question}
              contentChange={changeQuestion}
              simple={true}
              placeholder={"Wpisz pytanie"}
            />
          </div>

          <hr />
          <MarkdownArea
            id={"answer" + id}
            content={answer}
            contentChange={changeAnswer}
            simple={true}
            placeholder={"Wpisz odpowiedź"}
          />
        </div>
        <div className="card-footer d-flex justify-content-end">
            <button className="btn" id={"copy-" + id} onClick={handleCopyQA}>
              <i className="fa fa-files-o fa-md">&#61637;</i> Duplikuj
            </button>
            <button className="btn text-danger mr-1" onClick={handleDeleteQnA}>
              <i className="fa fa-trash-o fa-md mr-1">&#61944;</i>
              Usuń
            </button>
        </div>
      </div>
      {saved ? (
        <SaveInfo />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Qa;
