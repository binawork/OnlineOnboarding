import React from "react";
import Navbar from "../Navbar";
import LeftMenu from "../LeftMenu";
import PageAddressBar from "../PageAddressBar";
import Questions from "./Questions";

const QAPage = () => {
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
                        // value={description}
                        // onChange={(e) => setDescription(e.target.value)}
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
                      <Questions />
                    </div>
                    <div className="card-footer">
                      <a href="#" className="card-footer-item">
                        <i className="fa fa-plus-circle mr-1"></i>
                        {" "}Dodaj Q&A
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
