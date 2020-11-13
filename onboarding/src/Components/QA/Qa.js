import React, { useEffect, useState } from "react";
import MarkdownArea from "../MarkdownArea";
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
  editMode,
}) {
  const [q, setQuestion] = useState(question);
  const [a, setAnswer] = useState(answer);
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
    setQaList(qaList.map(qa => {
      if(qa.id === id) {
        qa.question = content;
      }
      return qa;
    }));
  };
  
  const changeAnswer = (content) => {
    setAnswer(content);
    setQaList(qaList.map(qa => {
      if(qa.id === id) {
        qa.answer = content;
      }
      return qa;
    }));
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

  const preview = (
    <div className="task-issue">
      <div className="card">
        <div className="card-body">
          <div className="form-group">
            <p dangerouslySetInnerHTML={{ __html: q }}></p>
          </div>
          <hr />
          <p dangerouslySetInnerHTML={{ __html: a }}></p>
        </div>
      </div>
    </div>
  );

  return !editMode ? (
    preview
  ) : (
    <div className="task-issue" {...draggableProps} ref={innerRef}>
      <div className="card">
        <span className="drag-indicator" {...dragHandleProps}></span>
        <div className="card-body">
          <div className="form-group">
            <MarkdownArea
              id={"question" + id}
              content={q}
              contentChange={changeQuestion}
              simple={true}
              placeholder={"Wpisz pytanie"}
            />
          </div>

          <hr />
          <MarkdownArea
            id={"answer" + id}
            content={a}
            contentChange={changeAnswer}
            simple={true}
            placeholder={"Wpisz odpowiedź"}
          />
        </div>
        <div className="card-footer d-flex justify-content-end">
          <div className="p-3">
            <button className="btn" id={"copy-" + id} onClick={handleCopyQA}>
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
      {saved ? (
        <div
          className="fixed-bottom d-flex justify-content-center show-and-hide"
          style={{ display: "fixed-bottom", left: "240px" }}
        >
          <div
            className="m-2 p-2"
            style={{
              width: "150px",
              backgroundColor: "rgba(226, 232, 238, 0.57)",
              color: "black",
              textAlign: "center",
              borderRadius: "4px",
            }}
          >
            Zapisano zmiany
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Qa;
