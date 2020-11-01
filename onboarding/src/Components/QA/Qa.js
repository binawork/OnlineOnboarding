import React, { useEffect, useState } from "react";
import MarkdownArea from "../MarkdownArea";
import { saveQnA, deleteQnA } from "../hooks/QnA";
// import { Draggable } from "react-beautiful-dnd";

function Qa({ id, question, answer, handleUpdate, draggableProps, innerRef, dragHandleProps }) {
  const [q, setQuestion] = useState("");
  const [a, setAnswer] = useState("");

  useEffect(() => {
    if(q !== question) {
      saveQnA("question", id, q, handleUpdate);
    }
  }, [q]);

  useEffect(() => {
    if(a !== answer) {
      saveQnA("answer", id, a, handleUpdate);
    }
  }, [a]);

  const changeQuestion = (content) => {
    setQuestion(content);
  }

  const changeAnswer = (content) => {
    setAnswer(content);
  }

  const copyQA = (e) => {
    // e.preventDefault();
    // const newId = uuidv4();
    // const newQA = {
    //   id: newId,
    //   question: question,
    //   answer: answer
    // };
    // const index = qaList.findIndex((qa) => qa.id === id);
    // slice() to get shallow copy of sections
    // const qaListCopy = qaList.slice(0);
    // splice() to put copied form at the right index (next after its origin)
    // qaListCopy.splice(index + 1, 0, newQA);
    // setQaList(qaListCopy);
  }

  const handleDeleteQnA = (e) => {
    e.preventDefault();
    deleteQnA(id, handleUpdate);
  }
  
  return (
      <div className="task-issue" {...draggableProps} ref={innerRef}>
        <div className="card">
        <div className="" {...dragHandleProps}><i className="fa fa-arrows-alt"></i></div>
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