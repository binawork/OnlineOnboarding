import React, { useState, useRef, useEffect } from "react";
import Navbar from "../Navbar";
import LeftMenu from "../LeftMenu";
import PageAddressBar from "../PageAddressBar";
import Questions from "./QAList";
import { v4 as uuidv4 } from "uuid";


const QAPage = () => {
  const [description, setDescription] = useState("");
  const [qaList, setQaList] = useState([{id: "1", question: "Czy w biurze jest darmowa kawa?", answer: "Tak, nasza firma dba o zaopatrzenie wszystkich ekspresów do kawy."}]);

  // console.log(qaList)

  const handleAddQa = (e) => {
    e.preventDefault();
    setQaList([...qaList, {id: uuidv4(), question: "", answer: ""}]);
  }

  return (
    <div className="app">
      <header className="app-header app-header-dark">
        <Navbar />
      </header>
      <LeftMenu />
      <main className="app-main">
        <div className="wrapper">
          <div className="page">
            <div className="page-inner">
              <PageAddressBar page={"Q&A"} />

              <div className="page-section">
                <div className="card card-fluid">
                  <div className="card-header">Q&A</div>
                  <div className="card-body">
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        placeholder="Opis"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="form-group">
                        <div className="input-group-append">
                          <button className="btn btn-success" onClick={ ()=>console.log("zapisywanie") }>Zapisz</button>
                        </div>
                      </div>
                  </div>
                </div>

                <div className="page-section">
                  <div className="card card-fluid">
                    <div className="card-body">
                      <Questions qaList={ qaList } setQaList={ setQaList } />
                    </div>
                    <div className="card-footer">
                      <a href="#" className="card-footer-item" onClick={ handleAddQa }>
                        <i className="fa fa-plus-circle mr-1"></i>
                        Dodaj Q&A
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QAPage;
