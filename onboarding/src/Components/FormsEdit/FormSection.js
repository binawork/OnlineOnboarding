import React, { useEffect, useState } from "react";
import MarkdownArea from "./MarkdownArea";
import Switcher from "../Switcher";
// import { copyQnA, saveQnA, deleteQnA } from "../hooks/QnA";

function FormSection({
  id,
  order,
  title,
  description,
  type,
  answers,
  sections,
  setSections,
  handleUpdate,
  provided,
  innerRef,
}) {
  // const [q, setQuestion] = useState("");
  // const [a, setAnswer] = useState("");
  // const [saved, setSaved] = useState(false);

  // useEffect(() => {
  //   // Show info "Zapisano zmiany" for 3sec when the changes were saved
  //   if (saved) {
  //     setTimeout(setSaved, 3000, false);
  //   }
  // }, [saved]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (q !== question) {
  //       question = q;
  //       saveQnA("question", id, q, handleUpdate, setSaved);
  //     }
  //     if (a !== answer) {
  //       answer = a;
  //       saveQnA("answer", id, a, handleUpdate, setSaved);
  //     }
  //   }, 4000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [q, a]);

  // const changeQuestion = (content) => {
  //   setQuestion(content);
  // };

  // const changeAnswer = (content) => {
  //   setAnswer(content);
  // };

  // const handleCopyQA = (e) => {
  //   e.preventDefault();
  //   const qnaToCopy = { question: q, answer: a, order: order };
  //   copyQnA(qnaToCopy, qaList, handleUpdate);
  // };

  // const handleDeleteQnA = (e) => {
  //   e.preventDefault();
  //   deleteQnA(id, qaList, handleUpdate);
  //   setQaList(qaList.filter((item) => item.id !== id));
  // };
  const cardHeader = type === "oa" ? "Pytanie otwarte" : type === "osa" ? "Pytanie jednokrotnego wyboru" : type === "msa" ? "Pytanie Wielokrotnego wyboru" : "";
  // const answerRequired = true;

  return (
    <div className="card-body" {...provided.draggableProps} ref={innerRef}>
      <div className="task-issue">
        <div className="card">
        <div className="card-header" {...provided.dragHandleProps}>
            <span className="drag-indicator"></span> {cardHeader}
          </div>
        <div className="card-body">
          <div className="form-group">
          <div className="input-group">
                <input
                  id={"title" + id}
                  type="text"
                  className="form-control"
                  placeholder="Tytuł"
                  value={title}
                  // onChange={titleChange}
                  // required
                  autoFocus
                />
              </div>
            </div>
            <MarkdownArea
              id={id}
              description={description}
              // descriptionChange={descriptionChange}
            />
            <hr />

          {/* <div className="form-group">
              <textarea
                id={"answer" + id}
                className="form-control"
                placeholder="Tekst odpowiedzi użytkownika"
                rows="4"
                value={userAnswer}
                onChange={editOpenAnswer}
              ></textarea>
            </div> */}
          </div>

          <div className="card-footer align-items-center">
            <div className="col">
              <Switcher
                id={id}
                // answRequired={answerRequired}
                // switcherChange={switcherChange}
              />{" "}
              Odp. wymagana
            </div>
            <div className="col">
              <button
                className="btn"
                id={"copy-" + id}
                // onClick={copyForm}
              >
                <i className="fa fa-files-o fa-lg">&#61637;</i> Duplikuj pytanie
              </button>
            </div>
            <div className="col">
              <button
                className="btn text-danger"
                // onClick={deleteForm}
              >
                <i className="fa fa-trash-o fa-lg">&#61944;</i>
                Usuń
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormSection;
