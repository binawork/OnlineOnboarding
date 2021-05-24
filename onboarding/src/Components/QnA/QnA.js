import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import parse from 'html-react-parser';
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
      if(qa.order > order) qa.order = qa.order + 1;
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
    <div className="QnA__card card">
      <div className="card-body">
        <div className="form-group mb-4">
            { parse(question) }
        </div>
        { parse(answer) }
      </div>
    </div>
  );

  return !editMode ? (
    preview
  ) : (
    <div className="QnA__card card" {...draggableProps} ref={innerRef}>
      <div className="p-1 d-flex justify-content-center" {...dragHandleProps}>
        <span
          className="drag-indicator"
          style={{ transform: "rotate(90deg)" }}
        ></span>
      </div>
      <small className={`m-0 QnA__limit ${q.length > 2000 && "QnA__limit--error"}`}>{q.length}/2000</small>
      <MarkdownArea
        id={"question" + id}
        content={q}
        contentChange={changeQuestion}
        simple={true}
        placeholder={"Napisz pytanie... (np. Gdzie znajduje się siedziba firmy?)"}
      />
      <small className={`m-0 QnA__limit ${a.length > 2000 && "QnA__limit--error"}`}>{a.length}/2000</small>
      <MarkdownArea
        id={"answer" + id}
        content={a}
        contentChange={changeAnswer}
        simple={true}
        placeholder={"Napisz odpowiedź... (np. Nasza siedziba mieści się w Łodzi przy ulicy Piotrkowskiej 56)"}
      />
      <div className="d-flex justify-content-end">
        <div className="p-1">
          <button className="QnA__card-button btn" onClick={handleCopyQA}>
            <i className="QnA__card-icon fa fa-files-o fa-md">&#61637;</i>
            <span className="QnA__card-action">Duplikuj</span>
          </button>
        </div>
        <div className="p-1">
          <button className="QnA__card-button btn" onClick={handleDeleteQnA}>
            <i className="QnA__card-icon fa fa-trash-o fa-md">&#61944;</i>
            <span className="QnA__card-action">Usuń</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default QnA;
