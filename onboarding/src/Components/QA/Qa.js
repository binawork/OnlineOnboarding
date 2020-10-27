import React, { useEffect, useRef } from "react";
import MarkdownArea from "../MarkdownArea";
import { v4 as uuidv4 } from "uuid";

function Qa({ id, question, answer, qaList, setQaList, provided, innerRef }) {
  const refValue = useRef(qaList);
  useEffect(() => {
    refValue.current = qaList;
  });

  const changeQuestion = (content, mdId) => {
    const questions = refValue.current.map(q => {
      q.id === mdId.slice(8)
      ? (q.question = content) 
      : q;
      return q;
    });
    setQaList(questions);
  }
  const changeAnswer = (content, mdId) => {
    const answers = refValue.current.map(a => {
      a.id === mdId.slice(6)
      ? (a.answer = content) 
      : a;
      return a;
    });
    setQaList(answers);
  }
  const copyQA = (e) => {
    e.preventDefault();
    const newId = uuidv4();
    const newQA = {
      id: newId,
      question: question,
      answer: answer
    };
    const index = qaList.findIndex((qa) => qa.id === id);
    // slice() to get shallow copy of sections
    const qaListCopy = qaList.slice(0);
    // splice() to put copied form at the right index (next after its origin)
    qaListCopy.splice(index + 1, 0, newQA);
    setQaList(qaListCopy);
  }
  const deleteQA = (e) => {
    e.preventDefault();

    console.log(e)
  }
  
  return (
      <div className="task-issue" {...provided.draggableProps} ref={innerRef}>
        <div className="card-header" {...provided.dragHandleProps}><i className="fa fa-arrows-alt"></i></div>
        <div className="card">
          <div className="card-body">
            <div className="form-group">
            <MarkdownArea
              id={"question" + id}
              content={question}
              contentChange={(content, id) =>
                changeQuestion(content, id)}
            />
            </div>

            <hr />
              <MarkdownArea
              id={"answer" + id}
              content={answer}
              contentChange={changeAnswer}
            />
          </div>
          <div className="card-footer align-items-center">
            <div className="col">
              <button className="btn" id={"copy-" + id} onClick={copyQA}>
                <i className="fa fa-files-o fa-lg">&#61637;</i> Duplikuj
              </button>
            </div>
            <div className="col">
              <button className="btn text-danger" onClick={deleteQA}>
                <i className="fa fa-trash-o fa-lg">&#61944;</i>
                Usuń
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Qa;
