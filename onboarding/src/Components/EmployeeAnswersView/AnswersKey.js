import React from "react";

function AnswersKey() {
  return (
    <div className="d-flex justify-content-around AnswersKey__box">
      <div>
        <p>Odpowiedź jednokrotnego wyboru</p>
        <div className="d-flex align-items-center AnswersKey__example">
          <ul className="list-unstyled pr-4">
            <li className="pb-1 d-flex flex-nowrap align-items-center">
              <span className="AnswersKey__bullet" style={{ marginLeft: "42px" }}></span>
              <i className="text-nowrap">odpowiedź 1</i>
            </li>
            <li className="pb-1 d-flex flex-nowrap align-items-center">
              <span className="AnswersKey__bullet" style={{ marginLeft: "42px" }}></span>
              <i className="text-nowrap">odpowiedź 2</i>
            </li>
            <li className="pb-1 d-flex flex-nowrap align-items-center">
              <span className="AnswersKey__dot"></span>
              <span className="AnswersKey__bullet AnswersKey__bullet--green"></span>
              <i className="text-nowrap">odpowiedź 3</i>
            </li>
          </ul>
          <p><b>Dobrze udzielona odpowiedź</b></p>
        </div>
        <div className="d-flex align-items-center AnswersKey__example">
          <ul className="list-unstyled pr-4">
            <li className="pb-1 d-flex flex-nowrap align-items-center">
              <span className="AnswersKey__bullet" style={{ marginLeft: "42px" }}></span>
              <i className="text-nowrap">odpowiedź 1</i>
            </li>
            <li className="pb-1 d-flex flex-nowrap align-items-center">
              <span 
                className="AnswersKey__bullet AnswersKey__bullet--red"
                style={{ marginLeft: "42px" }}></span>
              <i className="text-nowrap">odpowiedź 2</i>
            </li>
            <li className="pb-1 d-flex flex-nowrap align-items-center">
              <span className="AnswersKey__dot"></span>
              <span className="AnswersKey__bullet"></span>
              <i className="text-nowrap">odpowiedź 3</i>
            </li>
          </ul>
          <p><b>Źle udzielona odpowiedź</b></p>
        </div>
        <div className="d-flex align-items-center AnswersKey__example">
          <ul className="list-unstyled pr-4">
            <li className="pb-1 d-flex flex-nowrap align-items-center">
              <span className="AnswersKey__bullet" style={{ marginLeft: "42px" }}></span>
              <i className="text-nowrap">odpowiedź 1</i>
            </li>
            <li className="pb-1 d-flex flex-nowrap align-items-center">
              <span className="AnswersKey__bullet" style={{ marginLeft: "42px" }}></span>
              <i className="text-nowrap">odpowiedź 2</i>
            </li>
            <li className="pb-1 d-flex flex-nowrap align-items-center">
              <span className="AnswersKey__dot"></span>
              <span className="AnswersKey__bullet"></span>
              <i className="text-nowrap">odpowiedź 3</i>
            </li>
          </ul>
          <p><b>Brak odpowiedzi</b></p>
        </div>
      </div>

      <div>
        <p>Odpowiedź wielokrotnego wyboru</p>
        <div className="d-flex align-items-center AnswersKey__example">
          <ul className="list-unstyled pr-4">
            <li className="pb-1 d-flex flex-nowrap align-items-center">
              <span className="AnswersKey__dot"></span>
              <span className="AnswersKey__bullet AnswersKey__bullet--green AnswersKey__bullet--square"></span>
              <i className="text-nowrap">odpowiedź 1</i>
            </li>
            <li className="pb-1 d-flex flex-nowrap align-items-center">
              <span 
                className="AnswersKey__bullet AnswersKey__bullet--square"
                style={{ marginLeft: "42px" }}></span>
              <i className="text-nowrap">odpowiedź 2</i>
            </li>
            <li className="pb-1 d-flex flex-nowrap align-items-center">
              <span className="AnswersKey__dot"></span>
              <span className="AnswersKey__bullet AnswersKey__bullet--green AnswersKey__bullet--square"></span>
              <i className="text-nowrap">odpowiedź 3</i>
            </li>
          </ul>
          <p><b>Dobrze udzielona odpowiedź</b></p>
        </div>
        <div className="d-flex align-items-center AnswersKey__example">
          <ul className="list-unstyled pr-4">
            <li className="pb-1 d-flex flex-nowrap align-items-center">
              <span className="AnswersKey__dot"></span>
              <span className="AnswersKey__bullet AnswersKey__bullet--square"></span>
              <i className="text-nowrap">odpowiedź 1</i>
            </li>
            <li className="pb-1 d-flex flex-nowrap align-items-center">
              <span 
                className="AnswersKey__bullet AnswersKey__bullet--red AnswersKey__bullet--square"
                style={{ marginLeft: "42px" }}></span>
              <i className="text-nowrap">odpowiedź 2</i>
            </li>
            <li className="pb-1 d-flex flex-nowrap align-items-center">
              <span className="AnswersKey__dot"></span>
              <span className="AnswersKey__bullet AnswersKey__bullet--green AnswersKey__bullet--square"></span>
              <i className="text-nowrap">odpowiedź 3</i>
            </li>
          </ul>
          <p><b>Źle udzielona odpowiedź</b></p>
        </div>
        <div className="d-flex align-items-center AnswersKey__example">
          <ul className="list-unstyled pr-4">
            <li className="pb-1 d-flex flex-nowrap align-items-center">
              <span className="AnswersKey__dot"></span>
              <span className="AnswersKey__bullet AnswersKey__bullet--square"></span>
              <i className="text-nowrap">odpowiedź 1</i>
            </li>
            <li className="pb-1 d-flex flex-nowrap align-items-center">
              <span 
                className="AnswersKey__bullet AnswersKey__bullet--square"
                style={{ marginLeft: "42px" }}></span>
              <i className="text-nowrap">odpowiedź 2</i>
            </li>
            <li className="pb-1 d-flex flex-nowrap align-items-center">
              <span className="AnswersKey__dot"></span>
              <span className="AnswersKey__bullet AnswersKey__bullet--square"></span>
              <i className="text-nowrap">odpowiedź 3</i>
            </li>
          </ul>
          <p><b>Brak odpowiedzi</b></p>
        </div>
      </div>
    </div>
  );
}

export default AnswersKey;
