import React, { useEffect, useState } from "react";
import MarkdownArea from "../MarkdownArea";
import { copyQnA, saveQnA, deleteQnA } from "../hooks/QnA";
// import { Draggable } from "react-beautiful-dnd";

function Qa({
  id,
  question,
  answer,
  handleUpdate,
  draggableProps,
  innerRef,
  dragHandleProps,
}) {
  const [q, setQuestion] = useState("");
  const [a, setAnswer] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (q !== question) {
        question = q;
        saveQnA("question", id, q, handleUpdate);
      }
      if (a !== answer) {
        answer = a;
        saveQnA("answer", id, a, handleUpdate);
      }
    }, 5000);

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

  const copyQA = (e) => {
    e.preventDefault();
    const qnaToCopy = { question: q, answer: a };
    copyQnA(qnaToCopy, handleUpdate);
  };

  const handleDeleteQnA = (e) => {
    e.preventDefault();
    deleteQnA(id, handleUpdate);
  };

  return (
    <div className="task-issue" {...draggableProps} ref={innerRef}>
      <div className="card">
        <div className="" {...dragHandleProps}>
          <i className="fa fa-arrows-alt"></i>
        </div>
        <div className="card-body">
          <div className="form-group">
            <MarkdownArea
              id={"question" + id}
              content={question}
              contentChange={changeQuestion}
              simple={true}
            />
          </div>

          <hr />
          <MarkdownArea
            id={"answer" + id}
            content={answer}
            contentChange={changeAnswer}
            simple={true}
          />
        </div>
        <div className="card-footer d-flex justify-content-end">
          {/* <div className="col-6"></div> */}
          <div className="p-3">
            <button className="btn" id={"copy-" + id} onClick={copyQA}>
              <i className="fa fa-files-o fa-md">&#61637;</i> Duplikuj
            </button>
          </div>
          <div className="p-3">
            <button className="btn text-danger mr-1" onClick={handleDeleteQnA}>
              <i className="fa fa-trash-o fa-md mr-1">&#61944;</i>
              Usuń
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Qa;
