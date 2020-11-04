import React, { useState, useRef, useEffect } from "react";
import Navbar from "../Navbar";
import LeftMenu from "../LeftMenu";
import PageAddressBar from "../PageAddressBar";
import QAList from "./QAList";

const QAPage = () => {
  const [description, setDescription] = useState("");

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
              <form>
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
                          <button
                            className="btn btn-success"
                            // onClick={handleSave}
                          >
                            Zapisz
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="page-section">
                    {/* <div className="card card-fluid">
                      <div className="card-body"> */}
                        <QAList />
                        {/* <QAList qaList={qaList} setQaList={setQaList} /> */}
                      {/* </div>
                      <div className="card-footer">
                        <a
                          href="#"
                          className="card-footer-item"
                          onClick={addQnA}
                        >
                          <i className="fa fa-plus-circle mr-1"></i>
                          Dodaj Q&A
                        </a>
                      </div>
                    </div> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QAPage;
