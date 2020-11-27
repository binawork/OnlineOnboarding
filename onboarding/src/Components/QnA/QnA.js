import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import MarkdownArea from "../MarkdownArea";
import { deleteQnA } from "../hooks/QnAAPI";

function QnA({
  id,
  question,
  answer,
  order,
  qaList,
  setQaList,
  maxOrder,
  setMaxOrder,
  draggableProps,
  innerRef,
  dragHandleProps,
  editMode,
}) {
  const [q, setQuestion] = useState(question);
  const [a, setAnswer] = useState(answer);
  const refValue = useRef(qaList);

  useEffect(() => {
    refValue.current = qaList;
  });

  const changeQuestion = (content) => {
    setQuestion(content);
    const updatedList = refValue.current.map((qa) => {
      if (qa.id === id) {
        qa.question = content;
      }
      return qa;
    });
    setQaList(updatedList);
  };

  const changeAnswer = (content) => {
    setAnswer(content);
    const updatedList = refValue.current.map((qa) => {
      if (qa.id === id) {
        qa.answer = content;
      }
      return qa;
    });
    setQaList(updatedList);
  };

  const handleCopyQA = (e) => {
    e.preventDefault();
    const updatedList = refValue.current.map((qa) => {
      qa.order > order ? (qa.order = qa.order + 1) : qa;
      return qa;
    });
    const copiedQnA = {
      question: question,
      answer: answer,
      order: order + 1,
      id: uuidv4(),
    };
    const index = qaList.findIndex((qa) => qa.id === id);

    updatedList.splice(index + 1, 0, copiedQnA);
    setQaList(updatedList);
    setMaxOrder(maxOrder + 1);
  };

  const handleDeleteQnA = (e) => {
    e.preventDefault();
    const listWithoutDeletedItem = qaList.filter((item) => item.id !== id);
    const updatedList = listWithoutDeletedItem.map((qa, index) => {
      qa.order = index + 1;
      return qa;
    });

    setMaxOrder(maxOrder - 1);
    setQaList(updatedList);
    if (typeof id === "number") deleteQnA(id);
  };

  const preview = (
    <div className="task-issue">
      <div className="card">
        <div className="card-body">
          <div className="form-group">
            <p
              className="m-0"
              dangerouslySetInnerHTML={{ __html: question }}
            ></p>
          </div>
          <hr />
          <p className="m-0" dangerouslySetInnerHTML={{ __html: answer }}></p>
        </div>
      </div>
    </div>
  );

  return !editMode ? (
    preview
  ) : (
    <div className="task-issue" {...draggableProps} ref={innerRef}>
      <div className="card d-flex p-2" {...dragHandleProps}>
        <div className="p-1 d-flex justify-content-center">
          <span
            className="drag-indicator"
            style={{ transform: "rotate(90deg)" }}
            {...dragHandleProps}
          ></span>
        </div>
        <MarkdownArea
          id={"question" + id}
          content={question}
          contentChange={changeQuestion}
          simple={true}
          placeholder={"Wpisz pytanie"}
        />
        <hr style={{ margin: "0 0 20px" }} />
        <MarkdownArea
          id={"answer" + id}
          content={answer}
          contentChange={changeAnswer}
          simple={true}
          placeholder={"Wpisz odpowiedź"}
        />
        <div className="card-footer d-flex justify-content-end">
          <div className="p-1">
            <button className="btn" onClick={handleCopyQA}>
              <i className="fa fa-files-o fa-md">&#61637;</i> Duplikuj
            </button>
          </div>
          <div className="p-1">
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

export default QnA;